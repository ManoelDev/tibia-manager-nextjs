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
    payerID: z.string(),
    paymentID: z.string(),
  })
  .strict()


const clientID = process.env.PAYPAL_CLIENT_ID!
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!


const base = "https://api-m.sandbox.paypal.com";



/**
* Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
* @see https://developer.paypal.com/api/rest/authentication/
*/
const generateAccessToken = async () => {
  try {
    if (!clientID || !clientSecret) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      clientID + ":" + clientSecret,
    ).toString("base64");
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


const Checkout = async (request: Request, { params }: { params: Params }) => {

  try {
    const { orderID } = params

    const body = CreatePlayersSchema.parse(await request.json())

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

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

    // const findOrder = await prisma.orders.findFirst({ where: { orderID } })
    // if (!findOrder) return NextResponse.json({ message: 'Order not found.' }, { status: 400 })

    // const getAccount = await prisma.accounts.findFirst({ where: { id: findOrder?.account_id } })
    // if (!getAccount) return NextResponse.json({ message: 'Account not found.' }, { status: 400 })

    // await prisma.orders.update({
    //   where: { id: findOrder?.id },
    //   data: {
    //     payerID: body.payerID,
    //     paymentID: body.paymentID,
    //     status: 'DELIVERED',
    //     provider: 'paypal'
    //   }
    // })
    // const data = {
    //   [body.type]: { increment: body.quantity }
    // }

    // if (body.type === 'premdays') Object.assign(data, { lastday: 0 })

    // await prisma.accounts.update({
    //   where: { id: +session.user.id },
    //   data,
    // })

    // await prisma.store_history.create({
    //   data: {
    //     account_id: getAccount.id,
    //     coin_type: 1,
    //     amount: body.quantity,
    //     description: body.type === 'coins' ? `Deposit ${body.quantity} coins with PayPal` : `Buy ${body.quantity} VIP time days with PayPal`,
    //     cust: body.quantity,
    //     time: dayjs().unix()
    //   }
    // })

    return NextResponse.json({ response: await response.json() });

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed update order." }, { status: 500 })
  }
}

export { Checkout as POST }