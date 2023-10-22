import configLua from "@/hooks/configLua";
import { MailProvider } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { encryptPassword } from "@/utils/functions/criptoPassword";
import { randomCode } from "@/utils/functions/randomCode";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { z } from "zod";




const ValidateSchema = z.object({
  code: z.string(),
  token: z.string()
})

const validate = async (request: Request) => {
  const emailProvider = new MailProvider()
  const lua = configLua()

  const { code, token } = ValidateSchema.parse(await request.json())

  console.log('body', code, token)
  const getToken = await prisma.tokens.findFirst({
    where: { code, token, isValid: true }, include: {
      accounts: {
        select: {
          email: true,
        }
      }
    }
  })

  if (!getToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const createdAt = dayjs(getToken.created_at);
  const validatedAt = dayjs(getToken.expired_at);
  const now = dayjs();

  if (now.isAfter(createdAt) && !now.isBefore(validatedAt)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const newPass = randomCode(10)

  await prisma.accounts.update({
    where: { id: getToken.accountsId! },
    data: { password: encryptPassword(newPass) }
  })
  await prisma.tokens.update({
    where: { id: getToken.id! },
    data: { isValid: false }
  })

  await emailProvider.SendMail({
    to: getToken.accounts?.email!,
    subject: lua['serverName'] + ' Reset email',
    html: `
    <div>
    Dear Tibia player,<br>
    &nbsp;&nbsp;&nbsp; <br>
    You have requested a new password for your Tibia account.<br>
    The password for your account is:<br>
    &nbsp;&nbsp;&nbsp; ${newPass} <br>
    <br>
    In case you do not receive the new password you have to make<br>
    another request.<br>
    <br>
    For security reasons, please memorise the password or keep it<br>
    in a safe place but do not store it on your computer. Delete<br>
    this mail once you have logged into your account successfully!<br>
    <br>
    If you would like to know more about the security of your Tibia<br>
    account, please read the security hints at<br>
    &nbsp;&nbsp; <a href="http://www.tibia.com/gameguides/?subtopic=securityhints">Securityhints</a><br>
    <br>
    Please note: A possible linkup between your Tibia account and<br>
    your Facebook profile has been disconnected. You can easily<br>
    associate your Tibia account with your Facebook profile again<br>
    in your account management.<br>
    <br>
    Kind regards,<br>
    Your ${lua['serverName']} Team<br>
    </div>
    `,
  });


  return NextResponse.json({}, { status: 200 });
}


export { validate as POST }