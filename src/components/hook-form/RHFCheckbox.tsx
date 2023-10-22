
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '../ui/label'
import React from 'react'
import { Checkbox } from '../ui/checkbox'

type IProps = {
  name: string
  label?: string
}

type Props = IProps

export default function RHFCheckbox({ name, label, ...other }: Props) {
  const { control } = useFormContext()


  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox id={name} onCheckedChange={field.onChange} {...field} {...other} defaultValue={field.value} checked={field.value} />
          {label && <Label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>}
        </div>
      )}
    />
  )
}