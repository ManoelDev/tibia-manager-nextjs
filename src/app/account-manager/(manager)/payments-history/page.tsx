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
import { CancelOrderButton } from "./components/cancel-order-button";
import PaymentDetails from "./components/payment-details";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

async function getPaymentsHistory(id: number) {
  const account = await prisma.orders.findMany({
    where: { account_id: Number(id) },
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


export default async function PaymentsHistory() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect('/')

  const history = await getPaymentsHistory(Number(user?.id))
  if (!history) redirect('/')

  return (

    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Payments History</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="">Order ID</TableHead>
                  {/* <TableHead className="">Payment ID</TableHead> */}
                  <TableHead className="w-full">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Order Create</TableHead>
                  <TableHead className="whitespace-nowrap">Provider</TableHead>
                  <TableHead className="w-[100px] text-center">Status</TableHead>
                  <TableHead className="w-[100px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((order, i) =>
                (<TableRow key={i.toString()}>
                  <TableCell className="text-xs font-medium">{order.orderID}</TableCell>
                  {/* <TableCell className="text-xs font-medium">{order.paymentID}</TableCell> */}
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell className="text-center"><Image src='/payments/paymentmethodcategory31.gif' width={69} height={23} alt="PayPal" /></TableCell>
                  <TableCell className="text-center">
                    <Badge variant={STATUS_TYPE[order.status]} className="w-full justify-center">{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" size={'sm'}>
                          <span className="sr-only">Open menu</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="space-y-1">
                        <DropdownMenuItem asChild><PaymentDetails orderID={order.orderID} /></DropdownMenuItem>
                        {order.status === 'PENDING' && (
                          <DropdownMenuItem>
                            <CancelOrderButton order={order.orderID} />
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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