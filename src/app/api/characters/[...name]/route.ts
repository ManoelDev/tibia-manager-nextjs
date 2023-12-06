import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'


type Params = { name: string }

const find = async (request: Request, { params }: { params: Params }) => {

  const characters = await prisma.players.findMany({
    where: {
      AND: [
        { id: { not: { in: [1, 2, 3, 4, 5] } } },
        { group_id: { not: { in: [6] } } },
        { name: { contains: params['name'] ? decodeURIComponent(params['name']) : undefined } },

      ],
    },
    take: 25
  });

  return NextResponse.json(convertBigIntsToNumbers(characters));
}

export { find as GET };