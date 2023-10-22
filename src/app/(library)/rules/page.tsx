import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import configLua from "@/hooks/configLua";
const lua = configLua()

export default function PremiumHistory() {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Rules</CardTitle>
        </CardHeader>

        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            {/* <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              Rules on {lua['serverName']}
            </div> */}
            <TableEmptyState />
          </div>
        </CardContent>
      </Card>
    </>
  )
}