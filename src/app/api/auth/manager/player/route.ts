import configLua from "@/hooks/configLua";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { positions, samplePlayer } from "../../../../../../prisma/seed";
import dayjs from "dayjs";

const CreatePlayersSchema = z
  .object({
    name: z.string(),
    sex: z.number().min(0).max(1),
    tutorial: z.boolean(),
    world_id: z.number().optional(),
  }).strict()

const create = async (request: Request) => {
  try {
    const lua = configLua()

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { name, sex, world_id } = CreatePlayersSchema.parse(await request.json())

    const findPlayers = await prisma.accounts.findFirst({ where: { name } })
    if (findPlayers) return NextResponse.json({ message: 'Player name already exists' }, { status: 400 });

    await prisma.players.create({
      data: {
        ...[samplePlayer[0]].map(({ id, account_id, ...resto }) => resto)[0],
        ...[positions.filter((p) => p.name === 'Rookgaard')[0]].map(({ id, name, world_id, ...resto }) => resto)[0],
        account_id: Number(session?.user?.id),
        name,
        sex,
        world_id: world_id ?? +lua['worldId'],
        create_date: dayjs().unix(),
      }
    })

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: error.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export { create as POST }