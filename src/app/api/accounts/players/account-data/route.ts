
import { ZodError, z } from 'zod';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/utils/functions/criptoPassword';

const CreatePlayersSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    gender: z.string().optional(),

    country: z.string().optional(),
    zipCode: z.string().optional(),
    stateProvince: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    comment: z.string().optional(),
    password: z.string(),

  })
  .strict()

const handleCreate = async (req: Request) => {
  try {

    const data = CreatePlayersSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (!session?.user || !acc || !comparePassword(data.password, acc?.password)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // return await prisma.profiles.upsert({
    //   where: { account_id: acc.id },
    //   update: {
    //     fisrt_name: data.firstName,
    //     last_name: data.lastName,
    //     gender: data.gender,
    //     phone_number: data.phoneNumber
    //   },
    //   create: {
    //     fisrt_name: data.firstName,
    //     last_name: data.firstName,
    //     gender: data.gender,
    //     phone_number: data.phoneNumber,
    //   },
    // });


    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 500 });
  }
}



export { handleCreate as POST };