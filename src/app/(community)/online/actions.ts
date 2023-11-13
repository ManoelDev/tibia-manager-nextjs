import { prisma } from "@/lib/prisma";
import { players } from "@prisma/client";

const ITEMS_PER_PAGE = 25


export async function fetchOnline({ currentPage }: { currentPage: number }) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const TotalOnline = await prisma.players_online.findMany();
    const ids = TotalOnline.map((i) => i.player_id)

    const count = await prisma.players.count({
      where: { AND: [{ id: { in: ids } },], }
    })

    const players: players[] = await prisma.players.findMany({
      where: {
        AND: [{ id: { in: ids } },],
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: { name: 'asc' }
    })

    return { players, totalPage: Math.ceil(Number(count) / ITEMS_PER_PAGE) }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders data.');
  }
}