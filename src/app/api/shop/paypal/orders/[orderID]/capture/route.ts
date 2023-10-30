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

const Checkout = async (request: Request, { params }: { params: Params }) => {

  try {
    const { orderID } = params

    const body = CreatePlayersSchema.parse(await request.json())

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const findOrder = await prisma.orders.findFirst({ where: { orderID } })
    if (!findOrder) return NextResponse.json({ message: 'Order not found.' }, { status: 400 })

    const getAccount = await prisma.accounts.findFirst({ where: { id: findOrder?.account_id } })
    if (!getAccount) return NextResponse.json({ message: 'Account not found.' }, { status: 400 })

    await prisma.orders.update({
      where: { id: findOrder?.id },
      data: {
        payerID: body.payerID,
        paymentID: body.paymentID,
        status: 'DELIVERED',
        provider: 'paypal'
      }
    })
    const data = {
      [body.type]: { increment: body.quantity }
    }

    if (body.type === 'premdays') Object.assign(data, { lastday: 0 })

    await prisma.accounts.update({
      where: { id: +session.user.id },
      data,
    })

    await prisma.store_history.create({
      data: {
        account_id: getAccount.id,
        coin_type: 1,
        amount: body.quantity,
        description: body.type === 'coins' ? `Deposit ${body.quantity} coins with PayPal` : `Buy ${body.quantity} VIP time days with PayPal`,
        cust: body.quantity,
        time: dayjs().unix()
      }
    })

    return NextResponse.json({});

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed update order." }, { status: 500 })
  }
}

export { Checkout as POST }