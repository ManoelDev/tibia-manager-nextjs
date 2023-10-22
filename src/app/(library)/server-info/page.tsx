import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import configLua from "@/hooks/configLua";
import { StatusServer } from "@/utils/statusServer";



export default async function PremiumHistory() {
  const lua = configLua()

  async function status() {
    const statusServer = new StatusServer();
    const host = lua['ip']
    const port = +lua['statusProtocolPort'];
    const status = await statusServer.getStatus(host, port);
    return {
      status: !!status,
    };

  }

  const statusServer = await status()
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Server info</CardTitle>
        </CardHeader>

        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Server Information
            </div>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell className="w-[130px]">Status:</TableCell>
                  <TableCell>{statusServer.status
                    ? <Badge variant={'success'}>ONLINE</Badge>
                    : <Badge variant={'error'}>OFFLINE</Badge>
                  }</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Protocol:</TableCell>
                  <TableCell>{parseFloat(lua['clientVersion']).toFixed(2)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Server type:</TableCell>
                  <TableCell className="capitalize">{lua['worldType']}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Protection level:</TableCell>
                  <TableCell className="capitalize">{lua['protectionLevel']}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Location:</TableCell>
                  <TableCell>{lua['location']}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Rates
            </div>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell className="w-[130px]">Exp Rate:</TableCell>
                  <TableCell>{lua['rateExp']}x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[120px]">Magic level:</TableCell>
                  <TableCell>{lua['rateMagic']}x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[120px]">Skills:</TableCell>
                  <TableCell>{lua['rateSkill']}x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[120px]">Loot:</TableCell>
                  <TableCell>{lua['rateLoot']}x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[120px]">Spawn:</TableCell>
                  <TableCell>{lua['rateSpawn']}x</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>

          {/* <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
              Pvp Informations
            </div>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell className="w-[120px]">PZ Locked:</TableCell>
                  <TableCell>{Math.floor(Number(lua['pzLocked']) / 60)} hours {(Number(lua['pzLocked']) % 60)} minutes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[120px]">White Skull:</TableCell>
                  <TableCell>{lua['rateMagic']}X</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Red Skull:</TableCell>
                  <TableCell>{lua['rateMagic']}X</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Black Skull:</TableCell>
                  <TableCell>{lua['rateMagic']}X</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Red Skull Max:</TableCell>
                  <TableCell>{lua['rateMagic']}X</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="w-[120px]">Black SkullMax:</TableCell>
                  <TableCell>{lua['rateMagic']}X</TableCell>
                </TableRow>


              </TableBody>
            </Table>
          </div> */}

        </CardContent>
      </Card>
    </>
  )
}