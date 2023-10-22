import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { comparePassword, encryptPassword } from "@/utils/functions/criptoPassword";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ZodError, z } from 'zod';

const handlePATCH = async (req: Request) => {
  const body = await req.json()
  const UpdateAccountsSchema = z
    .object({
      currentPassword: z.string(),
      password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .and(z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character'))
        .and(z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter'))
        .and(z.string().regex(/\d/, 'The password must contain at least one numeric digit'))
        .and(z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character')),
    })
    .strict()

  try {
    UpdateAccountsSchema.parse(body)
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const acc = await prisma.accounts.findUnique({ where: { id: Number(user.id) } })
    if (!acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    if (!comparePassword(body.password, acc.password)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await prisma.accounts.update({
      where: { id: Number(user.id) },
      data: {
        password: encryptPassword(body.password)
      }
    })

    return NextResponse.json({});
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({}, { status: 500 });
  }
}


export { handlePATCH as PATCH };