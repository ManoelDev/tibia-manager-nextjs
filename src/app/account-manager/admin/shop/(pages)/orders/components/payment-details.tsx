'use client'
import { Button } from "@/components/ui/button";
import { GetAccount, detailsOrder } from "./actions";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import dayjs from "dayjs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export default function PaymentDetails({ orderID, account_id }: { orderID: string, account_id: number }) {
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)
  const [response, setResponse] = useState<any>()
  const [account, setAccount] = useState<any>()
  return (<>
    <Dialog open={showDialog} onOpenChange={setShowDialog} >
      <Button
        className="text-xs py-1 px-2 line-clamp-1 h-auto w-full text-left"
        variant={'ghost'}
        onClick={async () => {
          try {
            const { jsonResponse, httpStatusCode } = await detailsOrder(orderID)
            const account = await GetAccount(account_id)
            if (httpStatusCode === 200) {
              setResponse(jsonResponse)
              setAccount(account)
              setShowDialog(true)
            }
          } catch (error) {
            console.log('Error:', error)
            return toast({
              title: 'Error',
              description: (<>Error: {error}</>)
            })
          }

        }}
      >
        Details
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="border rounded">
          <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
            Paypal Information
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-[120px] text-xs font-medium">OrderID:</TableCell>
                <TableCell className="text-xs font-medium">{orderID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-[120px] text-xs font-medium">Created:</TableCell>
                <TableCell className="text-xs font-medium">{dayjs(response?.created_time).format('D/MM/YYYY HH:mm')}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-xs font-medium">Paypal Status:</TableCell>
                <TableCell className="text-xs font-medium">{response?.status}</TableCell>
              </TableRow>

              {response?.payer &&
                <TableRow>
                  <TableCell className="text-xs font-medium align-top">Payer:</TableCell>
                  <TableCell className="text-xs font-medium">
                    <ul>
                      <li><b>Email: </b>{response?.payer?.email_address}</li>
                      <li><b>Name: </b>{response?.payer?.name.given_name} {response?.payer?.name.surname}</li>
                    </ul>
                  </TableCell>
                </TableRow>
              }

              {response?.purchase_units && response?.purchase_units.map((purchase: any, index: number) => {
                return (<>
                  <TableRow key={index.toString()}>
                    <TableCell className="w-[120px] text-xs font-medium">Currency:</TableCell>
                    <TableCell className="text-xs">{purchase?.amount?.currency_code}</TableCell>
                  </TableRow>
                  <TableRow key={index}>
                    <TableCell className="w-[120px] text-xs font-medium">Value:</TableCell>
                    <TableCell className="text-xs">{purchase?.amount?.value}</TableCell>
                  </TableRow>
                </>)
              })}

            </TableBody>
          </Table>

          <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b border-t'>
            Account Information
          </div>

          <Table>
            <TableBody>

              <TableRow>
                <TableCell className="w-[120px] text-xs font-medium">AccountID:</TableCell>
                <TableCell className="text-xs">{account_id}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-xs font-medium">Account Name:</TableCell>
                <TableCell className="text-xs">{account?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-xs font-medium">Account Email:</TableCell>
                <TableCell className="text-xs">{account?.email}</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}