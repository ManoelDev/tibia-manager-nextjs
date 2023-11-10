import { Button } from "@/components/ui/button";
import { DeleteGuild } from "./delete-guild";
import ManagerGuildRanks from "./manager-ranks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ManagerGuild from "./manager-guild";
import { Suspense } from "react";


const GetGuild = async (guild_id: number) => {
  const g = await prisma.guilds.findUnique({
    where: { id: +guild_id },
    include: {
      guild_membership: true,
      guild_ranks: true
    }
  })
  return g
}


interface Props { guild_id: number, isOwner: boolean, accessLevel: number }

export async function ManagerPanal({ guild_id, isOwner, accessLevel }: Props) {
  const session = await getServerSession(authOptions);
  const guild = await GetGuild(guild_id)

  if (session?.user.id) {
    return (
      <div className="flex flex-col space-y-2 whitespace-nowrap">

        {accessLevel >= 2 && (<>
          <ManagerGuild guild_id={guild_id} defaultValues={{
            banner: guild?.logo_name ? `/guilds/${guild?.logo_name}` : '',
            description: guild?.description ?? '',
            motd: guild?.motd ?? ''
          }} />
          <Suspense key={guild?.guild_ranks.length}>
            <ManagerGuildRanks guild_id={guild_id} ranks={guild?.guild_ranks ?? []} />
          </Suspense>
        </>)}

        {isOwner && (<>
          <Button>Resign Leadership</Button>
          <DeleteGuild guild_id={guild_id} />
        </>)}
      </div>
    )
  }
}