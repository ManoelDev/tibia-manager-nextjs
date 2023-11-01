import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10

export async function fetchPayments({ currentPage, search, statusFilter }: { search: string, currentPage: number, statusFilter: any }) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const count = await prisma.orders.count({
      where: {
        AND: [
          { paymentID: { contains: search ? search : undefined } },
          { status: statusFilter ? { equals: statusFilter } : undefined }
        ]
      }
    })

    const orders = await prisma.orders.findMany({
      where: {
        AND: [
          { paymentID: { contains: search ? search : undefined } },
          { status: statusFilter ? { equals: statusFilter } : undefined }
        ]
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    })

    return { orders, totalPage: Math.ceil(Number(count) / ITEMS_PER_PAGE) }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders data.');
  }
}
