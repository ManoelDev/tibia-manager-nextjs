"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CreateGuild() {
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
          <Button variant={'outline'}>Cancel</Button>
          <Button type="submit">Create Guild</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}