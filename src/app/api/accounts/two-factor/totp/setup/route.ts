import { authenticator, totp } from 'otplib';


authenticator.options = {
  window: 1,
};

import qrcode from 'qrcode';
import { ErrorCode } from '@/utils/ErrorCode';

import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/utils/functions/criptoPassword';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const Uppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const Lowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const Digit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const SpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

const TwoFaSchema = z.object({
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').and(Uppercase).and(Lowercase).and(Digit).and(SpecialChar),
}).strict()

const Setup = async (request: NextRequest) => {
  try {
    const { password } = TwoFaSchema.parse(await request.json())
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const user = await prisma.accounts.findFirst({ where: { email: session.user?.email } });
    if (!user) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    if (user.secret_status) return NextResponse.json({ error: ErrorCode.TwoFactorAlreadyEnabled }, { status: 400 });
    if (!comparePassword(password, user.password)) return NextResponse.json({ error: ErrorCode.UserMissingPassword }, { status: 400 });

    const secret = authenticator.generateSecret();

    await prisma.accounts.update({ where: { id: user.id }, data: { secret } })

    const keyUri = authenticator.keyuri(user.email, 'TibiaGods', secret);
    const dataUri = await qrcode.toDataURL(keyUri);

    return NextResponse.json({ dataUri });

  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}



export { Setup as POST }