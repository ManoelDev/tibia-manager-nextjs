"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import EditProduct from "./edit-product";



export default function TableAction({ product }: { product: { id: number, title: string, price: string, currency: string, quantity: number | null, category_id: number, img: string } }) {
  const route = useRouter()

  const deleteItem = async (id: number) => {
    const res = await fetch(`/api/administration/shop/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      route.refresh()
      toast({
        title: "Success!",
        description: (<div>Product as been created</div>),
        variant: 'success'
      })
    }
    if (res.status === 400) {
      toast({
        title: "Error!",
        description: (<div>Product not found</div>),
        variant: 'destructive'
      })
    }
  }

  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <EditProduct product={{
            id: product.id,
            category: product.category_id.toString(),
            img: product.img ?? '',
            price: product.price,
            currency: product.currency,
            quantity: product.quantity?.toString() ?? '',
            title: product.title
          }} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteItem(product.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}