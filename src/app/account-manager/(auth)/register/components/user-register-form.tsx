"use client"
import * as React from "react"

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form"
import { Icon } from '@iconify/react'
import Link from "next/link"


interface UseRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const sexOptions = [{ value: '0', label: 'Male' }, { value: '1', label: 'Female' }]

export function UseRegisterForm({ className, ...props }: UseRegisterFormProps) {
  const router = useRouter();
  const { toast } = useToast()

  const loginFormSchema = z.object({
    accountName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
    characterName: z.string(),
    gender: z.string(),
    wLocation: z.string().optional(),
    wType: z.string().optional(),
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      gender: '0',
    }
  })

  const { handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(data: LoginFormValues) {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.accountName,
        email: data.email,
        password: data.password,
        gender: data.gender === '0' ? 'male' : 'female',
        characterName: data.characterName,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast({
          title: "Create Account",
          description: (
            <div>Account has been created.</div>
          ),
        })
        return router.push('/account-manager/login');

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RHFTextField
            name="accountName"
            label="Account Name"
            disabled={isSubmitting}
          />

          <RHFTextField
            name="email"
            label="Email Address"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RHFTextField
            name="password"
            label="Password"
            type="password"
            disabled={isSubmitting}
          />
          <RHFTextField
            name="passwordConfirm"
            label="Password Again"
            type="password"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RHFTextField
            name="characterName"
            label="Character Name"
            disabled={isSubmitting}
          />
          <RHFSelect
            name="gender"
            label="Sex"
            defaultValue={'0'}
            options={sexOptions}
          />
        </div>

        <div className="grid gap-2">
          <div className="grid gap-1">
            <h4 className="text-sm font-medium">World Location:</h4>
            <RadioGroup defaultValue="All" className="grid grid-cols-4 gap-4">
              <div>
                <RadioGroupItem value="All" id="All" className="peer sr-only" />
                <Label
                  htmlFor="All"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  All
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="europe"
                  id="europe"
                  className="peer sr-only"
                  disabled
                />
                <Label
                  htmlFor="europe"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  Europe
                </Label>
              </div>
              <div>
                <RadioGroupItem value="north-america" id="north-america" className="peer sr-only" disabled />
                <Label
                  htmlFor="north-america"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  North America
                </Label>
              </div>
              <div>
                <RadioGroupItem value="south-america" id="south-america" className="peer sr-only" disabled />
                <Label
                  htmlFor="south-america"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  South America
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-1">
            <h4 className="text-sm font-medium">World Type:</h4>
            <RadioGroup defaultValue="pvp" className="grid grid-cols-4 gap-4">
              <div>
                <RadioGroupItem value="pvp" id="pvp" className="peer sr-only" />
                <Label
                  htmlFor="pvp"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  Optional PvP
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="open-pvp"
                  id="open-pvp"
                  className="peer sr-only"
                  disabled
                />
                <Label
                  htmlFor="open-pvp"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  Open PvP
                </Label>
              </div>
              <div>
                <RadioGroupItem value="retro-pvp" id="retro-pvp" className="peer sr-only" disabled />
                <Label
                  htmlFor="retro-pvp"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  Retro Open PvP
                </Label>
              </div>
              <div>
                <RadioGroupItem value="retro-hard-pvp" id="retro-hard-pvp" className="peer sr-only" disabled />
                <Label
                  htmlFor="retro-hard-pvp"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 cursor-pointer"
                >
                  Retro Hardcore PvP
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant={'link'} asChild className="sm:order-1 order-2">
              <Link href="/account-manager/login" >
                Back to login
              </Link>
            </Button>
            <Button disabled={isSubmitting} type="submit" className="sm:order-2 order-1">
              {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Create Account'}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}