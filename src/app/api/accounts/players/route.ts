
import { ZodError, z } from 'zod';
import dayjs from "dayjs";

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

    const { name, sex, world_id } = CreatePlayersSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (!session?.user || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const findPlayers = await prisma.accounts.findFirst({ where: { name } })
    if (findPlayers) return NextResponse.json({ message: 'Player name already exists' }, { status: 400 });

    const findInitialPlayer = await prisma.players.findFirst({ where: { name: 'Rook Sample' } })
    if (!findInitialPlayer) return NextResponse.json({ message: 'Initial Player not exist.' }, { status: 500 });

    const { id, account_id, ...restInitialPlayer } = findInitialPlayer || { id: undefined, account_id: undefined };


    await prisma.players.create({
      data: {
        ...restInitialPlayer,
        account_id: Number(session?.user?.id),
        name,
        sex,
        world_id: world_id ?? 1,
        create_date: dayjs().unix(),
        conditions: Buffer.alloc(1024),
        comment: ''
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