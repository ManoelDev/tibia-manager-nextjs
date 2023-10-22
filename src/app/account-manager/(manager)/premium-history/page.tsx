import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PremiumHistory() {
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
                  <TableHead className="w-[60px]"></TableHead>
                  <TableHead className="w-full">Name</TableHead>
                  <TableHead className="w-[100px]">Leader</TableHead>
                  <TableHead className="w-[20px]">Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                <TableRow>
                  <TableCell>A</TableCell>
                  <TableCell>B</TableCell>
                  <TableCell>C</TableCell>
                  <TableCell>D</TableCell>
                </TableRow>


              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}