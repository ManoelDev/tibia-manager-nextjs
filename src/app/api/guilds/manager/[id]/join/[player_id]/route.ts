import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
type Params = { id: string, player_id: number }

const joinGuild = async (request: Request, { params }: { params: Params }) => {

  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findInvite = await prisma.guild_invites.findUnique({ where: { player_id_guild_id: { guild_id: +params.id, player_id: +params.player_id } }, select: { guilds: { select: { id: true, guild_ranks: { where: { level: 1 } } } } } })
    if (!findInvite) return NextResponse.json({ message: 'Invite not found' }, { status: 400 });

    const data = await prisma.guild_membership.create({
      data: {
        guild_id: findInvite?.guilds.id,
        player_id: +params.player_id,
        rank_id: findInvite.guilds.guild_ranks.filter(f => f.level === 1)[0].id
      },
      select: { guilds: { select: { name: true } } }
    })
    await prisma.guild_invites.delete({ where: { player_id_guild_id: { guild_id: +params.id, player_id: +params.player_id } } })

    revalidatePath(`/account-manager`);
    return NextResponse.json({});

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export { joinGuild as PATCH }