import configLua from "@/hooks/configLua";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { randomCode } from "@/utils/functions/randomCode";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

const recovery = async (req: Request) => {

  const lua = configLua()


  const data = await req.json()
  const existsUser = await prisma.accounts.findFirst({ where: { OR: [{ name: data.email }, { email: data.email }] } });
  if (!existsUser) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
  const emailProvider = new MailProvider()

  const token = randomCode(32)
  const code = randomCode(20)

  const link = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

  await prisma.tokens.create({
    data: {
      token,
      code,
      expired_at: dayjs().add(1, 'day').toDate(),
      isValid: true,
      accountsId: existsUser.id
    }
  })

  await emailProvider.SendMail({
    to: existsUser.email,
    subject: 'Confirmation key for new Tibia password',
    html: `
    <div>Dear Tibia player,<br>
    <br>
    A request for a new password of your Tibia account has been<br>
    submitted. Please confirm the request at<br>
    <a href="${link}"> ${link} </a>
    <br>
    in order to get the password sent to this email address.<br>
    <br>
    If clicking on the link does not work in your email program please<br>
    copy and paste it into your browser. The link is possibly split<br>
    up due to a word-wrap. Please make sure to copy the complete link.<br>
    <br>
    Alternatively, if you should encounter any problems using the above<br>
    link, please go to<br>
    <a href="${link}"> ${link} </a>
    <br>
    and confirm the request with your email address and the following<br>
    confirmation key:<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${code}<br>
    <br>
    Please note if you do not confirm the request for a new password<br>
    within the next 24 hours the request will be cancelled and no<br>
    new password will be assigned.<br>
    <br>
    If you have confirmed the request with your email address and the<br>
    confirmation key, you will receive another email with your password.<br>
    <br>
    Simply ignore this message if you have not requested a new<br>
    password or do not want the password to change anymore.<br>
    <br>
    Kind regards,<br>
    Your ${lua['serverName']} Team<br>
    </div>
    `,
  });

  return NextResponse.json({}, { status: 200 });
}


export { recovery as POST }