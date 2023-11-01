import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import TableEmptyState from "@/components/table-empty-state";

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
          <TableHead className="text-xs">PaymentID</TableHead>
          <TableHead className="text-xs">Product</TableHead>
          <TableHead className="text-center text-xs">Provider</TableHead>
          <TableHead className="text-center text-xs">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-xs font-medium">{order.paymentID}</TableCell>
            <TableCell className="w-full">{order.description}</TableCell>
            <TableCell className=""><Image src='/payments/paymentmethodcategory31.gif' width={69} height={23} alt="PayPal" /></TableCell>
            <TableCell className=""><Badge variant={STATUS_TYPE[order.status]} className="w-full justify-center text-xs">{order.status}</Badge></TableCell>
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