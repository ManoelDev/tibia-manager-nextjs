import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { z } from "zod";

type Params = { orderID: string }


const CreatePlayersSchema = z
  .object({
    type: z.enum(['coins', 'premdays']),
    quantity: z.number().nonnegative(),
  })
  .strict()


const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NODE_ENV } = process.env;
const base = NODE_ENV === "development" ? "https://api-m.sandbox.paypal.com" : 'https://api-m.paypal.com';

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) throw new Error("MISSING_API_CREDENTIALS");
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async ({ cart }: { cart: { currency_code: string, value: string } }) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log("shopping cart information passed from the frontend createOrder() callback:", cart,);

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      { amount: { currency_code: cart.currency_code, value: cart.value, }, },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response: any) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}


const Checkout = async (request: Request, { params }: { params: Params }) => {

  try {

    const { orderID } = params
    const { quantity, type } = CreatePlayersSchema.parse(await request.json())

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const account = await prisma.accounts.findFirst({ where: { email: session.user.email }, include: { profile: true } })
    if (!account) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const findOrder = await prisma.orders.findFirst({ where: { orderID } })
    if (!findOrder) return NextResponse.json({ message: 'Order not found.' }, { status: 400 })

    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    if (jsonResponse.status === "COMPLETED") {
      const purchase_units = jsonResponse.purchase_units[0].payments.captures
      const data = { [type]: { increment: quantity } }

      if (type === 'premdays') Object.assign(data, { lastday: 0 })

      await prisma.accounts.update({
        where: { id: +session.user.id },
        data,
      })

      await prisma.orders.update({
        where: { id: findOrder?.id },
        data: {
          payerID: jsonResponse.payer.payer_id,
          paymentID: purchase_units[0].id,
          status: jsonResponse.status === "COMPLETED" ? 'DELIVERED' : 'PENDING',
          provider: 'paypal'
        }
      })
      await prisma.store_history.create({
        data: {
          account_id: account.id,
          coin_type: 1,
          amount: quantity,
          description: type === 'coins' ? `Deposit ${quantity} coins with PayPal` : `Buy ${quantity} VIP time days with PayPal`,
          cust: quantity,
          time: dayjs().unix()
        }
      })
      return NextResponse.json(jsonResponse, { status: httpStatusCode });
    }





    return NextResponse.json({ error: "Failed to payment." }, { status: 500 })


  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to capture order." }, { status: 500 })
  }
}

export { Checkout as POST }