'use client'
import { Button } from "@/components/ui/button";
import { IconiFy } from "@/components/Iconify";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import TableEmptyState from "@/components/table-empty-state";


interface Character {
  id: number
  name: string;
  vocation: number;
  level: number
}

export default function Characters({ guild_id, rank_id }: { guild_id: number, rank_id: number }) {
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


  async function InvitePlayer(player_id: number) {
    const res = await fetch(`/api/guilds/manager/${guild_id}/player/${player_id}`, { method: 'POST', body: JSON.stringify({ rank_id }) })

    if (res.ok) {
      toast({
        title: "Success!",
        description: (<div>Invited player rank.</div>),
        variant: 'success'
      })
      router.refresh()
      return
    }

    toast({
      title: "Error!",
      description: (<div>Player as beam invited.</div>),
      variant: 'destructive'
    })
  }


  return (<>

    <Popover>
      <PopoverTrigger asChild>
        <Button variant="green" className="gap-2">
          <IconiFy icon="ei:plus" />  Invite Player
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">

        <div className="p-2 space-y-2">
          <div>
            <Input
              id="search"
              type="text"
              placeholder="Search Character..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              autoFocus
            />
          </div>

          {characters.length ? (
            <ScrollArea className="max-h-60">
              {characters.map((character) => {
                return (<>
                  <div className="flex flex-row items-center justify-between">
                    <p>{character.name}</p>
                    <Button variant={'ghost'} onClick={() => InvitePlayer(character.id)}>
                      <IconiFy icon={'ph:plus-circle'} />
                    </Button>
                  </div>
                </>)
              })}
            </ScrollArea>
          ) : (<TableEmptyState />)}

        </div>

      </PopoverContent>
    </Popover>
  </>)
}
