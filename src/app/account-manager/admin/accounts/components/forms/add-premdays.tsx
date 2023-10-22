"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormProvider, RHFTextField } from "@/components/hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icon } from '@iconify/react'
import { toast } from "@/components/ui/use-toast"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"

interface FormProps {
  children: React.ReactNode
  id: number
}
export function AddPremDaysForm({ children, id }: FormProps) {
  const [open, setOpen] = useState(false);

  const accountFormSchema = z.object({
    amount: z.string(),
    type: z.string().default('premdays'),
  })

  type AccountFormValues = z.infer<typeof accountFormSchema>

  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      type: 'premdays'
    }
  })

  const { handleSubmit, reset, formState: { isSubmitting } } = methods

  async function onSubmit(data: AccountFormValues) {

    try {
      const response = await fetch(`/api/administration/accounts/add-premdays/${id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Account Manager",
          description: (
            <div>Add {data.amount} premium days.</div>
          ),
        })
        setOpen(false)
        reset()
        return
      }

      toast({
        title: "Error",
        variant: 'destructive',
        description: (
          <div>Add premium days as been failed.</div>
        ),
      })

    } catch (error) {
      reset()
    }
  }


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Premium Days</DialogTitle>
          </DialogHeader>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2 space-y-2">
                <RHFTextField
                  label="Amount"
                  name="amount"
                  type="number"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Add'}
              </Button>
            </DialogFooter>
          </FormProvider>



        </DialogContent>
      </Dialog>
    </>

  )
}