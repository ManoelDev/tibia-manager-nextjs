import { authOptions } from "@/lib/auth";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/functions/criptoPassword";
import { randomKey } from "@/utils/functions/randomKey";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { ZodError, z } from 'zod';

const UpdateAccountsSchema = z
  .object({
    password: z.string(),
  })
  .strict()

export async function PATCH(req: Request) {
  try {
    const emailProvider = new MailProvider()

    const { password } = UpdateAccountsSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const acc = await prisma.accounts.findUnique({ where: { id: Number(user?.id) } })
    if (!acc || !(comparePassword(password, acc?.password!))) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const newKey = randomKey()

    // await prisma.accounts.update({
    //   where: { id: Number(user.id) },
    //   data: {
    //     key: newKey
    //   }
    // })

    await emailProvider.SendMail({
      to: session.user.email,
      subject: 'Register your Recovery Key',
      html: `
      <div>
         <h1>Follow the following link</h1>
          <p>Please follow
            <a href=""> this link </a>
            to reset your password
            </p>
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
