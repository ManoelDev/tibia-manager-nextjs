
import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SelectProps } from '@radix-ui/react-select'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'

type IProps = {
  name: string
  options: Array<{ value: string, label: string }>
  label?: string
  placeholder?: string
  defaultValue?: string | undefined
}

type Props = IProps & SelectProps

export default function RHFSelect({ name, options, label, defaultValue, placeholder, ...other }: Props) {
  const { control } = useFormContext()
  const inputId = `input-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="grid gap-2">
          {label && (
            <Label htmlFor={inputId}>
              {label}
            </Label>
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={defaultValue}
            {...other}
          >
            <SelectTrigger id={inputId}>
              <SelectValue placeholder={placeholder} id='inputId' />
            </SelectTrigger>
            <SelectContent className='overflow-auto max-h-[206px]'>
              {options?.map((item, index) => <SelectItem key={index} value={item.value}>{item.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  )
}