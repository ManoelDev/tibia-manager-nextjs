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
import { FormProvider } from "@/components/hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icon } from '@iconify/react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

const characterFormSchema = z.object({
  name: z.string().nonempty(),
  sex: z.string(),
  wLocation: z.string().optional(),
  wType: z.string().optional(),
  world_id: z.string().optional(),
  tutorial: z.boolean(),
})


export function CharacterOrder() {
  const router = useRouter()
  const { toast } = useToast()

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)


  type CharacterFormValues = z.infer<typeof characterFormSchema>

  const methods = useForm<CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      sex: '0',
      tutorial: true
    }
  })

  const { reset, handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(data: CharacterFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // try {
    //   const response = await fetch("/api/characters", {
    //     method: "POST",
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //     body: JSON.stringify({
    //       name: data.name,
    //       sex: +data.sex,
    //       tutorial: data.tutorial
    //     }),
    //   })


    //   if (response.ok) {
    //     toast({
    //       title: "Account Manager",
    //       description: (
    //         <div>Character has been created.</div>
    //       ),
    //     })
    //     router.refresh()
    //     handle(false)
    //     return
    //   }

    //   toast({
    //     title: "Error",
    //     variant: 'destructive',
    //     description: (
    //       <div>Creation of character as been failed.</div>
    //     ),
    //   })

    // } catch (error) {
    //   reset()
    // }
  }

  function handle(value: boolean) {
    if (!value) reset()
    setShowNewTeamDialog(value)
  }


  return (
    <>
      <Button size={'sm'} onClick={() => setShowNewTeamDialog(true)}>Checkout</Button>

      {showNewTeamDialog && (
        <Dialog open={showNewTeamDialog} onOpenChange={handle}>
          <DialogContent>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                      <TableCell>	BR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>E-Mail Address</TableCell>
                      <TableCell>example@example.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <div className="flex items-center gap-2">
                          <Checkbox id="terms" />
                          <label htmlFor="terms" className="cursor-pointer"> I have read and I agree to the <Link href={"#"} className="text-blue-500 hover:underline">Extended Tibia Service Agreement</Link> and the <Link href={"#"} className="text-blue-500 hover:underline">Tibia Privacy Policy</Link>.</label>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button
                  disabled={isSubmitting}
                  onClick={() => {
                    reset()
                    setShowNewTeamDialog(false)
                  }}
                  variant='outline'
                >Cancel</Button>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (<Icon icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Buy Now'}
                </Button>
              </DialogFooter>
            </FormProvider>
          </DialogContent>
        </Dialog>
      )}


    </>

  )
}