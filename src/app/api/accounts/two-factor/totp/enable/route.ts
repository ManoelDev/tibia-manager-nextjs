import { authenticator } from 'otplib';
import { ErrorCode } from '@/utils/ErrorCode';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


const TwoFaSchema = z.object({ totpCode: z.string() }).strict();

const Enable = async (request: NextRequest) => {
  const { totpCode } = TwoFaSchema.parse(await request.json());
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: ErrorCode.UserNotFound }, { status: 401 });

  const userId = +session.user.id;
  if (!userId) return NextResponse.json({ error: ErrorCode.InternalServerError }, { status: 500 });

  const user = await prisma.accounts.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: ErrorCode.UserNotFound }, { status: 401 });
  if (user.secret_status) return NextResponse.json({ error: ErrorCode.TwoFactorAlreadyEnabled }, { status: 400 });
  if (!user.secret) return NextResponse.json({ error: ErrorCode.TwoFactorSetupRequired }, { status: 400 });

  const isValidToken = authenticator.check(totpCode, user.secret);
  if (!isValidToken) return NextResponse.json({ error: ErrorCode.IncorrectTwoFactorCode }, { status: 400 });

  await prisma.accounts.update({ where: { id: userId }, data: { secret_status: true } });

  return NextResponse.json({ message: 'Two-factor enabled' });

};

export { Enable as POST };