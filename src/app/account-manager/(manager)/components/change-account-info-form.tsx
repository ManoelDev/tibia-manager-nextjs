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
import { toast } from "@/components/ui/use-toast"

import { Typography } from "@/components/Typography"
import { useRouter } from "next/navigation"
import { countries } from "./data/countries"

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "unspecified", label: "Unspecified" },
]

const passwordUppercase = z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character');
const passwordLowercase = z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter');
const passwordDigit = z.string().regex(/\d/, 'The password must contain at least one numeric digit');
const passwordSpecialChar = z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character');

const FormSchema = z.object({
  firstName: z.string().optional().or(z.literal('')),
  lastName: z.string().optional().or(z.literal('')),
  gender: z.string().optional().or(z.literal('')),
  phoneNumber: z.string().optional().or(z.literal('')),
  address: z.object({
    zipCode: z.string().optional().or(z.literal('')),
    country: z.string().optional().or(z.literal('')),
    state: z.string().optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
    street: z.string().optional().or(z.literal('')),
    houseNumber: z.string().optional().or(z.literal('')),
    comment: z.string().optional().or(z.literal('')),
  }).nullable(),
  password: z.string().min(8).and(passwordUppercase).and(passwordLowercase).and(passwordDigit).and(passwordSpecialChar),
})

type formValues = z.infer<typeof FormSchema>

export function ChangeAccountInfoForm({ defaultValues }: { defaultValues: Omit<formValues, 'password'> }) {
  const route = useRouter()

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

  const methods = useForm<formValues>({
    resolver: zodResolver(FormSchema),
    defaultValues
  })

  const { handleSubmit, reset, getValues, formState: { isSubmitting, isDirty, errors } } = methods

  async function onSubmit(data: formValues) {

    const response = await fetch("/api/auth/manager/account/information-data", {
      method: "PUT",
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      toast({
        title: "Account Manager",
        variant: 'success',
        description: (<div>Your data information has been changed.</div>),
      })
      route.refresh()
      handle(false)
      return
    }

    toast({
      variant: 'destructive',
      title: "Account Manager",
      description: (
        <div>Error</div>
      ),
    })

  }

  function handle(value: boolean) {
    if (!value) reset()
    setShowNewTeamDialog(value)
  }

  return (
    <>
      <Button size={'sm'} className="whitespace-nowrap" onClick={() => setShowNewTeamDialog(true)}>Change Information</Button>
      <Dialog open={showNewTeamDialog} onOpenChange={handle}>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Change Registration Data</DialogTitle>
            </DialogHeader>
            <div className="grid py-4 space-y-2">
              <Typography variant={'h6'} className="py-2">Personal</Typography>
              <div className="grid sm:grid-cols-2 gap-2">
                <RHFTextField label="First Name:" name="firstName" type="text" disabled={isSubmitting} />
                <RHFTextField label="Last Name:" name="lastName" type="text" disabled={isSubmitting} />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <RHFSelect LabelOption={'label'} keyValue={'value'} name="gender" label="Sex:" defaultValue={getValues('gender')} options={genders} />
                <RHFTextField label="Mobile Phone:" name="phoneNumber" type="text" disabled={isSubmitting} />
              </div>
              <Typography variant={'h6'} className="py-2">Address</Typography>
              <div className="grid sm:grid-cols-2 gap-2">
                <RHFTextField label="Postal Code:" name="address.zipCode" type="text" disabled={isSubmitting} />
                <RHFTextField label="Country" name="address.country" type="text" disabled={isSubmitting} />

              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <RHFTextField label="State" name="address.state" type="text" disabled={isSubmitting} />
                <RHFTextField label="City" name="address.city" type="text" disabled={isSubmitting} />

              </div>
              <RHFTextField label="Street Address:" name="address.street" type="text" disabled={isSubmitting} />
              <div className="grid sm:grid-cols-2 gap-2">
                <RHFTextField label="House Number:" name="address.houseNumber" type="text" disabled={isSubmitting} />
              </div>
              <RHFTextField label="Additional Information:" name="address.comment" type="text" disabled={isSubmitting} />
            </div>
            <div className='p-2 rounded-sm text-sm border space-y-3'>
              <p>
                Please enter your <strong>Password</strong> to confirm the request to change your registration data.
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


    </>

  )
}