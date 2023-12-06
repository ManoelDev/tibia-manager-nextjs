"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { players } from "@prisma/client";

export default function CreateGuild({ players }: { players: players[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Guild</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Guild</DialogTitle>
        </DialogHeader>
        <div>
          form de criação de guild
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button type="submit">Create Guild</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}