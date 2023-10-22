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
import { useToast } from "@/components/ui/use-toast"
import { signOut } from "next-auth/react"

export function ChangePasswordForm() {
  const { toast } = useToast()
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
  const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
  const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
  const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

  const loginFormSchema = z.object({
    oldPassword: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
    newPassword: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
    rePassword: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const { handleSubmit, reset, formState: { isSubmitting, isDirty } } = methods

  async function onSubmit(data: LoginFormValues) {
    fetch("/api/auth/manager/account/password", {
      method: "PUT",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        currentPassword: data.oldPassword,
        password: data.newPassword,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast({
          title: "Update Account",
          description: (
            <div>Password has been changed.</div>
          ),
        })
        signOut({ redirect: true })
        handle(false)
      } else {

        toast({
          title: "Error:",
          variant: 'destructive',
          description: (
            <div>{res.status}</div>
          ),
        })
      }
    });
  }

  function handle(value: boolean) {
    if (!value) reset()
    setShowNewTeamDialog(value)
  }

  return (
    <>
      <Button size={'sm'} className="whitespace-nowrap" onClick={() => setShowNewTeamDialog(true)}>Change Password</Button>

      {showNewTeamDialog && (
        <Dialog open={showNewTeamDialog} onOpenChange={handle}>
          <DialogContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2 space-y-2">
                  <RHFTextField
                    label="Current password"
                    name="oldPassword"
                    type="password"
                    disabled={isSubmitting}
                  />
                  <RHFTextField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    disabled={isSubmitting}
                  />
                  <RHFTextField
                    label="Password Again"
                    name="rePassword"
                    type="password"
                    disabled={isSubmitting}
                  />
                </div>
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