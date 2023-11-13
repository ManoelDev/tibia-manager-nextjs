'use client'
import { players } from "@prisma/client";
import { z } from "zod"

import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormProvider } from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFTextarea from "@/components/hook-form/RHFTextarea";
import RHFSwitch from "@/components/hook-form/RHFSwitch";

interface IProps { chars: players[] }


const EditPlayerSchema = z.object({
  comment: z.string(),
  hidden: z.boolean().default(false),
})
type formValues = z.infer<typeof EditPlayerSchema>


export default function CharactersList({ chars = [] }: IProps) {

  return (
    <>
      <section>
        <div className="flex flex-col rounded-sm border">
          <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
            Characters
          </div>
          <Table>
            <TableHeader className="pointer-events-none">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="w-[30px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chars.map((player) => {
                return (
                  <TableRow key={player.id.toString()}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell><Badge variant={"error"}>OFFLINE</Badge></TableCell>
                    <TableCell><Actions player={player} /></TableCell>
                  </TableRow>
                )
              })}
              {chars.length === 0 && (
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" className="text-center">No Player.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}

function Actions({ player }: { player: players }) {
  const route = useRouter()

  const [playerName, setPlayerName] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [open, setIsOpen] = useState(false)

  const deletePlayer = async (id: number) => {
    await fetch(`/api/accounts/players/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Account Manager",
          description: `This player '${player.name}' has been deleted.`
        })
        setShowDeleteDialog(false)
        route.refresh()
        return
      }
      if (res.status === 401) {
        toast({
          variant: 'destructive',
          title: "Account Manager",
          description: "You are not authorized to delete this player."
        })

        return
      } else {
        toast({
          variant: 'destructive',
          title: "Account Manager",
          description: "Erro on delete character."
        })
      }
      return
    })
  }


  const methods = useForm<formValues>({
    resolver: zodResolver(EditPlayerSchema),
    defaultValues: {
      hidden: player.hidden,
      comment: player.comment
    }
  })

  const { handleSubmit, reset, formState: { isSubmitting } } = methods

  async function HandleEditPlayer(body: formValues) {
    await fetch(`/api/accounts/players/${player.id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Account Manager",
          description: `This player '${player.name}' has been edited.`
        })
        setIsOpen(false)
        route.refresh()
        return
      }
      if (res.status === 401) {
        toast({
          variant: 'destructive',
          title: "Account Manager",
          description: "You are not authorized to edit this player."
        })

        return
      } else {
        toast({
          variant: 'destructive',
          title: "Account Manager",
          description: "Erro on edit character."
        })
      }
      return
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" size={'sm'}>
            <span className="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path fill="currentColor" d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>Edit Player</DropdownMenuItem>
          <DropdownMenuItem onClick={async () => setShowDeleteDialog(true)}>Delete Player</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(HandleEditPlayer)}>
              <DialogHeader>
                <DialogTitle>Edit Character</DialogTitle>
              </DialogHeader>
              <DialogDescription className="rounded-sm border">
                <div className='flex p-2 items-center justify-between bg-gray-100 text-sm text-black'>
                  Character Data
                </div>
                <Table className="pointer-events-none">
                  <TableBody>
                    <TableRow>
                      <TableCell>Name:</TableCell>
                      <TableCell className="font-bold">{player.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sec:</TableCell>
                      <TableCell>{player.sex === 0 ? 'Male' : 'Female'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogDescription>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-row justify-between gap-2 items-center">
                    <Label>Hidden character</Label>

                    <RHFSwitch name="hidden" />
                  </div>
                  <div className="space-y-2">
                    <Label>Comment</Label>
                    <RHFTextarea name="comment" />
                  </div>
                </div>

              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  reset()
                  setIsOpen(false)
                }}>
                  Close
                </Button>
                <Button disabled={isSubmitting} type="submit">
                  Save
                </Button>
              </DialogFooter>
            </FormProvider>
          </DialogContent>
        </Dialog>
      )}

      {showDeleteDialog && (
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-red-500 border p-2 rounded-sm">
                This action cannot be undone.
                This player will no longer be accessible.
              </AlertDialogDescription>
              <div className="space-y-1">
                <Label>
                  Enter &quot;{player.name}&quot; to continue.
                </Label>
                <Input
                  placeholder={player.name ?? 'digite o nome do player'}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={async () => await deletePlayer(player.id)}
                disabled={playerName !== player.name}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </>
  )
}