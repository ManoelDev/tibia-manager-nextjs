"use client"
import { IconiFy } from "@/components/Iconify";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CreateNewRank from "./create-new-rank";

const FormSchema = z.object({
  guild_id: z.number(),
  ranks: z.array(z.object({ id: z.number(), name: z.string(), level: z.number() })),
})

type ItemFormValues = z.infer<typeof FormSchema>

export default function ManagerGuildRanks({ guild_id, ranks }: ItemFormValues) {
  const router = useRouter()
  const defaultValues = {
    guild_id,
    ranks
  }

  const methods = useForm<ItemFormValues>({ resolver: zodResolver(FormSchema), defaultValues })
  const { setValue, handleSubmit, watch, formState: { isSubmitting, isDirty } } = methods

  async function onSubmit(formData: ItemFormValues) {
    try {
      const res = await fetch(`/api/guilds/manager/${guild_id}/ranks`, { method: 'PUT', body: JSON.stringify(formData) })
      if (res.ok) {
        toast({
          title: "Success!",
          description: (<div>Guild as been updated.</div>),
          variant: 'success'
        })
      }
      router.refresh()
      document.getElementById('closeDialog')?.click();
    } catch (e: any) {
      console.error(e)
    }
  }

  async function onDelete(id: number) {
    try {
      const res = await fetch(`/api/guilds/manager/${guild_id}/ranks/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({
          title: "Success!",
          description: (<div>Rank as been deleted.</div>),
          variant: 'success'
        })
        router.refresh()
        return
      }
      if (res.status === 400) {
        toast({
          title: "Error!",
          description: (<div>Error on delete Rank.</div>),
          variant: 'destructive'
        })
        router.refresh()
        return
      }

      toast({
        title: "Error!",
        description: (<div>internal error on delete Rank.</div>),
        variant: 'destructive'
      })
      router.refresh()
    } catch (e: any) {
      console.error(e)
    }
  }

  return (<>
    <Dialog >
      <DialogTrigger asChild>
        <Button>Manager Ranks</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manager Ranks</DialogTitle>
        </DialogHeader>

        <CreateNewRank guild_id={guild_id} />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="border rounded-md">
            <Table >
              <TableBody>
                {watch('ranks').map((rank, index) => {
                  return (
                    <TableRow key={index} className="border-none">
                      <TableCell>
                        <RHFTextField name={`ranks.${index}.name`} />
                      </TableCell>
                      <TableCell>
                        <RHFSelect
                          placeholder="Select a rank"
                          name={`ranks.${index}.level`}
                          onValueChange={(value) => setValue(`ranks.${index}.level`, parseInt(value))}
                          defaultValue={`${rank.level}`}
                          options={[
                            { value: '3', label: 'Leader' },
                            { value: '2', label: 'Vice Leader' },
                            { value: '1', label: 'Member' }
                          ]}
                          keyValue='value'
                          LabelOption="label"
                        />
                      </TableCell>
                      <TableCell>
                        {index <= 2 ? (
                          <Button variant={'outline'} disabled>
                            <IconiFy icon={'ph:trash-simple'} />
                          </Button>
                        ) : (
                          <Button variant={'outline'} onClick={(e) => {
                            e.preventDefault()
                            onDelete(rank.id)
                          }}>
                            <IconiFy icon={'ph:trash-simple'} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' id="closeDialog">Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">Save</Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  </>)
}