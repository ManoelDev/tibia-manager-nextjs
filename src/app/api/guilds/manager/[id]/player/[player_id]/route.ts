import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import dayjs from "dayjs";

type Params = { id: string, player_id: number }

const ValidateUpdateRankSchema = z.object({
  rank_id: z.number()
})

const ChangeRank = async (request: Request, { params }: { params: Params }) => {

  try {
    const { rank_id } = ValidateUpdateRankSchema.parse(await request.json())
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await prisma.guild_membership.update({
      where: { player_id: +params.player_id },
      data: { rank_id },
      select: { guilds: { select: { name: true } } }
    })

    revalidatePath(`/guilds/${data.guilds.name}`);
    return NextResponse.json({});

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


const ValidateInviteSchema = z.object({
  rank_id: z.number()
})

const InvitePlayer = async (request: Request, { params }: { params: Params }) => {

  try {
    const { rank_id } = ValidateInviteSchema.parse(await request.json())
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const validInvite = await prisma.guild_invites.findFirst({ where: { player_id: +params.player_id } })
    if (validInvite) return NextResponse.json({ message: 'Player as invited.' }, { status: 400 });

    const data = await prisma.guild_invites.create({
      data: {
        guild_id: +params.id,
        player_id: +params.player_id,
        date: dayjs().unix(),
      },
      select: { guilds: { select: { name: true } } }
    })

    revalidatePath(`/guilds/${data.guilds.name}`);
    return NextResponse.json({});

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


type FindParams = { id: string, name: string }

const find = async (request: Request, { params }: { params: FindParams }) => {


  const characters = await prisma.players.findMany({
    where: {
      AND: [
        { id: { not: { in: [1, 2, 3, 4, 5] } } },
        { group_id: { not: { in: [6] } } },
        { name: { contains: params['name'] ? decodeURIComponent(params['name']) : undefined } },

      ],
    },
  });

  return NextResponse.json(convertBigIntsToNumbers(characters));
}


export { ChangeRank as PUT, InvitePlayer as POST, find as GET }