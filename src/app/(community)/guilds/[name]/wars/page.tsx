import { Typography } from "@/components/Typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function War({ params }: { params: { name: string } }) {

  const guild = await prisma.guilds.findFirst({ where: { name: decodeURIComponent(params['name']) } })
  if (!guild) return redirect('/guilds')

  const guildWar = await prisma.guild_wars.findMany({
    where: { OR: [{ guild1: guild.id }, { guild2: guild.id }] }
  })

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Wars</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Guild War
            </div>
            <Table>
              {guildWar.length !== 0 && (
                <TableHeader>
                  <TableRow>
                    <TableCell>Opponent</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Kills to Win</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell >Current Kills</TableCell>
                  </TableRow>
                </TableHeader>
              )}

              <TableBody>

                {guildWar.map((war) => {
                  return (
                    <TableRow key={war.id}>
                      <TableCell>{war.guild1}</TableCell>
                      <TableCell>{Number(war.duration)}</TableCell>
                      <TableCell>{Number(war.kills)}</TableCell>
                      <TableCell>{Number(war.price)}</TableCell>
                      <TableCell>{Number(war.kills)}</TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" className="text-center">The guild is currently not involved in war.</Typography>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>



          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Guild War History
            </div>
            <Table>
              {/* <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableCell>Opponent</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Kills to Win</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Current Kills</TableCell>
                </TableRow>
              </TableHeader> */}
              <TableBody>

                <TableRow>
                  <TableCell>
                    <Typography variant="overline" className="text-center">The guild is currently not involved in war.</Typography>
                  </TableCell>
                </TableRow>

                {/* <TableRow>
                  <TableCell>B</TableCell>
                  <TableCell>I</TableCell>
                  <TableCell>I</TableCell>
                  <TableCell>I</TableCell>
                  <TableCell>I</TableCell>
                </TableRow> */}


              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}