import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'


type Params = {
  name: string
}


export async function GET(request: Request, { params }: { params: Params }) {

  const characters = await prisma.guilds.findMany({
    where: {
      AND: [
        { name: { contains: decodeURIComponent(params['name']) } },
      ],
    },
  });

  return NextResponse.json(convertBigIntsToNumbers(characters));
}