import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const PayPalSchema = z.object({
  productId: z.number(),
  currency_code: z.string(),
  value: z.string(),
  description: z.string()
})

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

// ================================================================================================================================================================================
const CreateOrders = async (req: Request) => {
  try {
    const { currency_code, value, description, productId } = PayPalSchema.parse(await req.json())

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const account = await prisma.accounts.findFirst({ where: { email: session.user.email }, include: { profile: true } })
    if (!account) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const { jsonResponse, httpStatusCode } = await createOrder({ cart: { currency_code, value } });

    if (httpStatusCode === 201) {
      await prisma.orders.create({
        data: {
          account_id: account.id,
          currency: currency_code,
          orderID: jsonResponse.id,
          description: description,
          total_amount: value,
          status: jsonResponse.status === 'CREATED' ? 'PENDING' : 'CANCELED'
        }
      })
    }


    return NextResponse.json(jsonResponse, { status: httpStatusCode });

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: 'Failed to capture order.' }, { status: 500 })
  }
}

export { CreateOrders as POST }

