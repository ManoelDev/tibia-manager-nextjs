"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  guild_id: number
}

export const DeleteGuild = ({ guild_id }: Props) => {
  const router = useRouter()

  async function handleDeleteGuild() {
    const res = await fetch(`/api/guilds/manager/${guild_id}`, { method: 'DELETE' })

    if (res.ok) {
      toast({
        title: "Success!",
        description: (<div>Guild as beam delete.</div>),
        variant: 'success'
      })
      return router.push('/guilds')
    }

    toast({
      title: "Error!",
      description: (<div>Erro on delete Guild.</div>),
      variant: 'destructive'
    })
  }
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} className="whitespace-nowrap">Delete Guild</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm deletion!</AlertDialogTitle>
          <Alert>
            <AlertDescription>
              <AlertTitle>Are you sure you want to delete your guild?</AlertTitle>
              All Guild data will be deleted. This action is irreversible.
            </AlertDescription>
          </Alert>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={'destructive'} type="submit" onClick={handleDeleteGuild}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
