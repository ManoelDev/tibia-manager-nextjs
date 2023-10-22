import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"


const List = async (_request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const findCategories = await prisma.players.findMany()

    return NextResponse.json(findCategories);

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { List as GET }