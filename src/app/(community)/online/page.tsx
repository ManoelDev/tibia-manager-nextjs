import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getVocation } from "@/utils/functions/getVocations";
import { fetchOnline } from "./actions";
import Pagination from "@/components/pagination";
import Link from "next/link";


export default async function Online({ searchParams }: { searchParams?: { page?: string; } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { players, totalPage } = await fetchOnline({ currentPage })

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Who&apos;s online?</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              <div />
              <Pagination totalPages={totalPage} />
            </div>
            {players.length > 0 ? (
              <Table>
                <TableHeader className="pointer-events-none">
                  <TableRow>
                    {/* <TableHead className="w-[80px]">Outfit</TableHead> */}
                    <TableHead className="w-full">Name</TableHead>
                    <TableHead className="w-[100px]">Vocation</TableHead>
                    <TableHead className="w-[20px]">Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((character, index) => {
                    return (
                      <TableRow key={index}>
                        {/* <TableCell>A</TableCell> */}
                        <TableCell><Link href={`/characters/${character.name}`} className="text-blue-500 hover:underline">{character.name}</Link></TableCell>
                        <TableCell className="whitespace-nowrap">{getVocation(character.vocation)}</TableCell>
                        <TableCell>{character.level}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : <TableEmptyState />}
          </div>
        </CardContent>
      </Card>
    </>
  )
}