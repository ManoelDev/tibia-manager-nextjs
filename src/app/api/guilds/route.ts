import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'


type Params = {
  name: string
}


export async function GET(request: Request, { params }: { params: Params }) {

  const characters = await prisma.guilds.findMany({
    include: {
      players: {
        select: {
          name: true
        }
      },
      guild_membership: {
        select: {
          players: {
            select: {
              _count: true
            }
          }
        }
      }
    }
  });

  return NextResponse.json(convertBigIntsToNumbers(characters));
}