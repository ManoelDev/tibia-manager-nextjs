import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import dayjs from "dayjs";
import { players } from "@prisma/client";

const CreatePlayersSchema = z
  .object({
    name: z.string(),
    sex: z.number().min(0).max(1),
    tutorial: z.boolean(),
    world_id: z.number().optional(),
  }).strict()

type NewPlayer = Omit<players, "id" | "account_id">;

const create = async (request: Request) => {
  try {

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { name, sex, world_id } = CreatePlayersSchema.parse(await request.json())

    const findPlayers = await prisma.accounts.findFirst({ where: { name } })
    if (findPlayers) return NextResponse.json({ message: 'Player name already exists' }, { status: 400 });

    const findInitialPlayer = await prisma.players.findFirst({ where: { name: 'Rook Sample' } })
    if (!findInitialPlayer) return NextResponse.json({ message: 'Initial Player not exist.' }, { status: 500 });

    const { id, account_id, ...restInitialPlayer } = findInitialPlayer || { id: undefined, account_id: undefined };

    await prisma.players.create({
      data: {
        ...restInitialPlayer,
        world_id: world_id ?? 1,
        account_id: Number(session?.user?.id),
        name,
        sex,
        create_date: dayjs().unix(),
        comment: ''
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