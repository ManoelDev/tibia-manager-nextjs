"use client"
import * as React from "react"
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { cn } from "@/lib/utils"

import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider, RHFTextField } from "@/components/hook-form"
import { RocketIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from '@iconify/react'
import Link from "next/link"
import { IconiFy } from "@/components/Iconify";

const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const { toast } = useToast()
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const callbackUrl = searchParams.get("callbackUrl") || "/account-manager";

  const loginFormSchema = z.object({
    email: z.string().email(),
    // password: z.string().min(8, 'The password must be at least 8 characters long').and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
    password: z.string().min(8, 'The password must be at least 8 characters long'),
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const { handleSubmit, formState: { isSubmitting, errors } } = methods

  async function onSubmit(data: LoginFormValues) {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });
      if (!res?.error) {
        router.refresh();
        // return router.push(callbackUrl);
      } else {
        toast({
          title: "You submitted to data to login:",
          variant: 'destructive',
          description: (
            <div>Login failure</div>
          ),
        })
      }
    } catch (error) {

    }
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        {errors.root && (
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2 space-y-2">
          <RHFTextField
            name="email"
            label="Email Address"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isSubmitting}
          />
          <div className="relative">
            <RHFTextField
              name="password"
              label="Tibia Password"
              type={showPassword ? 'text' : 'password'}
              disabled={isSubmitting}
              className="pr-6"
            />
            <IconiFy onClick={() => setShowPassword(!showPassword)} icon={!showPassword ? 'ph:eye-light' : 'ph:eye-slash-light'} className="absolute right-2 bottom-2" />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant={'link'} asChild className="sm:order-1 order-2">
              <Link href="/account-manager/recovery" >
                Recovery Password
              </Link>
            </Button>
            <Button disabled={isSubmitting} type="submit" className="sm:order-2 order-1">
              {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Login'}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}