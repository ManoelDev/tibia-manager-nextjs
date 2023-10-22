import configLua from "@/hooks/configLua";
import { prisma } from "@/lib/prisma";
import { encryptPassword } from "@/utils/functions/criptoPassword";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

import { ZodError, z } from 'zod';
import { positions, samplePlayer } from "../../../../../prisma/seed";
import { MailProvider } from "@/lib/nodemailer";

//  World Pvp Types
// 0 >> Open PvP
// 1 >> Optional PvP
// 2 >> Hardcore PvP
// 3 >> Retro Open PvP
// 4 >> Retro Hardcore


const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

const CreateAccountSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .email('Deve ser um email válido.')
      .transform((value) => value.toLowerCase().replace(/\s/g, '')),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .and(passwordUppercase)
      .and(passwordLowercase)
      .and(passwordDigit)
      .and(passwordSpecialChar),
    characterName: z.string(),
    gender: z.enum(['female', 'male']),
    wordLocation: z.number().int().min(0).max(3).default(1),
    wordType: z.number().int().min(0).max(5).default(1),
    country: z.string().default('br'),
  })

  .strict();

const lua = configLua()

export async function POST(req: Request) {
  try {
    const emailProvider = new MailProvider()
    const data = await CreateAccountSchema.parseAsync(await req.json());
    const existsUser = await prisma.accounts.findFirst({ where: { OR: [{ name: data.name }, { email: data.email }] } });
    if (existsUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const existsPlayer = await prisma.players.findFirst({ where: { name: data.characterName } });
    if (existsPlayer) {
      return NextResponse.json({ error: "Character already exists" }, { status: 400 });
    }

    await prisma.accounts.create({
      data: {
        name: data.name,
        email: data.email,
        password: encryptPassword(data.password),
        create_date: dayjs().unix(),
        created: dayjs().unix(),
        players: {
          create: {
            ...[samplePlayer[0]].map(({ id, account_id, ...resto }) => resto)[0],
            ...[positions.filter((p) => p.name === 'Rookgaard')[0]].map(({ id, name, world_id, ...resto }) => resto)[0],
            name: data.characterName,
            sex: data.gender === 'female' ? 0 : 1,
            world_id: +lua['worldId'],
            create_date: dayjs().unix(),
          }
        },
        profile: {
          create: {
            gender: data.gender,
          }
        },
        address: {
          create: {}
        }
      },
    });

    await emailProvider.SendMail({
      to: data.email,
      subject: 'Well-come',
      text: 'Bem vindo',
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
    NextResponse.json({}, { status: 200 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
  return NextResponse.json(null, { status: 200 });
}