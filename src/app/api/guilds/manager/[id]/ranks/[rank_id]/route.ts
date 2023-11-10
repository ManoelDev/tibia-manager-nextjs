import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type Params = { id: string, rank_id: number }

const DeleteRank = async (request: Request, { params }: { params: Params }) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: +params.id } })
    if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    const findPlayerInRank = await prisma.guild_ranks.findFirst({ where: { id: +params.rank_id }, include: { guild_membership: true } })
    if (findPlayerInRank && findPlayerInRank.guild_membership.length > 0) return NextResponse.json({ message: 'Found player in ranking.' }, { status: 400 });

    await prisma.guild_ranks.delete({
      where: {
        id: +params.rank_id,
      }
    })

    revalidatePath(`/guilds/${findGuild.name}`)
    return NextResponse.json({});
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export { DeleteRank as DELETE }
