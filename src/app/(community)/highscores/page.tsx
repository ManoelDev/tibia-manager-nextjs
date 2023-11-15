
import Pagination from "@/components/pagination";
import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getVocation } from "@/utils/functions/getVocations";
import { fetchCharacters } from "./actions";
import FilterVocation from "./components/vocations";
import FilterCategory from "./components/category";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import Link from "next/link";

const columnName = {
  skill_axe: 'Axe Fighting',
  skill_club: "Club Fighting",
  skill_dist: "Distance Fighting",
  experience: "Experience Point",
  skill_fishing: "Fishing",
  skill_fist: "First Fighting",
  maglevel: "Magic Level",
  skill_shielding: "Shielding",
  skill_sword: "Sword Fighting",
}
interface Props {
  categories: 'experience' | 'maglevel' | 'skill_axe' | 'skill_club' | 'skill_dist' | 'skill_fishing' | 'skill_fist' | 'skill_shielding' | 'skill_sword'
}


export default async function HighScores({ searchParams }: { searchParams?: { vocation?: string; page?: string; category: Props['categories'] } }) {

  const currentPage = Number(searchParams?.page) || 1;
  const vocation = searchParams?.vocation || '';
  const category = searchParams?.category || 'experience';

  const { players, totalPage } = await fetchCharacters({ currentPage, vocation, category });


  const itemsPerPage = 25;
  const startIndex = (currentPage - 1) * itemsPerPage;


  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>HighScores</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">

          <div className="grid sm:grid-cols-2 gap-2 border rounded-sm p-2">
            <div>
              <Label htmlFor="voc" className="ml-1">Vocation</Label>
              <FilterVocation
                options={[
                  { value: '0', label: 'No Vocations' },
                  { value: '2', label: 'Druid' },
                  { value: '4', label: 'Knight' },
                  { value: '3', label: 'Paladin' },
                  { value: '1', label: 'Sorcerer' },
                ]}
              />
            </div>
            <div>
              <Label htmlFor="voc" className="ml-1">Category</Label>
              <FilterCategory
                options={[
                  { value: 'skill_axe', label: 'Axe Fighting' },
                  { value: 'skill_club', label: 'Club Fighting' },
                  { value: 'skill_dist', label: 'Distance Fighting' },
                  { value: 'experience', label: 'Experience Point' },
                  { value: 'skill_fishing', label: 'Fishing' },
                  { value: 'skill_fist', label: 'First Fighting' },
                  { value: 'maglevel', label: 'Magic Level' },
                  { value: 'skill_shielding', label: 'Shielding' },
                  { value: 'skill_sword', label: 'Sword Fighting' },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              HighScores
              <Pagination totalPages={totalPage} />
            </div>
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="w-[30px]">Rank</TableHead>
                  <TableHead className="w-full">Name</TableHead>
                  <TableHead className="w-[150px] whitespace-nowrap">Vocation</TableHead>
                  <TableHead className="w-[20px] whitespace-nowrap">Level</TableHead>
                  <TableHead className="whitespace-nowrap text-right">
                    {columnName[category]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {players.map((character, index, array) => {
                  return (
                    // <TableRow className="cursor-pointer" key={index} onClick={() => console.log(`/characters/${character.name}`)}>
                    <TableRow key={startIndex}>
                      <TableCell className="w-[30px]">{startIndex + index + 1}</TableCell>
                      <TableCell className="">
                        <Link href={`/characters/${character.name}`} className="text-blue-500 hover:underline">
                          {character.name}
                        </Link>
                      </TableCell>
                      <TableCell className="w-[100px] whitespace-nowrap">{getVocation(character.vocation)}</TableCell>
                      <TableCell className="w-[20px]">{character.level}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{convertBigIntsToNumbers(character[category])}</TableCell>
                    </TableRow>
                  )
                })}

                {players.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <TableEmptyState />
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>



          </div>
        </CardContent>
      </Card>
    </>
  )
}