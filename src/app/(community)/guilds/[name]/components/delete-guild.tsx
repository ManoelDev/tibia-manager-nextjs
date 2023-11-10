"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

interface Props {
  guild_id: number
}

export const DeleteGuild = ({ guild_id }: Props) => {
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
          <Button variant={'destructive'} type="submit">Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
