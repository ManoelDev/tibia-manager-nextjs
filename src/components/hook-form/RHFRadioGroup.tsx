import Image from 'next/image'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../ui/input'
import { Label } from '../ui/label'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { randomUUID } from 'crypto'

type IProps = {
  name: string
  label: string
  options: [{ value: string, label: string }]
}

type Props = IProps & InputProps

export default function RHFRadioGroup({ name, label, options }: Props) {
  const { control } = useFormContext()
  const inputId = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          {label && (<Label>{label}</Label>)}
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
          >
            {options.map((opt, index) => (
              <div key={String(index + 1)} className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value={opt.value} id={inputId} />
                <Label htmlFor={inputId}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  )
}

type RHFRadioGroupItemShopProps = {
  name: string
  options: { title: string, id: number, price: string, currency: string, img_url: string }[]
  defaultValue?: string
}

export function RHFRadioGroupItemShop({ name, options = [] }: RHFRadioGroupItemShopProps) {
  const { control } = useFormContext()
  const inputId = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2"
        >
          {
            options.map((opt, i) => {
              return (
                <div key={i} className="bg-[url('/shop/serviceid_icon_normal.png')] w-[150px] h-[150px]">
                  <div className="flex flex-col justify-between items-center hover:bg-[url('/shop/serviceid_icon_over.png')] w-[150px] h-[150px]">
                    <RadioGroupItem value={opt.id.toString()} id={i.toString()} className="peer sr-only absolute" />
                    <Label
                      htmlFor={i.toString()}
                      className="flex flex-col absolute w-[150px] h-[150px] peer-data-[state=checked]:bg-[url('/shop/serviceid_icon_selected.png')] [&:has([data-state=checked])]:bg-[url('/shop/serviceid_icon_selected.png')] peer-disabled:bg-[url('/shop/serviceid_deactivated.png')] cursor-pointer"
                    />
                    <div className="pt-[18px] text-white text-[10px]">{opt.title}</div>
                    <Image src={opt.img_url} width={128} height={64} alt={""} />
                    <div className="pb-[8px] text-white text-[10px]">{opt.price} {opt.currency} *</div>
                  </div>
                </div>
              )
            })
          }
        </RadioGroup>
      )}
    />
  )
}


type RHFRadioGroupPaymentProps = {
  name: string
  options: { title: string, value: string, img_url: string }[]
  defaultValue?: string

}
export function RHFRadioGroupPayments({ name, options }: RHFRadioGroupPaymentProps) {
  const { control } = useFormContext()
  const inputId = React.useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2"
        >
          {
            options.map((opt) => (<>
              <div className="bg-[url('/shop/pmcid_icon_normal.png')] w-[150px] h-[147px] ">
                <div className="flex flex-col hover:bg-[url('/shop/pmcid_icon_over.png')] w-[150px] h-[147px]">
                  <RadioGroupItem value={opt.value} id={inputId} className="peer sr-only absolute" />
                  <Label
                    htmlFor={inputId}
                    className="flex flex-col absolute w-[150px] h-[147px] peer-data-[state=checked]:bg-[url('/shop/pmcid_icon_selected.png')] [&:has([data-state=checked])]:bg-[url('/shop/pmcid_icon_selected.png')] peer-disabled:bg-[url('/shop/serviceid_deactivated.png')] cursor-pointer"
                  />
                  <div className="w-[150px] h-[147px] flex flex-col items-center pt-[24px] ">
                    <Image src={'/payments/paymentmethodcategory31.gif'} width={69} height={23} alt={""} className="pt-14px" />
                    <div className="text-white text-xs mt-6 text-[10pt]">{opt.title}</div>
                    <div className="mt-4 text-center text-[8pt] text-gray-400">
                      <div className="">User Process time:</div>
                      <div>fast</div>
                    </div>
                  </div>
                </div>
              </div>

            </>)
            )
          }
        </RadioGroup>
      )}
    />
  )
}
