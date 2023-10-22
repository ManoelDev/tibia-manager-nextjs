import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AddCoinsForm } from "./forms/add-coins";
import { AddPremDaysForm } from "./forms/add-premdays";

interface Props {
  id: number
}

export default function ActionsDropdown({ id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[24px] h-[24px] p-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
            <path fill="currentColor" d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Manager</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled>
            Informations
          </DropdownMenuItem>

          <AddCoinsForm id={id}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Add Coins
            </DropdownMenuItem>
          </AddCoinsForm>

          <AddPremDaysForm id={id}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Add Premium
            </DropdownMenuItem>
          </AddPremDaysForm>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger><span>History</span></DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem> <span>Payments</span> </DropdownMenuItem>
                <DropdownMenuItem disabled> <span>Account</span> </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem disabled> <span>More...</span> </DropdownMenuItem> */}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger><span>Bans</span></DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem> <span>Account</span> </DropdownMenuItem>
                <DropdownMenuItem> <span>Player</span> </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem> <span>Tickets</span> </DropdownMenuItem>
        <DropdownMenuItem>
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}