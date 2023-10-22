"use client"
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import TableEmptyState from "@/components/table-empty-state";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface Guilds {
  id: number
  logo: string;
  name: string;
  motd: string;
  description: string;
  logo_name: string;
  players: { name: string }
  guild_membership: any[]
}

export default function Guilds() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('');
  const [guilds, setGuild] = useState<Guilds[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      let url: string
      if (searchTerm.length > 0) {
        url = `/api/guilds/${encodeURI(searchTerm)}`;
      } else {
        url = `/api/guilds`
      }
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data: Guilds[] = await response.json();
          setGuild(data);
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
          <CardTitle>Guilds</CardTitle>
        </CardHeader>


        <CardContent className="p-2 space-y-2">
          <Input
            id="search"
            type="text"
            placeholder="Search Guilds..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoFocus
          />

          <div className="flex flex-col rounded-sm border">
            {guilds.length > 0 ? (

              <Table>
                <TableHeader className="pointer-events-none">
                  <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Leader</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    guilds.map((guild) => {
                      return (
                        <TableRow key={guild.id.toString()} className="cursor-pointer" onClick={() => router.push(`/guilds/${guild.name}`)}>
                          <TableCell>
                            <Image src={`/guilds/${guild.logo_name}`} alt=" logo name " width={64} height={64} />
                          </TableCell>
                          <TableCell className="">
                            <Typography component={'span'} variant={'h6'}>{guild.name}</Typography>
                            <Typography component={'p'} variant={'body1'}>{guild.description}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography component={'span'} variant={'overline'}>{guild.players.name}</Typography>
                          </TableCell>

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