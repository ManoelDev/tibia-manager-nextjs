"use client"
import { FormProvider, RHFTextField } from "@/components/hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Character({ params }: { params: { key: string } }) {
  const characterFormSchema = z.object({
    code: z.string(),
    token: z.string(),
  })

  type CharacterFormValues = z.infer<typeof characterFormSchema>

  const methods = useForm<CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      token: params.key
    }
  })

  const { reset, handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(data: CharacterFormValues) {
    try {
      const response = await fetch("/api/auth/active-email", {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Account Manager",
          description: (<div>You email has been activated.</div>),
        })
        return
      }
      toast({
        title: "Account Manager",
        variant: 'destructive',
        description: (<div>Failed to active email.</div>),
      })
    } catch (error) {
      reset()
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Confirmation email</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="border rounded-sm p-2">
            <RHFTextField name="code" label="Activation Code" />
            <DialogFooter>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Submit'}
              </Button>
            </DialogFooter>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  )
}