"use client"

import { IconiFy } from "@/components/Iconify"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function TableActions({ row, ranks, disabled, accessLevel }: { row: any, disabled?: boolean, accessLevel: number, ranks: any[] }) {
  const router = useRouter()

  async function KickPlayer(guild_id: number, player_id: number) {
    // const res = await fetch(`/api/guilds/manager/${guild_id}/ranks`, { method: 'PUT', body: JSON.stringify(formData) })
    const res = await fetch(`/api/guilds/manager/${guild_id}/kick/${player_id}`, { method: 'DELETE' })

    if (res.ok) {
      toast({
        title: "Success!",
        description: (<div>Player as been kicked.</div>),
        variant: 'success'
      })
      router.refresh()
      return
    }

    toast({
      title: "Error!",
      description: (<div>Error on kick player.</div>),
      variant: 'destructive'
    })

  }

  async function UpdatePlayerRank(guild_id: number, player_id: number, rank_id: number) {
    // const res = await fetch(`/api/guilds/manager/${guild_id}/ranks`, { method: 'PUT', body: JSON.stringify(formData) })
    const res = await fetch(`/api/guilds/manager/${guild_id}/player/${player_id}`, { method: 'PUT', body: JSON.stringify({ rank_id }) })

    if (res.ok) {
      toast({
        title: "Success!",
        description: (<div>Update player rank.</div>),
        variant: 'success'
      })
      router.refresh()
      return
    }
    toast({
      title: "Error!",
      description: (<div>Error on update player rank.</div>),
      variant: 'destructive'
    })
  }

  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled}>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {accessLevel >= 2 && (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Edit Rank</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={row.rank_id.toString()} onValueChange={(e) => UpdatePlayerRank(row.guild_id, row.player_id, +e)}>
                  {ranks.map((rank) => {
                    return (
                      <DropdownMenuRadioItem key={rank.id} value={rank.id.toString()}>
                        <IconiFy icon={`game-icons:rank-${rank.level}`} className="w-8 h-8" /> {rank.name}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem disabled>Change Nick</DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => KickPlayer(row.guild_id, row.player_id)}>Leave-me</DropdownMenuItem> */}
          </>
        )}
        <DropdownMenuItem onClick={() => KickPlayer(row.guild_id, row.player_id)}>Kick</DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => KickPlayer(row.guild_id, row.player_id)}>Kick</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}