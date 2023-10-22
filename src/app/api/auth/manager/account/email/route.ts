import configLua from "@/hooks/configLua";
import { authOptions } from "@/lib/auth";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/functions/criptoPassword";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";


const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

const UpdateEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
  key: z.string(),
})

const update = async (request: Request) => {
  try {
    const lua = configLua()
    const emailProvider = new MailProvider()

    const body = UpdateEmailSchema.parse(await request.json())

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const account = await prisma.accounts.findUnique({ where: { id: Number(session.user.id) } })
    if (!account) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (comparePassword(body.password, account.password)) return NextResponse.json({ message: 'Unauthorized1' }, { status: 401 });
    if (body.key.replace(/-/g, '') === account.key) return NextResponse.json({ message: 'Unauthorized2' }, { status: 401 });

    await prisma.accounts.update({ where: { id: account.id }, data: { email: body.email } })

    await emailProvider.SendMail({
      to: account.email,
      subject: lua['serverName'] + ' Reset email',
      html: `
      <div>Dear Tibia player,<br>
      &nbsp;&nbsp;&nbsp; <br>
      Thank you for requesting a change of your Tibia account's registration data.<br>
      The change will not be complete until a waiting period of 30 days has passed.<br>
      Once the waiting period is over you must confirm your request on your account page to complete the change.<br>
      <br>
      Important: If the request to change your account's registration data has not been submitted by you,<br>
      it is likely that another person has gained access to your account.<br>
      <br>
      We strongly recommend you perform the following steps as soon as possible:<br>
      <br>
      - Take a look at our security page at<br>
      &nbsp;&nbsp;&nbsp; <a href="http://www.tibia.com/gameguides/?subtopic=securityhints" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.tibia.com/gameguides/?subtopic%3Dsecurityhints&amp;source=gmail&amp;ust=1696630361138000&amp;usg=AOvVaw1ChHyi7-2lnCjXbNjSUZq_">http://www.tibia.com/<wbr>gameguides/?subtopic=<wbr>securityhints</a><br>
      &nbsp; in order to find out how you protect your account from further hacking attempts.<br>
      &nbsp; <br>
      - Log into your account on the official website<br>
      &nbsp;&nbsp;&nbsp; <a href="http://www.tibia.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.tibia.com&amp;source=gmail&amp;ust=1696630361138000&amp;usg=AOvVaw194BHQy0OUiW8_NZK1GHAY">http://www.tibia.com</a><br>
      &nbsp; and cancel the request by clicking on "Change Registration" and by selecting "Cancel" on the following screen.<br>
      &nbsp; <br>
      - Change your account's password by using the option "Change Password" on your account page.<br>
      <br>
      - If you cannot access your account, please use our Lost Account Interface at<br>
      &nbsp;&nbsp;&nbsp; <a href="https://www.tibia.com/account/?subtopic=lostaccount" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.tibia.com/account/?subtopic%3Dlostaccount&amp;source=gmail&amp;ust=1696630361138000&amp;usg=AOvVaw2yZ27C1nWuHuG-M42ISh2i">https://www.tibia.com/account/<wbr>?subtopic=lostaccount</a><br>
      &nbsp; in order to receive a new account password.<br>
      <br>
      Kind regards,<br>
      Your ${lua['serverName']} Team<br>
      </div>
      `,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
  }
}

export { update as PUT }