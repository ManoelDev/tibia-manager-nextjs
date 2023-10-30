
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

async function getHistory(id: number) {
  const account = await prisma.orders.findMany({
    where: {
      account_id: Number(id),
      AND: { description: { contains: 'Days' } },
    },
    take: 10,
    orderBy: { id: 'desc' }
  })
  return account
}

const STATUS_TYPE: { [key: string]: "error" | "default" | "info" | "destructive" | "outline" | "secondary" | "success" | "warning" | null | undefined } = {
  DELIVERED: "success",
  PENDING: "info",
  CANCELED: "destructive"
};

export default async function PremiumHistory() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect('/')

  const history = await getHistory(Number(user?.id))
  if (!history) redirect('/')


  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Premium History</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="">Payment ID</TableHead>
                  <TableHead className="w-full">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Order Create</TableHead>
                  <TableHead className="whitespace-nowrap">Provider</TableHead>
                  <TableHead className="w-[100px] text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((order, i) =>
                (<TableRow key={i.toString()}>
                  <TableCell className="text-xs font-medium">{order.paymentID}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell className="text-center"><Image src='/payments/paymentmethodcategory31.gif' width={69} height={23} alt="PayPal" /></TableCell>
                  <TableCell>
                    <Badge variant={STATUS_TYPE[order.status]} className="w-full">{order.status}</Badge>
                  </TableCell>
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