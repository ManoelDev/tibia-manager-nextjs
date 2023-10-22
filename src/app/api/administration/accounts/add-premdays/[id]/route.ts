import { ZodError, z } from 'zod';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CreatePlayersSchema = z
  .object({
    amount: z.string(),
    type: z.enum(['premdays']),
  })
  .strict()

type Params = { id: string }

const handleAddCoins = async (req: Request, { params }: { params: Params }) => {
  try {
    const id = params.id

    const data = CreatePlayersSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await prisma.accounts.update({
      where: { id: +id },
      data: {
        [data.type]: { increment: +data.amount },
      },
    })


    return NextResponse.json({ message: `Add ${data.amount} to account.` }, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 500 });
  }
}



export { handleAddCoins as PUT };