import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

type Params = { id: string }
const GetGuild = async (request: Request, { params }: { params: Params }) => {
  try {
    const guild = await prisma.guilds.findFirst({
      where: { id: Number(params.id) },
      include: {
        guild_membership: true,
        guild_invites: true
      }
    })

    return NextResponse.json({
      guild_membership: guild?.guild_membership,
      guild_invites: guild?.guild_invites
    });

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

const UpdateSchema = z.object({
  description: z.string(),
  motd: z.string(),
})

const UpdateGuild = async (request: Request) => {
  try {

    const { description, motd } = UpdateSchema.parse(await request.json())

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // const findGuild = await prisma.guilds.findUnique({ where: { id } })
    // if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    // await prisma.guilds.update({ where:})

    return NextResponse.json({});
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

const DeleteGuild = async (request: Request, { params }: { params: Params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized1' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: +params.id } })
    if (!findGuild) return NextResponse.json({ message: 'Unauthorized2' }, { status: 401 });

    const findPlayer = await prisma.players.findUnique({ where: { id: findGuild.ownerid } })
    if (!findPlayer) return NextResponse.json({ message: 'Unauthorized3' }, { status: 401 });

    if (+session.user.id !== findPlayer.account_id) return NextResponse.json({ message: 'Unauthorized4' }, { status: 401 });

    await prisma.guilds.delete({ where: { id: +params.id } })

    return NextResponse.json({});

  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export {
  GetGuild as GET,
  UpdateGuild as PUT,
  DeleteGuild as DELETE
}