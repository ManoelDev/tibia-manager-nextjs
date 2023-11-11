import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = { account_id: string }

const ListPlayer = async (request: Request, { params }: { params: Params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const account = await prisma.accounts.findUnique({
      where: { id: +params.account_id }, include: {
        players: {
          where: {
            level: { gte: 8 },
            guild_membership: null
          }
        }
      }
    })

    return NextResponse.json({ player: account?.players ? convertBigIntsToNumbers(account?.players) : [] });
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export { ListPlayer as GET }