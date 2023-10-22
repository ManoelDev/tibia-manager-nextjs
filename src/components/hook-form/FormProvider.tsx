import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type Props = {
  children: ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  id?: string
} & React.HTMLAttributes<HTMLFormElement>

export default function FormProvider({
  children,
  onSubmit,
  methods,
  id,
  className,
  ...props
}: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} id={id} className={cn("grid gap-4", className)} {...props}>
        {children}
      </form>
    </Form>
  )
}
