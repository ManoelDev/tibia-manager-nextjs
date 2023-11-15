"use server"
import { writeFile } from 'fs/promises'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { z } from 'zod';

export async function createGuild(formData: { name: string; ownerid: number }) {
  try {
    await prisma.guilds.create({
      data: {
        name: formData.name,
        ownerid: formData.ownerid,
        logo_name: 'default.gif',
        creationdata: dayjs().unix(),
        description: '',
        guild_ranks: {
          createMany: { data: [{ name: 'Leader', level: 3 }, { name: 'Vice Leader', level: 2 }, { name: 'Member', level: 1 }], skipDuplicates: true },
        }
      }
    })
    revalidatePath('/guilds');
    redirect(`/guilds/${formData.name}`);
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
}

export async function listPlayers(account_id: number) {
  try {
    const players = await prisma.players.findMany({
      where: { account_id, level: { gte: 8 } },
      select: {
        id: true,
        name: true
      }
    })
    return { players }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
}

const GuildSchema = z.object({
  description: z.string(),
  motd: z.string(),
});

export async function updateGuild(id: number, formData: FormData) {
  const { description, motd } = GuildSchema.parse({
    description: formData.get('description'),
    motd: formData.get('motd'),
  });
  const file: File | null = formData.get('banner') as unknown as File

  let logo_name
  if (typeof file !== 'object') {
    logo_name = undefined
  } else {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${randomUUID()}-${file.name}`
    const path = join('public', 'guilds', fileName)
    await writeFile(path, buffer)
    logo_name = fileName
  }
  const guild = await prisma.guilds.update({
    where: { id },
    data: {
      logo_name,
      description,
      motd: motd ?? ''
    }
  })
  revalidatePath(`/guilds/${guild.name}`);
  redirect(`/guilds/${guild.name}`);
}

export async function deleteGuild(id: number) {
  await prisma.guilds.delete({ where: { id } })
  revalidatePath('/guilds');
  redirect(`/guilds`);
}

export async function RemoverPlayerToGuild({ guild_id, player_id }: { guild_id: number, player_id: number }) {
  const data = await prisma.guild_invites.delete({
    where: { player_id_guild_id: { guild_id, player_id } }, select: {
      guilds: { select: { name: true } }
    }
  })
  revalidatePath(`/guilds/${data.guilds.name}`);
  redirect(`/guilds/${data.guilds.name}`);
}

export async function CancelInvite({ guild_id, player_id }: { guild_id: number, player_id: number }) {
  const data = await prisma.guild_invites.delete({
    where: { player_id_guild_id: { guild_id, player_id } }, select: {
      guilds: { select: { name: true } }
    }
  })
  revalidatePath(`/guilds/${data.guilds.name}`);
  redirect(`/guilds/${data.guilds.name}`);
}