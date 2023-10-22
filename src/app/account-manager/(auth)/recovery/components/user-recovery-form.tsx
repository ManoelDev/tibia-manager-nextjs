"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from '@iconify/react'


import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, RHFTextField } from "@/components/hook-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserRecoveryFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRecoveryForm({ className, ...props }: UserRecoveryFormProps) {
  const { toast } = useToast()

  const loginFormSchema = z.object({
    email: z.string(),
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),

  })

  const { handleSubmit, reset, formState: { isSubmitting } } = methods

  async function onSubmit(data: LoginFormValues) {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    await fetch("/api/auth/recovery-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast({
          title: "Success!",
          description: (
            <div>Sending Email to <strong>{data.email}</strong></div>
          ),
          variant: 'success'
        })
        reset()
        return
      } else {
        const { error } = await res.json();
        toast({
          title: "Error:",
          variant: 'destructive',
          description: (
            <div>{error}</div>
          ),
        })
      }
    });

  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        <RHFTextField
          name="email"
          label="Email Address/Account Name"
          type="text"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isSubmitting}
        />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant={'link'} asChild className="sm:order-1 order-2">
            <Link href="/account-manager/login" >
              Go to Login
            </Link>
          </Button>
          <Button disabled={isSubmitting} type="submit" className="sm:order-2 order-1">
            {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Send'}
          </Button>
        </div>


      </FormProvider>
    </div>
  )
}