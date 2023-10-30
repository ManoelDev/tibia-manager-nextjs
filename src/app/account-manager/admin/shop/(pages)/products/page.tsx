import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import CreateProduct from "./components/create-product";
import TableAction from "./components/table-actions";
async function getProducts() {

  const products = await prisma.products.findMany({
    include: {
      Categories: {
        select: { name: true }
      }
    }
  })
  return { products }
}

export default async function AdminProducts() {
  const { products } = await getProducts()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <CreateProduct />
        </div>
      </div>

      <div className='border rounded-sm'>
        <div className='flex p-2 items-center justify-end bg-gray-100 text-sm border-b'>
          <div className="flex flex-row gap-2 items-center">
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 7l-5 5m0 0l5 5" />
              </svg>
            </Button>
            <span>0 of 0</span>
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" />
              </svg>
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="pointer-events-none">
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className=""></TableHead>
              <TableHead className="w-[100px] text-center"></TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="w-[100px]">
                  <Image
                    src={`/shop/${product.img_url}` ?? ''}
                    alt="Picture of the product"
                    width={150}
                    height={150}
                    style={{
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                </TableCell>
                <TableCell className="">{product.title}</TableCell>
                <TableCell className="w-[140px] text-center"><Badge variant={"outline"} className="w-full justify-center">{product.Categories?.name}</Badge></TableCell>
                <TableCell className="w-[20px]">
                  <TableAction product={{
                    id: product.id,
                    category_id: product.category_id,
                    price: product.price,
                    quantity: product.quantity,
                    title: product.title,
                    img: `/shop/${product.img_url}`
                  }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
