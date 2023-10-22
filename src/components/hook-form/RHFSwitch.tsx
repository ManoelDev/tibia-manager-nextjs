
import { Controller, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'
import React from 'react'
import { Switch } from '../ui/switch'

type IProps = {
  name: string
  label?: string
}

type Props = IProps & InputProps

export default function RHFSwitch({ name, label }: Props) {
  const { control } = useFormContext()
  const inputId = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="grid gap-2">
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <Switch
            {...field}
            value={field.value ?? ''}
            defaultValue={field.value}
            checked={field.value}
            onCheckedChange={field.onChange}
            id={inputId}
          />
        </div>
      )}
    />
  )
}