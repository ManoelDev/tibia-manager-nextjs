import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { z } from "zod";
import paypal from '@paypal/checkout-server-sdk'
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

const PayPalSchema = z.object({
  productId: z.number(),
  currency_code: z.string(),
  value: z.string(),
  description: z.string()
})

const clientID = process.env.PAYPAL_CLIENT_ID!
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

const environment = process.env.NODE_ENV === "development" ? new paypal.core.SandboxEnvironment(clientID, clientSecret) : new paypal.core.LiveEnvironment(clientID, clientSecret)
const clientPayPal = new paypal.core.PayPalHttpClient(environment)

const CreateOrders = async (req: Request) => {
  try {
    const body = PayPalSchema.parse(await req.json())

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const account = await prisma.accounts.findFirst({ where: { email: session.user.email }, include: { profile: true } })
    if (!account) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const request = new paypal.orders.OrdersCreateRequest()

    request.requestBody({
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": { currency_code: body.currency_code, "value": body.value },
          description: body.description
        }
      ],
    })

    const response = await clientPayPal.execute(request)

    await prisma.orders.create({
      data: {
        account_id: account.id,
        currency: body.currency_code,
        orderID: response.result.id,
        description: body.description,
        total_amount: body.value,
        status: 'PENDING'
      }
    })


    return NextResponse.json({ id: response.result.id });

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 })
  }
}

export { CreateOrders as POST }

