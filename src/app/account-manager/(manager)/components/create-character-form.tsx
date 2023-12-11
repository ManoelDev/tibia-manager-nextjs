"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icon } from '@iconify/react'
import RHFCheckbox from "@/components/hook-form/RHFCheckbox"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function CharacterForm() {
  const router = useRouter()

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  const characterFormSchema = z.object({
    name: z.string().nonempty(),
    sex: z.string(),
    wLocation: z.string().optional(),
    wType: z.string().optional(),
    world_id: z.string().optional(),
    tutorial: z.boolean(),
  })

  type CharacterFormValues = z.infer<typeof characterFormSchema>

  const methods = useForm<CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      sex: '0',
      tutorial: true,
    }
  })

  const { reset, handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(data: CharacterFormValues) {
    try {
      const response = await fetch("/api/accounts/players", {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: data.name,
          sex: +data.sex,
          tutorial: data.tutorial
        }),
      })

      if (response.ok) {
        toast({
          title: "Account Manager",
          variant: 'success',
          description: (
            <div>Character has been created.</div>
          ),
        })
        router.refresh()
        handle(false)
        return
      }

      toast({
        title: "Error",
        variant: 'destructive',
        description: (
          <div>Creation of character as been failed.</div>
        ),
      })

    } catch (error) {
      reset()
    }
  }

  function handle(value: boolean) {
    if (!value) reset()
    setShowNewTeamDialog(value)
  }

  return (
    <>
      <Button size={'sm'} onClick={() => setShowNewTeamDialog(true)}>New Character</Button>

      {showNewTeamDialog && (
        <Dialog open={showNewTeamDialog} onOpenChange={handle}>
          <DialogContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create new Characters</DialogTitle>
              </DialogHeader>

              <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none text-sm">
                Please choose a name and gender for your character. If you can&apos;t think of any fanciful name. In any case, the name must not violate the naming conventions established in the Tibia Rules, or your character may be deleted or the name blocked.
              </div>

              <div className="grid gap-4 py-2">
                <div className="grid gap-2 space-y-2">
                  <RHFTextField
                    label="Character Name"
                    name="name"
                    type="text"
                    disabled={isSubmitting}
                  />
                  <RHFSelect
                    LabelOption={'label'} keyValue={'value'}
                    label='Sex'
                    options={[{ value: '0', label: 'Female' }, { value: '1', label: 'Male' }]}
                    name="sex"
                    defaultValue={'0'}
                    disabled={isSubmitting}
                  />

                  <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none">
                    <RHFCheckbox
                      name="tutorial"
                      label="Do you want to play the tutorial?"
                    />
                  </div>

                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={isSubmitting}
                  onClick={() => {
                    reset()
                    setShowNewTeamDialog(false)
                  }}
                  variant='outline'
                >Cancel</Button>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Create'}
                </Button>
              </DialogFooter>
            </FormProvider>
          </DialogContent>
        </Dialog>
      )}


    </>

  )
}