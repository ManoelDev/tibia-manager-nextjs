import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

async function getCategories() { }
export default function AdminCategories() {
  const categories: any[] = []
  return (
    <>
      <div className='border rounded-sm'>
        <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
          Categories Manager
          <div className="flex flex-row gap-2 items-center">
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 7l-5 5m0 0l5 5" />
              </svg>
            </Button>
            <span>0 of 0</span>
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" />
              </svg>
            </Button>
          </div>
        </div>

        <Table>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>cell</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
