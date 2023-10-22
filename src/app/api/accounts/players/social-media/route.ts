
import { ZodError, z } from 'zod';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/utils/functions/criptoPassword';

const CreatePlayersSchema = z
  .object({
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    twitch: z.string().optional(),
    password: z.string(),
  })
  .strict()

const handleCreate = async (req: Request) => {
  try {

    const { instagram, twitch, youtube, password } = CreatePlayersSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (!session?.user || !acc || !comparePassword(password, acc?.password)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });


    await prisma.socialMedias.upsert({
      where: { account_id: acc.id },
      update: { instagran: instagram, twitch, youtube },
      create: {
        instagran: instagram, twitch, youtube, account: {
          connect: {
            id: acc.id
          }
        }
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 500 });
  }
}



export { handleCreate as POST };