import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

type Params = { id: string, player_id: number }
const KickPlayer = async (request: Request, { params }: { params: Params }) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await prisma.guild_membership.delete({
      where: { player_id: +params.player_id },
      select: { guilds: { select: { name: true } } }
    })

    revalidatePath(`/guilds/${data.guilds.name}`);
    return NextResponse.json({});

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

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

export { KickPlayer as DELETE, ChangeRank as PUT }