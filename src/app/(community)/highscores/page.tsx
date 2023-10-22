"use client"
import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getVocation } from "@/utils/functions/getVocations";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";


interface Characters {
  experience: number;
  level: number;
  maglevel: number;
  name: string;
  skill_axe: number;
  skill_club: number;
  skill_dist: number;
  skill_fishing: number;
  skill_fist: number;
  skill_shielding: number;
  skill_sword: number;
  vocation: number;
}

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

type OrderType = keyof typeof columnName;

export default function HighScores() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<{ vocation: string; order: OrderType; }>({
    vocation: 'all',
    order: 'experience',
  });
  const [characters, setCharacters] = useState<Characters[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      let filter = '';

      if (searchTerm.vocation && searchTerm.vocation !== 'all') {
        filter += `vocation=${searchTerm.vocation}`;
      }

      if (searchTerm.order) {
        if (filter.length > 0) filter += '&';
        filter += `order=${searchTerm.order}`;
      }
      try {
        const response = await fetch(`/api/characters?${filter}`);
        if (response.ok) {
          const data: Characters[] = await response.json();
          setCharacters(data);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }, 500);
  }, [searchTerm]);
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>HighScores</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">

          <div className="grid sm:grid-cols-2 gap-2 border rounded-sm p-2">
            <div className="grid space-y-2">
              <Label htmlFor="voc" className="ml-1">Vocation</Label>
              <Select defaultValue="all" onValueChange={(e) => setSearchTerm((old) => ({ ...old, vocation: e }))}>
                <SelectTrigger id="voc">
                  <SelectValue placeholder="Select Vocation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="0">No Vocations</SelectItem>
                  <SelectItem value="2">Druid</SelectItem>
                  <SelectItem value="4">Knight</SelectItem>
                  <SelectItem value="3">Paladin</SelectItem>
                  <SelectItem value="1">Sorcerer</SelectItem>
                </SelectContent>
              </Select>
            </div>



            <div className="grid space-y-2">
              <Label htmlFor="cat" className="ml-1">Category</Label>
              <Select defaultValue="experience" onValueChange={(e: OrderType) => setSearchTerm((old) => ({ ...old, order: e }))}>
                <SelectTrigger id="cat">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skill_axe">Axe Fighting</SelectItem>
                  <SelectItem value="skill_club">Club Fighting</SelectItem>
                  <SelectItem value="skill_dist">Distance Fighting</SelectItem>
                  <SelectItem value="experience">Experience Point</SelectItem>
                  <SelectItem value="skill_fishing">Fishing</SelectItem>
                  <SelectItem value="skill_fist">First Fighting</SelectItem>
                  <SelectItem value="maglevel">Magic Level</SelectItem>
                  <SelectItem value="skill_shielding">Shielding</SelectItem>
                  <SelectItem value="skill_sword">Sword Fighting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col rounded-sm border">
            <Table>
              <TableHeader className="pointer-events-none">
                <TableRow>
                  <TableHead className="w-[30px]">Rank</TableHead>
                  {/* <TableHead className="w-[60px]">Outfit</TableHead> */}
                  <TableHead className="w-full">Name</TableHead>
                  <TableHead className="w-[150px] whitespace-nowrap">Vocation</TableHead>
                  <TableHead className="w-[20px] whitespace-nowrap">Level</TableHead>
                  <TableHead className="whitespace-nowrap text-right">{columnName[`${searchTerm.order}`]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {characters.map((character, index) => {
                  return (
                    <TableRow className="cursor-pointer" key={index} onClick={() => router.push(`/characters/${character.name}`)}>
                      <TableCell className="w-[30px]">
                        {index + 1}
                      </TableCell>
                      {/* <TableCell className="w-[60px]">
                            {character.outfit}
                          </TableCell> */}
                      <TableCell className="">
                        {character.name}
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {getVocation(character.vocation)}
                      </TableCell>
                      <TableCell className="w-[20px]">
                        {character.level}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {character[searchTerm.order]}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {characters.length === 0 && (
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