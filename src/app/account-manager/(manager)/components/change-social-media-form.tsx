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
import { FormProvider, RHFTextField } from "@/components/hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icon } from '@iconify/react'
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

const loginFormSchema = z.object({
  instagram: z.string().optional(),
  youTube: z.string().optional(),
  twitch: z.string().optional(),
  password: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function ChangeSocialMediaForm({ defaultValues }: { defaultValues: Omit<LoginFormValues, 'password'> }) {
  const route = useRouter()

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues
  })

  const { handleSubmit, reset, formState: { isSubmitting, isDirty } } = methods

  async function onSubmit(data: LoginFormValues) {

    const response = await fetch("/api/auth/manager/account/social-midia-data", {
      method: "PUT",
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      toast({
        title: "Account Manager.",
        variant: 'success',
        description: (
          <div>Social media has been changed.</div>
        ),
      })
      reset()
      handle(false)
      revalidatePath('/account-manager')
      return
    }
  }

  function handle(value: boolean) {
    if (!value) reset()
    setShowNewTeamDialog(value)
  }

  return (
    <>
      <Button size={'sm'} className="whitespace-nowrap" onClick={() => setShowNewTeamDialog(true)}>Change Social Media</Button>

      {showNewTeamDialog && (
        <Dialog open={showNewTeamDialog} onOpenChange={handle}>
          <DialogContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Change Social Media</DialogTitle>
              </DialogHeader>
              <div className="grid py-4 space-y-2">
                <RHFTextField label="Instagram:" name="instagram" type="text" disabled={isSubmitting} />
                <RHFTextField label="YouTube:" name="youTube" type="text" disabled={isSubmitting} />
                <RHFTextField label="Twitch:" name="twitch" type="text" disabled={isSubmitting} />
              </div>
              <div className='p-2 rounded-sm text-sm border space-y-3'>
                <p>
                  Please enter your <strong>Password</strong> to confirm the request to change your social medias.
                </p>
                <RHFTextField name="password" type="password" disabled={isSubmitting} />
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  reset()
                  setShowNewTeamDialog(false)
                }} variant='outline'>Cancel</Button>
                <Button disabled={isSubmitting || !isDirty} type="submit">
                  {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Submit'}
                </Button>
              </DialogFooter>
            </FormProvider>
          </DialogContent>
        </Dialog>
      )}


    </>

  )
}