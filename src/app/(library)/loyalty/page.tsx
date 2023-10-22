import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function PremiumHistory() {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Loyalty</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            {/* <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Loyalty
            </div> */}
            <TableEmptyState />

          </div>
        </CardContent>
      </Card>
    </>
  )
}