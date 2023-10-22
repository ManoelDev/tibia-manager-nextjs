'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function TicketForm() {

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setShowNewTeamDialog(true)}>New Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Open new ticket</DialogTitle>
          <DialogDescription>
            The ticket must be used to report problems, ask questions and send proof.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          FORM
        </div>
        <DialogFooter>
          <Button onClick={() => setShowNewTeamDialog(false)} variant='ghost'>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}