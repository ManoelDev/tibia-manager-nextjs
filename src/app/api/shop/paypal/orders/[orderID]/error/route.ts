import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

type Params = { orderID: string }

const Checkout = async (request: Request, { params }: { params: Params }) => {

  try {
    const { orderID } = params

    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const findOrder = await prisma.orders.findFirst({ where: { orderID } })

    await prisma.orders.update({ where: { id: findOrder?.id }, data: { status: 'PENDING' } })

    return NextResponse.json({});

  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to cancel order." }, { status: 500 })
  }
}

export { Checkout as POST }