import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { fUnixToDate } from "@/utils/functions/formatDate";
import Link from "next/link";

export const revalidate = 0

const findPlayerById = async (id: number) => await prisma.players.findFirst({ where: { id }, select: { name: true } })

const getLastKills = async () => {
  const query = await prisma.player_deaths.findMany({ take: 50, orderBy: { time: 'desc' } })
  return query
}


export default async function LastKills() {

  const deaths = await getLastKills()
  return (<>
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Last Kills</CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">
        <div className="border rounded">
          <Table>
            <TableBody>
              {deaths.map(async (death, index) => {
                const player = await findPlayerById(death.player_id)
                return (
                  <TableRow key={index} >
                    <TableCell className="text-right">{index + 1}</TableCell>
                    <TableCell className="whitespace-nowrap">{fUnixToDate(Number(death.time))}</TableCell>
                    <TableCell className="w-full"><Link href={`/characters/${player?.name}`} className="text-blue-500">{player?.name}</Link>  died at level <b>{death.level}</b> by {death.is_player && 'a '} {death.is_player ? <Link href={`/characters/${death.killed_by}`} className="text-blue-500">{death.killed_by}</Link> : death.killed_by} </TableCell>
                  </TableRow>
                )
              })}
              <TableRow >
                <TableCell className="text-right">1</TableCell>
                <TableCell className="whitespace-nowrap">5/12/2023, 09:55</TableCell>
                <TableCell className="w-full">[PLAYERNAME] died at level <b>123</b> by a </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </>)
}