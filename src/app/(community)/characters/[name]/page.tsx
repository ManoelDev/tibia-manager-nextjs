import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prisma } from "@/lib/prisma";
import { fUnixToDate } from "@/utils/functions/formatDate";
import { getVocation } from "@/utils/functions/getVocations";
import Link from "next/link";
import { redirect } from "next/navigation";



export default async function Character({ params }: { params: { name: string } }) {

  const player = await prisma.players.findFirst({
    where: {
      AND: [
        { name: { contains: params['name'] ? decodeURIComponent(params['name']) : undefined } },
        { id: { not: { in: [1, 2, 3, 4, 5] } } },
        { group_id: { not: { in: [6] } } },
      ],
    },
    include: {
      accounts: {
        select: {
          id: true,
          create_date: true,
          premdays: true,
          account_bans: true,
          players: {
            where: { hidden: false },
            select: {
              id: true,
              name: true,
              level: true,
              vocation: true,
              sex: true,
              hidden: true,
            },
            orderBy: {
              create_date: 'asc'
            }
          }
        }
      },
      guilds: {
        select: {
          name: true
        }
      },
    }
  });

  if (!player) redirect('/characters')


  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Characters</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">




          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100'>
              Character Information
            </div>
            <Table>

              <TableBody>
                <TableRow>
                  <TableCell className="w-[140px]">Name:</TableCell>
                  <TableCell>{player?.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Sex:</TableCell>
                  <TableCell>{player?.sex ? 'male' : 'Female'}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Vocation:</TableCell>
                  <TableCell>{getVocation(player?.vocation ?? 0)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Level:</TableCell>
                  <TableCell>{player?.level}</TableCell>
                </TableRow>

                {/* <TableRow>
                  <TableCell>Residence:</TableCell>
                  <TableCell>{player?.level}</TableCell>
                </TableRow> */}

                {player.guilds?.name && (<TableRow>
                  <TableCell>Guild Membership:</TableCell>
                  <TableCell> A Member of the <Link href={`/guilds/${player.guilds?.name}`} className="text-blue-500 hover:underline">{player.guilds?.name}</Link></TableCell>
                </TableRow>)}


                <TableRow>
                  <TableCell>Last Login:</TableCell>
                  <TableCell>{player?.lastlogin ? fUnixToDate(Number(player?.lastlogin)) : 'never'}</TableCell>
                </TableRow>

                {player?.comment && (
                  <TableRow>
                    <TableCell>Comment:</TableCell>
                    <TableCell>{player?.comment}</TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell>Account Status:</TableCell>
                  <TableCell className={player?.accounts.premdays ? 'text-green-600' : ''}>{player?.accounts.premdays ? 'Premium Account' : 'Free Account'}</TableCell>
                </TableRow>

              </TableBody>
            </Table>

            {/* <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm text-red-500'>
              Roles Violation Record Details
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="w-[140px]">Date:</TableCell>
                  <TableCell>{fUnixToDate(Number(player?.accounts.create_date))}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[140px]">Reason:</TableCell>
                  <TableCell>{fUnixToDate(Number(player?.accounts.create_date))}</TableCell>
                </TableRow>

              </TableBody>
            </Table> */}

            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Account Information
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="w-[140px]">Created:</TableCell>
                  <TableCell>{fUnixToDate(Number(player?.accounts.create_date))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Character Information
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="w-[140px]">Loyalty Title:</TableCell>
                  <TableCell>Loyalty Title:</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created:</TableCell>
                  <TableCell>{fUnixToDate(Number(player?.create_date))}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>

          <div>

          </div>

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Character Deaths
            </div>
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="overline" className="text-center">Not Death.</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>



          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Character
            </div>
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead>Mame</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {player.accounts.players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.level}</TableCell>
                    <TableCell className="text-right">
                      <Button variant={'green'}>
                        <Link href={`/characters/${player.name}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}