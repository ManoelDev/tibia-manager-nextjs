
import { ZodError, z } from 'zod';
import dayjs from "dayjs";


import configLua from "@/hooks/configLua";
import { positions, samplePlayer } from '../../../../../prisma/seed';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CreatePlayersSchema = z
  .object({
    name: z.string(),
    sex: z.number().min(0).max(1),
    tutorial: z.boolean(),
    world_id: z.number().optional(),
  })
  .strict()

const handleCreate = async (req: Request) => {
  try {
    const lua = configLua()

    const { name, sex, world_id } = CreatePlayersSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (!session?.user || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

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

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 500 });
  }
}



export { handleCreate as POST };