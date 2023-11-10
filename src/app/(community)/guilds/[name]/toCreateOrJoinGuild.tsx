"use server"
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const accounts = async (guild_id: number) => {
  const session = await getServerSession(authOptions);

  let account
  if (session?.user) {
    account = await prisma.guilds.findUnique({
      where: { id: guild_id },
      select: {
        guild_membership: {
          where: { guild_id, AND: [{ players: { account_id: +session.user.id } }] },
          select: {
            player_id: true,
            players: {
              select: {
                id: true
              }
            },
            guilds: {
              select: {
                ownerid: true
              }
            },
            guild_ranks: {
              select: {
                level: true
              }
            }
          }
        }
      },
    })
  } else {
    account = null
  }

  return account
}

export default async function ToCreateOrJoinGuild(guild_id: number) {
  const account = await accounts(guild_id)

  if (account?.guild_membership.length && account?.guild_membership[0].player_id === account?.guild_membership[0].guilds?.ownerid) {
    return {
      isLogged: !!account,
      manager: 'owner',
      level: account?.guild_membership[0].guild_ranks.level,
      player_id: account?.guild_membership[0].player_id,
    }
  }

  if (account?.guild_membership.length && account?.guild_membership[0].player_id !== account?.guild_membership[0].guilds?.ownerid) {
    return {
      isLogged: false,
      manager: 'member',
      level: account?.guild_membership[0].guild_ranks.level,
      player_id: account?.guild_membership[0].player_id,
    }
  }

  return { manager: null, level: null }

}