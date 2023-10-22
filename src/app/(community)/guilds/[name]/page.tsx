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

interface Guilds {
  id: number
  logo: string;
  name: string;
  motd: string;
  description: string;
  logo_name: string;
}

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
          }
        }
      },
      guild_invites: {
        include: {
          players: {
            select: {
              name: true
            }
          }
        }
      }
    },
  });

  if (!guild) redirect('/guilds/' + params['name'])

  return (
    <>
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
                <Typography variant="body1" component={'p'} className="pb-4">{guild.description}</Typography>
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
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>

                {guild.guild_membership.map((member) => {
                  return (
                    <TableRow key={Number(member.player_id)}>
                      <TableCell></TableCell>
                      <TableCell>
                        <Link href={`/characters/${member.players.name}`} className="text-blue-500 hover:underline">
                          {member.players.name}
                        </Link>
                      </TableCell>
                      <TableCell>{getVocation(member.players.vocation)}</TableCell>
                      <TableCell>{member.players.level}</TableCell>
                      <TableCell className="text-center w-[90px]">Online</TableCell>
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
            </div>
            <Table>
              <TableBody>
                {guild.guild_invites.map((invite) => {
                  return (
                    <TableRow key={Number(invite.player_id)}>
                      <TableCell>
                        <Link href={`/characters/${invite.players.name}`} className="text-blue-500 hover:underline">
                          {invite.players.name}
                        </Link>
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
    </>
  )
}