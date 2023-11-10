
import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SelectProps } from '@radix-ui/react-select'
import { Label } from '../ui/label'

type RHFSelectProps<T> = {
  name: string
  options: T[]
  label?: string
  placeholder?: string
  defaultValue?: string | undefined
  keyValue: keyof T
  LabelOption: keyof T
} & SelectProps

export default function RHFSelect<T>({ name, options, label, defaultValue, placeholder, keyValue, LabelOption, ...other }: RHFSelectProps<T>) {
  const { control } = useFormContext()
  const inputId = `input-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="grid">
          {label && (
            <Label htmlFor={inputId} className='mb-2'>
              {label}
            </Label>
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={defaultValue}
            {...other}
          >
            <SelectTrigger id={inputId}>
              <SelectValue placeholder={placeholder ? placeholder : `Select ${name}...`} id='inputId' className={placeholder ? 'opacity-20 [span]:text-gray-200' : ''} />
            </SelectTrigger>
            <SelectContent className='overflow-auto max-h-[206px]'>
              {options?.map((item, index) => <SelectItem key={index} value={item[keyValue] as string}>{item[LabelOption] as string}</SelectItem>)}
            </SelectContent>
          </Select>
          {(!!error) && (
            <div className='text-sm text-red-500'>{error?.message}</div>
          )}
        </div>
      )}
    />
  )
}