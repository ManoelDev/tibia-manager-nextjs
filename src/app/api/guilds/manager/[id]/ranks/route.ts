import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { z } from "zod"

const CreateRanksSchema = z.object({
  guild_id: z.number(),
  rank: z.string(),
})
const CreateRank = async (request: Request, { params }: { params: Params }) => {
  try {

    const body = CreateRanksSchema.parse(await request.json())
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: +params.id } })
    if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    await prisma.guild_ranks.create({
      data: {
        level: 1,
        name: body.rank,
        guild_id: body.guild_id
      }
    })
    revalidatePath(`/guilds/${findGuild.name}`)
    return NextResponse.json({});
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



const UpdateRanksSchema = z.object({
  guild_id: z.number(),
  ranks: z.array(z.object({ id: z.number(), name: z.string(), level: z.number() })),
})
type Params = { id: string }

const updateRanks = async (request: Request, { params }: { params: Params }) => {
  try {
    const { guild_id, ranks } = UpdateRanksSchema.parse(await request.json())
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: guild_id } })
    if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    for (const rank of ranks) {
      await prisma.guild_ranks.update({
        where: { id: rank.id },
        data: rank
      });
    }
    revalidatePath(`/guilds/${findGuild.name}`)
    return NextResponse.json({});
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

const DeleteRank = async (request: Request, { params }: { params: Params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: +params.id } })
    if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    revalidatePath(`/guilds/${findGuild.name}`)
    return NextResponse.json({});
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

const ListRank = async (request: Request, { params }: { params: Params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findGuild = await prisma.guilds.findUnique({ where: { id: +params.id }, include: { guild_ranks: true } })
    if (!findGuild) return NextResponse.json({ message: 'Guild not found.' }, { status: 400 });

    revalidatePath(`/guilds/${findGuild.name}`)
    return NextResponse.json({ ranks: findGuild.guild_ranks });
  } catch (error) {
    console.log('error on create guild', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



export { ListRank as GET, CreateRank as POST, updateRanks as PUT, DeleteRank as DELETE }