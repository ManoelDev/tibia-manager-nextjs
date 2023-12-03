import { authOptions } from "@/lib/auth";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/functions/criptoPassword";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ZodError, z } from 'zod';

const UpdateAccountsSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    key: z.string().min(23)
  })
  .strict()

export async function PATCH(req: Request) {
  try {
    const emailProvider = new MailProvider()

    const { email, key, password } = UpdateAccountsSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const acc = await prisma.accounts.findUnique({ where: { id: Number(user?.id) } })

    if (!user || !acc || !(comparePassword(password, acc?.password!))) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (key.replace(/-/g, '') !== acc.key) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });


    await prisma.accounts.update({
      where: { id: Number(user.id) },
      data: {
        email: email,
        email_verified: false
      }
    })

    await emailProvider.SendMail({
      to: session.user.email,
      subject: 'Change Email',
      text: 'Change Email',
      html: `
      <div>
         <h1>This email as been changed</h1>
          <p>Please confirm email in panel</p>
      </div>
      `,
    });
    return NextResponse.json({});
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error.', issues: err.issues[0] }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 500 });
  }


}
