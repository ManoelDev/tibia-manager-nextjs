import configLua from "@/hooks/configLua";
import { authOptions } from "@/lib/auth";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { randomCode } from "@/utils/functions/randomCode";
import { formatStringWithHyphens } from "@/utils/functions/randomKey";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const lua = configLua()
const emailProvider = new MailProvider()

const create = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id), email_verified: false } })
  if (!acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });



  const token = randomCode(24)
  const code = randomCode(10)

  await prisma.tokens.create({
    data: {
      code,
      token,
      expired_at: dayjs().add(1, 'day').toDate(),
      account_id: acc.id,
      isValid: true
    }
  })

  const link = `${process.env.NEXTAUTH_URL}/email-confirmation/${token}`;

  await emailProvider.SendMail({
    to: acc.email,
    subject: lua['serverName'] + ' Email confirmation',
    html: `
    <div>
      Welcome to ${lua['serverName']}! Thank you for registering for ${lua['serverName']}.
      <br><br>
      To be able to fully experience all features of a ${lua['serverName']},<br>
      you need to confirm your account. To do so, please click on the<br>
      following link: <a href="${link}" target="_blank">${link}</a>
      <br><br>
      If clicking on the link does not work in your email program, please<br>
      copy and paste it into your browser. Please make sure to copy the complete link.<br>
      and confirm the request with your email address and the following<br>
      <strong>confirmation key</strong>:<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> ${code}<br>
      <br><br>
      Moreover, please read our rules hints at: ${process.env.NEXTAUTH_URL}/rules
      <br><br>
      Kind regards,<br>
      Your ${lua['serverName']} Team<br>
    </div>
    `,
  });

  return NextResponse.json({}, { status: 200 });
}


const ValidateSchema = z.object({
  code: z.string(),
  token: z.string()
})

const validate = async (request: Request) => {
  const { code, token } = ValidateSchema.parse(await request.json())

  const getToken = await prisma.tokens.findFirst({
    where: { code, token, isValid: true, accounts: { email_verified: false } }, include: {
      accounts: {
        select: {
          email: true,
          email_verified: true
        }
      }
    }
  })

  if (!getToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (getToken.accounts?.email_verified) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const createdAt = dayjs(getToken.created_at);
  const validatedAt = dayjs(getToken.expired_at);
  const now = dayjs();

  if (now.isAfter(createdAt) && !now.isBefore(validatedAt)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const key = randomCode(20)
  await prisma.accounts.update({
    where: { id: getToken.account_id! },
    data: { email_verified: true, key }
  })

  await prisma.tokens.update({
    where: { id: getToken.id! },
    data: { isValid: false }
  })

  await emailProvider.SendMail({
    to: getToken.accounts?.email!,
    subject: lua['serverName'] + ' You recovery key',
    html: `
    <div>
      This is your recovery key, save this email or save key elsewhere<br><br>
      ${formatStringWithHyphens(key)}
      <br><br>
      Kind regards,<br>
      Your ${lua['serverName']} Team<br>
    </div>
    `,
  });

  return NextResponse.json({}, { status: 200 });
}


export { create as GET, validate as POST }