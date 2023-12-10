'use server'

import { prisma } from "@/lib/prisma";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, NODE_ENV } = process.env;

const base = NODE_ENV === "development" ? "https://api.sandbox.paypal.com" : 'https://api.paypal.com';

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

export const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}`;

  const response = await fetch(url, {

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


/**
 * Cancel an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export const cancelOrder = async ({ order }: { order: string }) => {
  const queryOrder = await prisma.orders.findFirst({ where: { orderID: order } })
  if (queryOrder) {
    await prisma.orders.delete({ where: { id: queryOrder.id } })
  }
};

export const detailsOrder = async (order: string) => {

  const accessToken = await generateAccessToken();
  if (accessToken instanceof Error) {
    return {
      jsonResponse: null,
      httpStatusCode: 500,
    };
  }
  const url = `${base}/v2/checkout/orders/${order}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

export async function GetAccount(id: number) {
  const query = await prisma.accounts.findFirst({ where: { id }, select: { name: true, email: true } })
  return query

}