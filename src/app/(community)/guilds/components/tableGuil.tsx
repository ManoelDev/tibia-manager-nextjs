"use client"
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/Typography";
import TableEmptyState from "@/components/table-empty-state";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateGuild from "../[name]/components/create-guild";

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

export default function TableGuild() {
  const { status, data } = useSession()
  const [players, setPlayer] = useState<any[]>([])
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

  async function getPlayer(id: number) {
    const res = await fetch(`/api/guilds/manager/players/${id}`)
    const body = await res.json()
    setPlayer(body.player)
  }

  useEffect(() => {
    if (data?.user) getPlayer(+data.user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className="flex flex-row gap-3">
        <Input
          id="search"
          type="text"
          placeholder="Search Guilds..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          autoFocus
        />

        {status === 'authenticated' && players.length > 0 && <CreateGuild players={players.map(p => ({ value: `${p.id}`, label: `${p.name}` }))} />}

      </div>

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
              {guilds.map((guild) => {
                return (
                  <TableRow key={guild.id.toString()} className="cursor-pointer" onClick={() => router.push(`/guilds/${guild.name}`)}>
                    <TableCell className="min-w-[64px]">
                      <Image src={`/guilds/${guild.logo_name}`} alt=" logo name " width={64} height={64} className="min-w-[64px]" />
                    </TableCell>
                    <TableCell className="w-full">
                      <Typography component={'span'} variant={'h6'}>{guild.name}</Typography>
                      <Typography component={'p'} variant={'body1'} className=" line-clamp-2 text-sm">{`${guild.description.toString()}`}</Typography>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Typography component={'span'} variant={'overline'}>{guild.players.name}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : <TableEmptyState />}

      </div>
    </>
  )
}