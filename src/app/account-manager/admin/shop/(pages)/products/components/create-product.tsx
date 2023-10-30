"use client"
import { useRouter } from "next/navigation";
import { IconiFy } from "@/components/Iconify";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import { RHFUploadShopImage } from "@/components/hook-form/RHFUpload";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomFile } from "@/components/upload/types";

const FormSchema = z.object({
  img: z.custom<File>((file) => file instanceof File, 'Required'),
  // img: z.string(),
  title: z.string(),
  price: z.string(),
  category: z.string(),
  currency: z.string(),
  quantity: z.string()
})

type CharacterFormValues = z.infer<typeof FormSchema> & {
  img: CustomFile | string
}

export default function CreateProduct() {
  const route = useRouter()

  const [showModal, setShowModal] = useState(false)

  const methods = useForm<CharacterFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currency: 'USD'
    }
  })

  const { handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = methods
  const values = watch()

  function handle() {
    if (!showModal) reset()
    setShowModal(!showModal)
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, { preview: URL.createObjectURL(file), });
      if (file) { setValue('img', newFile, { shouldValidate: true }) }
    },
    [setValue]
  );

  async function onSubmit(formData: CharacterFormValues) {

    try {
      const data = new FormData()
      data.set('img', values.img)
      data.set('title', formData.title)
      data.set('price', formData.price)
      data.set('category', formData.category)
      data.set('quantity', formData.quantity)
      data.set('currency', formData.currency)

      const res = await fetch('/api/administration/shop/products', { method: 'POST', body: data })
      if (res.ok) {
        route.refresh()
        toast({
          title: "Success!",
          description: (<div>Product as been created</div>),
          variant: 'success'
        })
      }
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
    handle()

  }

  return (<>
    <Dialog open={showModal} onOpenChange={handle} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button onClick={handle}>Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crate Product</DialogTitle>
        </DialogHeader>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFUploadShopImage
            name="img"
            accept={{ 'image': ['.png', '.gif'] }}
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <RHFTextField name="title" label="Title" autoFocus />
          <div className="grid sm:grid-cols-3 gap-2">
            <RHFTextField name="price" label="Price" />
            <RHFSelect
              name="currency"
              label="Currency"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'JPY', label: 'JPY' },
                { value: 'BRL', label: 'BRL' },
                { value: 'GBP', label: 'GBP' }
              ]}
              LabelOption={'label'}
              keyValue={'value'}
              defaultValue='USD'
            />
            <RHFTextField name="quantity" label="Amount" />
          </div>

          <RHFSelect LabelOption={'label'} keyValue={'value'} name="category" options={[{ value: '1', label: 'Coins' }, { value: '2', label: 'Premium Time' }]} label="Category" />

          <DialogFooter>
            <Button onClick={() => {
              reset()
              handle()
            }} variant='outline'>Cancel</Button>
            <Button disabled={!values.img || !values.price || !values.title || isSubmitting} type="submit">
              {isSubmitting ? (<IconiFy icon="eos-icons:loading" className="h-4 w-4 animate-spin" />) : 'Submit'}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  </>)
}