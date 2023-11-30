"use client"
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { getVocation } from "@/utils/functions/getVocations";
import TableEmptyState from "@/components/table-empty-state";
import AnimatedOutfit from "@/components/aimations/AnimatedOutfit";

interface Character {
  id: number
  name: string;
  vocation: number;
  level: number
  looktype: number
}

export default function Characters() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTerm === "") return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/characters/${searchTerm}`);
        if (response.ok) {
          const data: Character[] = await response.json();
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
          <CardTitle>Characters</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <Input
            id="search"
            type="text"
            placeholder="Search Character..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoFocus
          />
          <div className="flex flex-col rounded-sm border">
            {characters.length > 0 ? (

              <Table>
                <TableHeader className="pointer-events-none">
                  <TableRow>
                    <TableHead className="w-[60px]">Outfit</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="w-[100px]">Vocation</TableHead>
                    <TableHead className="w-[20px]">Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    characters.map((player) => {
                      return (
                        <TableRow key={player.id.toString()} onClick={() => router.push(`/characters/${player.name}`)} className="cursor-pointer">
                          <TableCell>
                            <AnimatedOutfit outfit={player} alt={player.name} />
                          </TableCell>
                          <TableCell>{player.name}</TableCell>
                          <TableCell className="whitespace-nowrap">{getVocation(player.vocation)}</TableCell>
                          <TableCell className="text-right">{player.level}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            ) : <TableEmptyState />}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function CharactersList({ characters }: { characters: Character[] }) {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col rounded-sm border">
        <Table>
          <TableHeader className="pointer-events-none">
            <TableRow>
              <TableHead className="w-[60px]">Outfit</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="w-[100px] text-center">Vocation</TableHead>
              <TableHead className="w-[20px]">Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              characters.map((player) => {
                return (
                  <TableRow key={player.id.toString()} onClick={() => router.push(`/characters/${player.name}`)}>
                    <TableCell>{player.id.toString()}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-center">{getVocation(player.vocation)}</TableCell>
                    <TableCell className="text-center">{player.level}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}