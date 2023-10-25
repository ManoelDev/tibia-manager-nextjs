"use client"
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { IconiFy } from "@/components/Iconify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, z } from "zod";
import { FormProvider, RHFSelect } from "@/components/hook-form";
import { RHFRadioGroupItemShop, RHFRadioGroupPayments } from "@/components/hook-form/RHFRadioGroup";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import RHFCheckbox from "@/components/hook-form/RHFCheckbox";
import Link from "next/link";

import { useSession } from "next-auth/react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PRODUCTS = [
  // [
  //   { title: '100 Tibia Coins', quantity: 250, id: 1, price: '10.08', img_url: '/shop/serviceid_133.png', currency: 'USD' },
  //   { title: '750 Tibia Coins', quantity: 750, id: 2, price: '28.04', img_url: '/shop/serviceid_134.png', currency: 'USD' },
  //   { title: '1500 Tibia Coins', quantity: 1500, id: 3, price: '56.08', img_url: '/shop/serviceid_135.png', currency: 'USD' },
  //   { title: '3000 Tibia Coins', quantity: 3000, id: 4, price: '112.16', img_url: '/shop/serviceid_136.png', currency: 'USD' },
  //   { title: '4500 Tibia Coins', quantity: 4500, id: 5, price: '168.24', img_url: '/shop/serviceid_137.png', currency: 'USD' },
  //   { title: '15000 Tibia Coins', quantity: 15000, id: 6, price: '560.81', img_url: '/shop/serviceid_138.png', currency: 'USD' },
  // ],
  [
    { title: '100 Tibia Coins', quantity: 100, id: 1, price: '2.00', img_url: '/shop/serviceid_193_transferable.png', currency: 'USD' },
    { title: '300 Tibia Coins', quantity: 300, id: 2, price: '5.00', img_url: '/shop/serviceid_194_transferable.png', currency: 'USD' },
    { title: '600 Tibia Coins', quantity: 600, id: 3, price: '10.00', img_url: '/shop/serviceid_195_transferable.png', currency: 'USD' },
    { title: '1500 Tibia Coins', quantity: 1500, id: 4, price: '20.00', img_url: '/shop/serviceid_196_transferable.png', currency: 'USD' },
    { title: '3000 Tibia Coins', quantity: 3000, id: 5, price: '38.00', img_url: '/shop/serviceid_197_transferable.png', currency: 'USD' },
    { title: '15000 Tibia Coins', quantity: 6400, id: 6, price: '78.00', img_url: '/shop/serviceid_198_transferable.png', currency: 'USD' },
    { title: '15000 Tibia Coins', quantity: 13200, id: 7, price: '158.00', img_url: '/shop/serviceid_198_transferable.png', currency: 'USD' },
    { title: '15000 Tibia Coins', quantity: 30000, id: 8, price: '316.00', img_url: '/shop/serviceid_198_transferable.png', currency: 'USD' },
  ],
  [
    { title: '10 Premium Days', quantity: 10, id: 1, price: '3.32', img_url: '/shop/serviceid_120.png', currency: 'USD' },
    { title: '30 Premium Days', quantity: 30, id: 2, price: '9.54', img_url: '/shop/serviceid_120.png', currency: 'USD' },
    { title: '90 Premium Days', quantity: 90, id: 3, price: '25.68', img_url: '/shop/serviceid_120.png', currency: 'USD' },
    { title: '180 Premium Days', quantity: 180, id: 4, price: '45.63', img_url: '/shop/serviceid_120.png', currency: 'USD' },
    { title: '360 Premium Days', quantity: 360, id: 5, price: '79.89', img_url: '/shop/serviceid_120.png', currency: 'USD' },
  ]
]




export default function PremiumHistory() {

  const route = useRouter()


  const { data: session, status } = useSession()

  const [payments, setPayments] = useState([{ title: 'PayPal', value: 'paypal', img_url: 'string' }]);
  const [products, setProducts] = useState<any[]>(PRODUCTS[0]);


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
    category: z.enum(['coins', 'premdays']),
    terms: boolean().default(false)
  })

  type shopStepFormValues = z.infer<typeof ShopStepFormSchema>

  const methods = useForm<shopStepFormValues>({
    resolver: zodResolver(ShopStepFormSchema),
    defaultValues: {
      category: 'coins'
    }
  })

  const { reset, handleSubmit, watch, setValue, formState: { isSubmitting } } = methods

  const handleReset = () => {
    setActiveStep(0);
    reset()
  };
  async function onSubmit(data: shopStepFormValues) {
    console.log('data', data)
  }

  const selectedProduct = products?.filter((p) => p.id.toString() === watch('product'))[0]

  return (
    <>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: 'BRL' }}>

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
                      <div className="p-2 pb-0">

                        <RHFSelect
                          name="Category"
                          defaultValue={watch('category')}
                          options={[
                            // { label: 'Transferable Coins', value: 'transferable_coins' },
                            { label: 'Transferable coins', value: 'coins', },
                            { label: 'Premium time', value: 'premdays' }
                          ]}
                          onValueChange={(v) => {
                            reset()
                            setValue('category', v as "coins" | "premdays")
                            if (v === 'coins') {
                              setProducts(PRODUCTS[0])
                            } else if (v === 'premdays') {
                              setProducts(PRODUCTS[1])
                            }
                          }}
                        />
                      </div>

                      <RHFRadioGroupItemShop
                        name="product"
                        options={products}
                        defaultValue={watch('product')}
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
                            <TableCell><strong>{selectedProduct?.title}</strong></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell><strong>{selectedProduct.price} {selectedProduct.currency}</strong></TableCell>
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
                            <TableCell><strong>{session?.user.email}</strong></TableCell>
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
                                <TableCell>{selectedProduct?.title}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Price</TableCell>
                                <TableCell>{selectedProduct.price} {selectedProduct.currency}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>{payments?.filter((p) => p.value === watch('payment'))[0].title}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Country</TableCell>
                                <TableCell>BR</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>E-Mail Address</TableCell>
                                <TableCell>{session?.user.email}</TableCell>
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
                          <PayPalButtons
                            style={{ layout: "horizontal", color: 'black', height: 32 }}
                            disabled={isSubmitting || !watch('terms')}
                            createOrder={async () => {
                              const res = await fetch('/api/shop/paypal/orders', {
                                method: 'POST',
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  productId: +watch('product'),
                                  currency_code: selectedProduct.currency,
                                  value: selectedProduct.price,
                                  description: selectedProduct?.title
                                })
                              })
                              const order = await res.json()
                              return order.id
                            }}
                            onApprove={async (data, actions) => {
                              console.log('actions.order?.capture()', actions.order?.capture())
                              await fetch(`/api/shop/paypal/orders/${data.orderID}/capture`, {
                                method: "post",
                                body: JSON.stringify({
                                  type: watch('category'),
                                  quantity: selectedProduct.quantity,
                                  payerID: data.payerID,
                                  paymentID: data.paymentID
                                })
                              })
                              toast({
                                variant: 'success',
                                title: "Account Manager",
                                description: (
                                  <div>Add {selectedProduct.quantity} {watch('category') === 'premdays' ? 'premium days' : 'coins'}</div>
                                ),
                              })
                            }}
                            onCancel={async (data, actions) => {
                              console.log('data', data)
                              await fetch(`/api/shop/paypal/orders/${data.orderID}/cancel`, {
                                method: "post",
                              })
                              toast({
                                variant: 'destructive',
                                title: "Account Manager",
                                description: (
                                  <div>Cancelling payment order.</div>
                                ),
                              })
                            }}
                          />
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
      </PayPalScriptProvider>
    </>
  )
}
