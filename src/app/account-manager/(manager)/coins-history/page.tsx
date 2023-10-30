import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getHistory(account_id: number) {
  const account = await prisma.store_history.findMany({ where: { account_id }, take: 10, orderBy: { id: 'desc' } })
  return account
}

// 0 No transferable
// 1 Transferable
// 2 Tournament

const COIN_TYPE: { [key: number]: string } = {
  0: "icon-tibiacoin.png",
  1: "icon-tibiacointrusted.png",
  2: "icon-tibiacoin.png",
};

export default async function CoinsHistory() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect('/')

  const history = await getHistory(Number(user?.id))
  if (!history) redirect('/')

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Coin History</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="whitespace-nowrap">Coin</TableHead>
                  <TableHead >Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((store, i) =>
                (<TableRow key={i.toString()}>
                  <TableCell className="whitespace-nowrap">{dayjs.unix(Number(store.time)).format('D-M-YYYY H:mm')}</TableCell>
                  <TableCell className="whitespace-nowrap"><Badge variant="secondary" className="w-full justify-end" >{store.amount}</Badge></TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Badge variant={store.cust < 0 ? 'destructive' : 'success'} className="w-full justify-end">{store.cust > 0 && '+'}{store.cust.toLocaleString()}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Image src={`/icons/${COIN_TYPE[store.coin_type]}`} width={12} height={12} alt="" />
                  </TableCell>
                  <TableCell className="w-full">{store.description}</TableCell>
                </TableRow>)
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button asChild><Link href={`/account-manager/`}>Back</Link></Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}