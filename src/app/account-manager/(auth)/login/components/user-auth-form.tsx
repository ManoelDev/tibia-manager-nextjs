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
import TwoFactAuth from "@/components/TwoFactAuth";
import { ErrorCode } from "@/utils/ErrorCode";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Uppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const Lowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const Digit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const SpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showOTP, setShowOTP] = React.useState<boolean>(false);

  const { toast } = useToast()
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const callbackUrl = searchParams.get("callbackUrl") || "/account-manager";

  const loginFormSchema = z.object({
    email: z.string().email(),
    // password: z.string().min(8, 'The password must be at least 8 characters long').and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
    password: z.string().min(8, 'The password must be at least 8 characters long'),
    totpCode: z.string().optional()
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema)
  })

  const { handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = methods
  const values = watch()

  async function onSubmit(data: LoginFormValues) {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        totpCode: data.totpCode ?? "",
      }).then((response) => {
        if (response?.ok) {
          router.refresh()
          return;
        }
        switch (response?.error) {
          case ErrorCode.IncorrectPassword:
            toast({
              title: "Login failed:",
              variant: 'destructive',
              description: (
                <div>invalid Credentials</div>
              ),
            })
            return;
          case ErrorCode.SecondFactorRequired:
            setShowOTP(true);
            return;
        }
      })
        .catch(() => {
          toast({
            title: "You submitted to data to login:",
            variant: 'destructive',
            description: (
              <div>Login failure</div>
            ),
          })
        });
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

          {/*
          <Dialog open={showOTP}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>Enter your code to enable 2FA</DialogDescription>
                {showOTP && <TwoFactAuth value={values.totpCode ?? ''} onChange={(val) => setValue('totpCode', val)} />}
              </DialogHeader>
              <DialogFooter>
                <Button disabled={isSubmitting} type="submit" className="sm:order-2 order-1">
                  {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Login'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          {showOTP && (
            <div>
              <Label>Enter your code 2FA</Label>
              <div>
                <TwoFactAuth value={values.totpCode ?? ''} onChange={(val) => setValue('totpCode', val)} />
              </div>
            </div>
          )
          }


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