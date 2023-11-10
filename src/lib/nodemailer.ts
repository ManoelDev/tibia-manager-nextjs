import nodemailer from 'nodemailer';
import configLua from "@/hooks/configLua";
const lua = configLua()

export interface SendMailParams<T> {
  to: string;
  subject: string;
  text?: string;
  html: string
}

export type SendMail = { SendMail: <T>(send: SendMailParams<T>) => Promise<void> };

export class MailProvider implements SendMail {
  async SendMail<T>(params: SendMailParams<T>): Promise<void> {
    const { to, subject, text, html } = params;

    let Transport;

    if (process.env.NODE_ENV !== 'production') {
      Transport = await nodemailer.createTestAccount();
    } else {
      Transport = {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        smtp: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: true,
        },
      };
    }

    const transporter = nodemailer.createTransport({
      host: Transport.smtp.host ?? process.env.MAIL_HOST,
      port: Transport.smtp.port ?? process.env.MAIL_PORT,
      secure: Transport.smtp.secure ?? true,
      auth: {
        user: Transport.user ?? process.env.MAIL_USER,
        pass: Transport.pass ?? process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });



    const message = await transporter.sendMail({
      from: `${lua['serverName']} <${process.env.MAIL_CONTACT}>`,
      to,
      text,
      subject,
      html
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}