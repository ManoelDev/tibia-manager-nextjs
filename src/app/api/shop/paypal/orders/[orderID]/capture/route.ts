import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
    const getAccount = await prisma.accounts.findFirst({ where: { id: findOrder?.account_id } })

    await prisma.orders.update({
      where: { id: findOrder?.id },
      data: {
        payerID: body.payerID,
        paymentID: body.paymentID,
        status: 'DELIVERED',
        provider: 'paypal'
      }
    })

    await prisma.accounts.update({
      where: { id: +session.user.id },
      data: {
        [body.type]: { increment: body.quantity },
      },
    })

    // await prisma.store_history.create({
    //   data: {
    //     account_id: getAccount?.id,
    //     coin_type: body.type === 'coins' ? 1 : 0,
    //     amount: body.quantity,
    //   }
    // })


    return NextResponse.json({});

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed update order." }, { status: 500 })
  }
}

export { Checkout as POST }