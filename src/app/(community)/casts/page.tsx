import AnimatedOutfit from "@/components/aimations/AnimatedOutfit";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import { getVocation } from "@/utils/functions/getVocations";
import { players } from "@prisma/client";

export const revalidate = 0

const PlayersCasts = async () => {
  const query = await prisma.players.findMany({ where: { cast_on: 1 } })

  return convertBigIntsToNumbers(query)
}

export default async function Casts() {
  const players = await PlayersCasts()
  return (<>
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Casts</CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">
        <div className="border rounded">
          <Table>
            <TableHeader className="pointer-events-none">
              <TableRow>
                <TableHead className="w-[20px]">outfit</TableHead>
                <TableHead className="w-full">Name</TableHead>
                <TableHead className="w-full">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                players.map((player: players, index: number) => {
                  return (
                    <TableRow key={index} className="text-xs">
                      <TableCell>
                        <AnimatedOutfit outfit={player} alt={player.name} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span><b>{player.name}</b></span>
                          <span><b>Level: </b> {player.level}</span>
                          <span><b>Vocation: </b>{getVocation(player.vocation)}</span>
                          {/* <span><b>World:</b> Tibia Gods</span> */}
                        </div>
                      </TableCell>
                      <TableCell className="w-[180px] space-y-2 items-start justify-start">
                        <div className="flex flex-row gap-2 items-center">
                          <b>Live: </b> <Badge variant={'success'} className="uppercase">Online</Badge>
                        </div>
                        <div className="flex flex-row whitespace-nowrap items-end gap-2">
                          <b>[Bonus 10%] </b> <picture> <img src="/icons/XP_Boost_Icon.gif" alt="" /> </picture>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </div>

        <div className="border rounded">
          <Table>
            <TableHeader className="pointer-events-none">
              <TableRow>
                <TableHead><strong>Commands</strong></TableHead>
                <TableHead><strong>Description</strong></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-xs">
                <TableCell><b>!cast commands</b></TableCell>
                <TableCell>show commands</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast on</b></TableCell>
                <TableCell>enables the stream</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast off</b></TableCell>
                <TableCell>disables the stream</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast password, password</b></TableCell>
                <TableCell>sets a password on the stream</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast password off</b></TableCell>
                <TableCell>disables the password protection</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast show</b></TableCell>
                <TableCell>displays the amount of current spectators</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>!cast help</b></TableCell>
                <TableCell>show commands</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>Watch a cast without password</b></TableCell>
                <TableCell>Login with 1/1 and select the character you want to watch</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>Watch a cast with password</b></TableCell>
                <TableCell>Login with 1/password and select the character you want to watch</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell>
                  <div className="flex flex-row items-center">
                    <b>CTRL +</b>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm7.707 6.879L11.586 12l2.121 2.121a1 1 0 0 1-1.414 1.415l-2.829-2.829a1 1 0 0 1 0-1.414l2.829-2.829a1 1 0 1 1 1.414 1.415Z" /></g></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm4.293 11.121L12.414 12l-2.121-2.121a1 1 0 1 1 1.414-1.415l2.829 2.829a1 1 0 0 1 0 1.414l-2.829 2.829a1 1 0 1 1-1.414-1.415Z" /></g></svg>
                  </div>
                </TableCell>
                <TableCell>change casts without leave.</TableCell>
              </TableRow>

              <TableRow className="text-xs">
                <TableCell><b>Reward by using the cast with no password</b></TableCell>
                <TableCell>10% exp bônus</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>



  </>)
}