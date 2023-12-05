import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function PremiumHistory() {

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Server info</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">


          <Tabs defaultValue="server_info" className="w-full">
            <TabsList className="w-full justify-start px-1">
              <TabsTrigger value="server_info">Server Information</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="pvp_information">PVP Information</TabsTrigger>
              <TabsTrigger value="stages">Stages</TabsTrigger>
              <TabsTrigger value="party_system">part System</TabsTrigger>
            </TabsList>

            <TabsContent value="server_info">
              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Server Information
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[130px]">IP:</TableCell>
                      <TableCell>IP AQUI</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Cliente:</TableCell>
                      <TableCell>Versão Cliente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Server type:</TableCell>
                      <TableCell className="capitalize">WORD TIPE</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Protection level:</TableCell>
                      <TableCell className="capitalize">PROTECTION LEVEL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Stamina:</TableCell>
                      <TableCell>1 stamina each 2 minutes</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="rates">
              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Rates
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[130px]">Exp Rate:</TableCell>
                      <TableCell>Stages</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Magic level:</TableCell>
                      <TableCell>25.0x (initial stages)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Skills:</TableCell>
                      <TableCell>50.0x (initial stages)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Loot:</TableCell>
                      <TableCell>3.0x (VIP 3.6)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pvp_information">
              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  PVP Information
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[130px]">PZ Locked:</TableCell>
                      <TableCell>1 minute</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">White skull:</TableCell>
                      <TableCell>2 minutes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Red skull:</TableCell>
                      <TableCell>3 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Black skull:</TableCell>
                      <TableCell>10 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">Red skull max:</TableCell>
                      <TableCell>5 kills</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">bacl skull max:</TableCell>
                      <TableCell>10 kills</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="stages">
              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Stages
                </div>
                <Table>
                  <TableHeader className="pointer-events-none">
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>Stages</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[130px]">1-8:</TableCell>
                      <TableCell>100x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">9-150:</TableCell>
                      <TableCell>150x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">151-250:</TableCell>
                      <TableCell>100x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">251-350:</TableCell>
                      <TableCell>50x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">351-400:</TableCell>
                      <TableCell>25x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">401-450:</TableCell>
                      <TableCell>15x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">451-900:</TableCell>
                      <TableCell>10x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[130px]">901+:</TableCell>
                      <TableCell>5x</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="party_system">
              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Party System
                </div>
                <Table className="text-center">
                  <TableBody>
                    <TableRow>
                      <TableCell><b>from 2 to 5 players with different vocations</b></TableCell>
                      <TableCell>Receive 100% of bônus the exp</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>6 or more players</b></TableCell>
                      <TableCell>15% break for every player that joins</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>


        </CardContent>
      </Card>
    </>
  )
}