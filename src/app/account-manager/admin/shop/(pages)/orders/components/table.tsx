import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import TableEmptyState from "@/components/table-empty-state";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CancelOrderButton } from "./cancel-order-button";
import PaymentDetails from "./payment-details";

const STATUS_TYPE: { [key: string]: "error" | "default" | "info" | "destructive" | "outline" | "secondary" | "success" | "warning" | null | undefined } = {
  DELIVERED: "success",
  PENDING: "info",
  CANCELED: "destructive"
};

export default async function DataTable({ orders = [] }: { orders: any[] }) {

  return (<>
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead className="text-xs">AccountID</TableHead>
          <TableHead className="text-xs">PaymentID</TableHead>
          <TableHead className="text-xs">Product</TableHead>
          <TableHead className="text-center text-xs">Provider</TableHead>
          <TableHead className="text-center text-xs">Status</TableHead>
          <TableHead className="text-center text-xs"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-xs font-medium">{order.account_id}</TableCell>
            <TableCell className="text-xs font-medium">{order.paymentID}</TableCell>
            <TableCell className="w-full">{order.description}</TableCell>
            <TableCell className=""><Image src='/payments/paymentmethodcategory31.gif' width={69} height={23} alt="PayPal" /></TableCell>
            <TableCell className=""><Badge variant={STATUS_TYPE[order.status]} className="w-full justify-center text-xs">{order.status}</Badge></TableCell>
            <TableCell className="text-right">
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
                  <DropdownMenuItem asChild><PaymentDetails orderID={order.orderID} account_id={order.account_id} /></DropdownMenuItem>
                  {order.status === 'PENDING' && (
                    <DropdownMenuItem asChild>
                      <CancelOrderButton order={order.orderID} />
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {orders.length === 0 && (
        <TableRow className="pointer-events-none">
          <TableCell colSpan={4}>
            <TableEmptyState />
          </TableCell>
        </TableRow>
      )}
    </Table>
  </>)
}