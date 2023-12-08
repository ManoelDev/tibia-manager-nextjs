import AnimatedOutfit from "@/components/aimations/AnimatedOutfit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { getVocation } from "@/utils/functions/getVocations";
import { character_market } from "@prisma/client";
import Image from "next/image";
import FilterVocation from "./components/filterVocation";
import Pagination from "@/components/pagination";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import Search from "./components/search";

export const revalidate = 0
const ITEMS_PER_PAGE = 25

const findPlayerById = async (id: number) => {
  const query = await prisma.players.findUnique({ where: { id } })
  return query
}

const getCharacterMarket = async ({ currentPage, vocation, search }: { search: string, vocation: string, currentPage: number, }) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const count = await prisma.character_market.count({
    where: {
      name: { contains: search ? search : undefined },
      AND: [
        vocation ? { vocation: { in: paginationGetVocation(vocation) } } : {},
      ],
    }
  })

  const players: character_market[] = await prisma.character_market.findMany({
    where: {
      name: { contains: search ? search : undefined },
      AND: [
        vocation ? { vocation: { in: paginationGetVocation(vocation) } } : {},
      ],
    },
    take: ITEMS_PER_PAGE,
    skip: offset,
  })

  return { players: convertBigIntsToNumbers(players), totalPage: Math.ceil(Number(count) / ITEMS_PER_PAGE) }
}

function paginationGetVocation(value: string): number[] | undefined {
  const vocationMap: { [key: string]: number[] } = {
    0: [0],
    1: [1, 5],
    2: [2, 6],
    3: [3, 7],
    4: [4, 8],
  };
  return vocationMap[`${value}`];
}

export default async function CharacterMarket({ searchParams }: { searchParams?: { search?: string; vocation?: string; page?: string; } }) {

  const currentPage = Number(searchParams?.page) || 1;
  const vocation = searchParams?.vocation || '';
  const search = searchParams?.search || '';

  const { players, totalPage } = await getCharacterMarket({ search, currentPage, vocation });


  return (<>
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Last Kills</CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">
        <div className="border rounded p-2 text-xs space-y-2">

          <div>System for buying and selling characters within the game. <b>Commands:</b></div>
          <div className=" pl-4">
            <li><b>!market sell</b> - Displays a list of your eligible characters for sale</li>
            <li><b>!market buy</b> - Lists characters available for sale (click on them to see their skills)</li>
            <li><b>!market remove</b> - Displays your list of offers available for removal</li>
          </div>

          <div className="space-y-2">
            <b>Exceptions</b>:

            <div className=" pl-4">
              <li>Only characters above level 100 can be added for sale</li>
              <li>When selling your character, an ingame fee of 5% is charged on the total value.</li>
            </div>
          </div>


        </div>
        <div className="border rounded">

          <div>

            <div className="grid sm:grid-cols-2 gap-2 border-b p-2">

              <div className="flex justify-end items-end">
                <Search placeholder="Search player name..." />
              </div>

              <div className="flex flex-row gap-3">
                <div className="flex-1">
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
                <div className="flex justify-end items-end">
                  <Pagination totalPages={totalPage} />
                </div>
              </div>

            </div>

          </div>

          <Table>
            <TableHeader className="pointer-events-none">
              <TableRow>
                <TableHead className="">Chars</TableHead>
                <TableHead className="">Value</TableHead>
                <TableHead className="">Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map(async (character: character_market, index: number) => {
                const player = convertBigIntsToNumbers(await findPlayerById(character.player_id))
                return (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex flex-col">
                        {player && <AnimatedOutfit outfit={player} alt={player.name} />}
                        <span><b>{character.name}</b></span>
                        <span><b>Level: </b>{character.level}</span>
                        <span><b>Vocation: </b>{getVocation(character.vocation)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center gap-3">
                        {character.price} <Image src="/icons/icon-tibiacoin.png" alt="tibiacointrusted" width={16} height={16} className=" w-[12px] h-[12px]" />
                      </div>
                    </TableCell>
                    <TableCell className="pl-6">

                      <li>Magic Level: {player?.maglevel}</li>
                      <li>Fist: {player?.skill_fist}</li>
                      <li>Club: {player?.skill_club}</li>
                      <li>Sword: {player?.skill_sword}</li>
                      <li>Axe: {player?.skill_axe}</li>
                      <li>Distance: {player?.skill_dist}</li>
                      <li>Shielding: {player?.skill_shielding}</li>

                    </TableCell>
                  </TableRow>
                )
              })}

            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </>)
}