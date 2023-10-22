import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import configLua from "@/hooks/configLua";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";


export default async function SupportList() {

  const lua = configLua()

  const characters = await prisma.players.findMany({
    where: {
      group_id: { in: [2, 3, 4, 5, 6] }
    },
  });

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Team</CardTitle>
        </CardHeader>

        <CardContent className="p-2 space-y-2">

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Team {lua['serverName']}
            </div>
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="w-[80px]">Outfit</TableHead>
                  <TableHead className="w-full">Name</TableHead>
                  <TableHead className="w-[50px] text-center">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Last Login</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {characters.filter((f) => f.group_id === 6).length > 0 && (
                  <TableRow >
                    <TableCell colSpan={4} className="p-0">
                      <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
                        Administrator
                      </div>
                    </TableCell>
                  </TableRow>
                )}


                {characters.filter((f) => f.group_id === 6).map((character) => {
                  return (
                    <TableRow key={character.id.toString()}>
                      <TableCell></TableCell>
                      <TableCell><Typography variant={"overline"} className="w-full">{character.name}</Typography></TableCell>
                      <TableCell><Badge variant={'error'}>Offline</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{dayjs.unix(Number(character.lastlogin)).format('D MMMM YYYY, h:mm')}</TableCell>
                    </TableRow>
                  )
                })}

                {characters.filter((f) => f.group_id === 5).length > 0 && (
                  <TableRow >
                    <TableCell colSpan={4} className="p-0">
                      <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
                        Community Manager
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {characters.filter((f) => f.group_id === 5).map((character) => {
                  return (
                    <TableRow key={character.id.toString()}>
                      <TableCell></TableCell>
                      <TableCell><Typography variant={"overline"} className="w-full">{character.name}</Typography> </TableCell>
                      <TableCell><Badge variant={'error'}>Offline</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{dayjs.unix(Number(character.lastlogin)).format('D MMMM YYYY, h:mm')}</TableCell>
                    </TableRow>
                  )
                })}

                {characters.filter((f) => f.group_id === 4).length > 0 && (
                  <TableRow >
                    <TableCell colSpan={4} className="p-0">
                      <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
                        Game Master
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {characters.filter((f) => f.group_id === 4).map((character) => {
                  return (
                    <TableRow key={character.id.toString()}>
                      <TableCell></TableCell>
                      <TableCell><Typography variant={"overline"} className="w-full">{character.name}</Typography> </TableCell>
                      <TableCell><Badge variant={'error'}>Offline</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{dayjs.unix(Number(character.lastlogin)).format('D MMMM YYYY, h:mm')}</TableCell>
                    </TableRow>
                  )
                })}

                {characters.filter((f) => f.group_id === 3).length > 0 && (
                  <TableRow >
                    <TableCell colSpan={4} className="p-0">
                      <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
                        Tutor Senhor
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {characters.filter((f) => f.group_id === 3).map((character) => {
                  return (
                    <TableRow key={character.id.toString()}>
                      <TableCell></TableCell>
                      <TableCell><Typography variant={"overline"} className="w-full">{character.name}</Typography> </TableCell>
                      <TableCell><Badge variant={'error'}>Offline</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{dayjs.unix(Number(character.lastlogin)).format('D MMMM YYYY, h:mm')}</TableCell>
                    </TableRow>
                  )
                })}

                {characters.filter((f) => f.group_id === 2).length > 0 && (
                  <TableRow >
                    <TableCell colSpan={4} className="p-0">
                      <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
                        Tutor
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {characters.filter((f) => f.group_id === 2).map((character) => {
                  return (
                    <TableRow key={character.id.toString()}>
                      <TableCell></TableCell>
                      <TableCell><Typography variant={"overline"} className="w-full">{character.name}</Typography> </TableCell>
                      <TableCell><Badge variant={'error'}>Offline</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{dayjs.unix(Number(character.lastlogin)).format('D MMMM YYYY, h:mm')}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>



          </div>
        </CardContent>
      </Card>
    </>
  )
}