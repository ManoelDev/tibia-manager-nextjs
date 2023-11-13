import { authenticator } from 'otplib';
import { symmetricDecrypt } from '@/utils/crypto';
import { ErrorCode } from '@/utils/ErrorCode';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';


const TwoFaSchema = z.object({
  totpCode: z.string(),
}).strict()

const Enable = async (request: NextRequest) => {
  const { totpCode } = TwoFaSchema.parse(await request.json())

  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  if (!session.user?.email) return NextResponse.json({ error: ErrorCode.InternalServerError }, { status: 500 });

  const user = await prisma.accounts.findFirst({ where: { email: session.user?.email } });
  if (!user) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  if (user.secret_status) {
    if (!totpCode) return NextResponse.json({ error: ErrorCode.SecondFactorRequired }, { status: 400 });
    if (!user.secret) throw new Error(ErrorCode.InternalServerError);
    if (!authenticator.check(totpCode, user.secret)) return NextResponse.json({ error: ErrorCode.IncorrectTwoFactorCode }, { status: 400 });
  }

  await prisma.accounts.update({
    where: { id: +session.user.id },
    data: {
      secret_status: false,
      secret: null,
    },
  });
  return NextResponse.json({ message: 'Two factor disabled' });
}

export { Enable as POST }
