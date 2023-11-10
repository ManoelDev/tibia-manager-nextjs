"use client"
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const FormSchema = z.object({
  guild_id: z.number(),
  rank: z.string(),
})
type ItemFormValues = z.infer<typeof FormSchema>

export default function CreateNewRank({ guild_id }: { guild_id: number }) {
  const router = useRouter()

  const defaultValues: Partial<ItemFormValues> = {
    guild_id,
  }

  const methods = useForm<ItemFormValues>({ resolver: zodResolver(FormSchema), defaultValues })

  const { handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(formData: ItemFormValues) {
    try {
      const res = await fetch(`/api/guilds/manager/${guild_id}/ranks`, { method: 'POST', body: JSON.stringify(formData) })
      if (res.ok) {
        toast({
          title: "Success!",
          description: (<div>Guild as been updated.</div>),
          variant: 'success'
        })
      }
      // document.getElementById('closeDialog')?.click();
      router.refresh()
    } catch (e: any) {
      console.error(e)
    }
  }

  return (<>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-end ">
      <RHFTextField name="rank" label="Create new Rank" />
      <Button disabled={isSubmitting} size={'default'}>Create</Button>
    </FormProvider>
  </>)
}