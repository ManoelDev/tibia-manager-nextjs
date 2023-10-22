
import { Controller, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'
import React from 'react'

type IProps = {
  name: string
  label?: string
  prefix?: string;
  suffix?: string;
}

type Props = IProps & InputProps

export default function RHFTextField({ name, label, ...other }: Props) {
  const { control } = useFormContext()
  const inputId = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid gap-2">
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <Input
            {...other}
            {...field}
            value={field.value ?? ''}
            error={!!error}
            helperText={error?.message}
            id={inputId}
          />
        </div>
      )}
    />
  )
}