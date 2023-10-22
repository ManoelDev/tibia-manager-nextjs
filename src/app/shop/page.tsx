"use client"
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Icon } from '@iconify/react'
import { useState } from "react";
import { IconiFy } from "@/components/Iconify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { boolean, z } from "zod";
import { FormProvider } from "@/components/hook-form";
import { RHFRadioGroupItemShop, RHFRadioGroupPayments } from "@/components/hook-form/RHFRadioGroup";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import RHFCheckbox from "@/components/hook-form/RHFCheckbox";
import Link from "next/link";

export default function PremiumHistory() {

  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([{ title: 'PayPal', value: 'paypal', img_url: 'string' }]);
  const [products, setProducts] = useState([{ title: 'string', value: 'string', img_url: 'string', currency: 'string' }]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const ShopStepFormSchema = z.object({
    product: z.string(),
    payment: z.string(),
    terms: boolean().default(false)
  })

  type shopStepFormValues = z.infer<typeof ShopStepFormSchema>

  const methods = useForm<shopStepFormValues>({
    resolver: zodResolver(ShopStepFormSchema),
  })

  const { reset, handleSubmit, watch, formState: { isSubmitting, errors } } = methods

  console.log('errors', errors)

  const handleReset = () => {
    setActiveStep(0);
    reset()
  };
  async function onSubmit(data: shopStepFormValues) {
    console.log('data', data)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      //   body: JSON.stringify(data),
      // })
      // if (response.ok) {
      //   toast({
      //     title: "Account Manager",
      //     description: (<div>You password has been reset.</div>),
      //   })
      //   return
      // }
      // toast({
      //   title: "Account Manager",
      //   variant: 'destructive',
      //   description: (<div>Failed to reset you password.</div>),
      // })
    } catch (error) {
      // reset()
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Buy Coins</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} id='form'>

            <div className="border rounded-sm">

              <div className="`transition-all duration-300 ease-in-out transform">
                <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b '>
                  <div className="flex gap-2 items-center">
                    <IconiFy icon={'healthicons:money-bag-outline'} />
                    Select Product</div>
                  {activeStep > 0 && <IconiFy icon={'ph:check-circle'} className="text-green-600" />}
                </div>
                {activeStep === 0 && (
                  <>
                    <div className="p-1">
                      <div className="bg-gray-100 border rounded-sm p-2 flex gap-2 ">
                        <Button>Coins</Button>
                        <Button>Coins</Button>
                      </div>
                    </div>

                    <RHFRadioGroupItemShop
                      name="product"
                      options={products}
                    />

                    <div className="p-2 m-2 border rounded-sm text-center">
                      <Typography variant={'body2'} component={'p'}>
                        * Please note that the prices may vary depending on the current exchanger rate.
                      </Typography>
                      <Typography variant={'body2'} component={'p'}>
                        Different prices may apply depending on you selected payment method.
                      </Typography>
                    </div>
                  </>
                )}
              </div>

              <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b border-t'>
                <div className="flex gap-2 items-center">
                  <IconiFy icon={'fluent:payment-28-regular'} />
                  Select payment provider
                </div>
                {activeStep > 1 && <IconiFy icon={'ph:check-circle'} className="text-green-600" />}
              </div>

              {activeStep === 1 && (
                <>
                  <RHFRadioGroupPayments
                    name='payment'
                    options={payments}
                  />
                </>
              )}

              <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b border-t'>
                <div className="flex gap-2 items-center">
                  Checkout
                </div>
              </div>
              {activeStep == 2 && (
                <>
                  <div>
                    <Table>
                      <TableBody >
                        <TableRow>
                          <TableCell className="w-[130px]">Product</TableCell>
                          <TableCell><strong>250 Coins</strong></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Price</TableCell>
                          <TableCell><strong>3.10 EUR ≈ 16.43 BRL</strong></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Payment Method</TableCell>
                          <TableCell><strong className="">{payments?.filter((p) => p.value === watch('payment'))[0].title}</strong></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Country</TableCell>
                          <TableCell><strong>BR</strong></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>E-Mail Address</TableCell>
                          <TableCell><strong>example@example.com</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <div className="flex justify-end gap-2">
                <Button
                  disabled={activeStep === 0}
                  onClick={activeStep === 2 ? handleReset : handleBack}
                  variant={"outline"}
                >
                  {activeStep === 2 ? 'Reset' : 'Cancel'}
                </Button>
                {activeStep == 2
                  ? <Dialog>
                    <DialogTrigger asChild>
                      <Button>Checkout</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm your order</DialogTitle>
                      </DialogHeader>
                      <div className="border rounded-sm">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="w-[130px]">Service</TableCell>
                              <TableCell>250 Coins</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Price</TableCell>
                              <TableCell>3.10 EUR ≈ 16.43 BRL</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Payment Method</TableCell>
                              <TableCell>MercadoPago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Country</TableCell>
                              <TableCell>BR</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>E-Mail Address</TableCell>
                              <TableCell>example@example.com</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2}>
                                <div className="flex items-center gap-2">
                                  <RHFCheckbox name="terms" />
                                  <label htmlFor="terms" className="cursor-pointer"> I have read and I agree to the <Link href={"#"} className="text-blue-500 hover:underline">Extended Tibia Service Agreement</Link> and the <Link href={"#"} className="text-blue-500 hover:underline">Tibia Privacy Policy</Link>.</label>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <DialogFooter>
                        <Button disabled={isSubmitting} onClick={handleReset} variant={"outline"}>Cancel</Button>
                        <Button disabled={isSubmitting || !watch('terms')} type="submit" form="form">
                          <span className={`${isSubmitting && 'visible'}`}>
                            {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Buy Now'}
                          </span>

                        </Button>
                      </DialogFooter>

                    </DialogContent>
                  </Dialog>
                  : activeStep === 0 ? <Button variant="green" disabled={!watch('product')} onClick={handleNext}>Continue</Button> : <Button variant="green" disabled={!watch('payment')} onClick={handleNext}>Continue</Button>
                }
              </div>

            </div>
          </FormProvider>

        </CardContent>
      </Card>
    </>
  )
}