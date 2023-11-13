import Image from "next/image";
import { Typography } from "@/components/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import configLua from "@/hooks/configLua";
import dayjs from "dayjs";
import Link from "next/link";
import { getVocation } from "@/utils/functions/getVocations";
import { CancelInvite } from "../data";
import { IconiFy } from "@/components/Iconify";
import { Badge } from "@/components/ui/badge";
import InvitePlayerTo from "./components/invite-player-guild";
import { ManagerPanal } from "./components/manager-painel";
import { Suspense } from "react";
import ToCreateOrJoinGuild from "./toCreateOrJoinGuild";
import TableActions from "./components/actionsTable";

const lua = configLua()

export default async function GuildData({ params }: { params: { name: string } }) {

  const guild = await prisma.guilds.findFirst({
    where: {
      AND: [
        { name: { contains: decodeURIComponent(params['name']) } },
      ],
    },
    include: {
      players: {
        select: {
          id: true,
          name: true
        }
      },
      guild_membership: {
        include: {
          players: {
            select: {
              id: true,
              name: true,
              vocation: true,
              level: true,
            }
          },
          guild_ranks: true,
        },
      },
      guild_invites: {
        include: {
          players: {
            select: {
              name: true,
              id: true
            }
          }
        }
      },
      guild_ranks: true
    },
  });

  const ids = guild?.guild_membership.map((i) => i.player_id)

  if (!guild) redirect('/guilds/' + params['name'])

  const { manager, level, player_id, isLogged } = await ToCreateOrJoinGuild(guild.id)

  const playersOnline = await prisma.players.findMany({
    where: { AND: [{ id: { in: ids } },], },
    select: { id: true }
  })

  function isAnyPlayerOnline(players_id: number) {
    return playersOnline.some(({ id }) => id === players_id);
  }

  return (
    <Suspense key={guild.guild_ranks.length + guild.guild_membership.length}>
      <Card>
        <div className="flex flex-row justify-between items-center p-4">
          <div className="hidden sm:flex"><Image src={`/guilds/${guild.logo_name}`} alt=" logo name " width={64} height={64} /></div>
          <div className="flex flex-col justify-center">
            <Typography variant="h3" className="text-2xl font-bold">{guild.name}</Typography>
          </div>
          <div><Image src={`/guilds/${guild.logo_name}`} alt=" logo name " width={64} height={64} /></div>
        </div>

        <CardContent className="p-2 space-y-2">

          <div className="flex border rounded sm:justify-between p-2 gap-2">
            <div className="flex flex-col w-full">
              <div className='flex p-2 rounded-sm  bg-gray-100 text-sm'>
                Guild information
              </div>
              <div className="p-2">
                <Typography variant="body1" component={'blockquote'} className="my-4 text-sm font-medium">{guild.description}</Typography>
                <Typography variant="body1" className="text-sm">
                  <Link href={`/characters/${guild.players.name}`} className="text-blue-500 hover:underline">{guild.players.name}</Link> is guild leader of {guild.name}.</Typography>
                <Typography variant="body1" className="text-sm">The guild founded on {lua['serverName']} in {dayjs.unix(Number(guild.creationdata)).format('MMMM D YYYY')}.</Typography>
                <Typography variant="body1" className="text-sm font-bold">Guild Bank Account Balance: {Number(guild.balance)} Gold</Typography>
              </div>
            </div>

            <div className="flex flex-col space-y-2 whitespace-nowrap">
              <Button asChild>
                <Link href={`/guilds/${params['name']}/wars`}>
                  Guild Wars
                </Link>
              </Button>
              <Button>Guild Events</Button>
              <Button>Guild Offence</Button>
            </div>

            <Suspense key={guild.guild_ranks.length}>
              {manager && <ManagerPanal guild_id={guild.id} isOwner={manager === 'owner'} accessLevel={level} />}
            </Suspense>
          </div>

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Guild Members

            </div>
            <Table>
              {guild.guild_membership.length > 0 && (
                <TableHeader className="pointer-events-none">
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Vocation</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell className="text-center w-[90px]">Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {guild.guild_membership
                  .sort((a, b) => {
                    const nameA = String(a.players.name);
                    const nameB = String(b.players.name);
                    return nameA.localeCompare(nameB);
                  })
                  .sort((a, b) => b.guild_ranks.level - a.guild_ranks.level)

                  .map((member, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="flex flex-row items-center gap-2 whitespace-nowrap"><IconiFy icon={`game-icons:rank-${member.guild_ranks.level}`} className="w-8 h-8" /> {member.guild_ranks.name}</TableCell>
                        <TableCell className="w-full">
                          <Link href={`/characters/${member.players.name}`} className="text-blue-500 hover:underline">
                            {member.players.name}
                          </Link>
                          {member.nick && ` ( ${member.nick} )`}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{getVocation(member.players.vocation)}</TableCell>
                        <TableCell >{member.players.level}</TableCell>
                        <TableCell className="text-center w-[90px]">
                          {isAnyPlayerOnline(member.players.id) ? (<Badge variant={"success"} className="uppercase" >Online</Badge>) : (<Badge variant={"destructive"} className="uppercase" >offline</Badge>)
                          }
                        </TableCell>
                        {/* <TableCell className="text-center w-[90px]">{member.guild_ranks.level !== 1 && (<RemovePlayer guild_id={member.guild_id} player_id={member.player_id} />)}</TableCell> */}
                        <TableCell className="text-center w-[90px]">
                          {level && <TableActions row={member} ranks={guild.guild_ranks} accessLevel={level ?? 0} disabled={guild.ownerid === member.player_id || level === 1 && member.player_id !== player_id} />}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {guild.guild_membership.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography variant="overline" className="text-center">No guild members.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Invited Characters

              {level && level >= 2 && <InvitePlayerTo guild_id={guild.id} rank_id={guild.guild_ranks.filter((f) => f.level === 1)[0].id} />}

            </div>
            <Table>
              <TableBody>
                {guild.guild_invites.map((invite, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="w-full">
                        <Link href={`/characters/${invite.players.name}`} className="text-blue-500 hover:underline">
                          {invite.players.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <CancelInvitation guild_id={invite.guild_id} player_id={invite.player_id} />
                      </TableCell>
                    </TableRow>
                  )
                })}
                {guild.guild_invites.length === 0 && (
                  <TableRow>
                    <TableCell>
                      <Typography variant="overline" className="text-center">No pending invite members.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}




function CancelInvitation({ guild_id, player_id }: { guild_id: number, player_id: number }) {
  const deleteInvitationWithId = CancelInvite.bind(null, { guild_id, player_id });
  return (
    <form action={deleteInvitationWithId} className="w-full">
      <Button variant={'destructive'} className="whitespace-nowrap">Cancel Invite</Button>
    </form>
  )
}
