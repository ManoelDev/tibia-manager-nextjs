import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";

const ITEMS_PER_PAGE = 25


function getVocation(value: string): number[] | undefined {
  const vocationMap: { [key: string]: number[] } = {
    0: [0],
    1: [1, 5],
    2: [2, 6],
    3: [3, 7],
    4: [4, 8],
  };

  return vocationMap[`${value}`];
}

export async function fetchCharacters({ currentPage, vocation, category }: { vocation: string, currentPage: number, category: string }) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const count = await prisma.players.count({
      where: {
        AND: [
          vocation ? { vocation: { in: getVocation(vocation) } } : {},
          { id: { not: { in: [1, 2, 3, 4, 5] } } },
          { group_id: { not: { in: [6] } } },
        ],
      }
    })

    const players = await prisma.players.findMany({
      where: {
        AND: [
          vocation ? { vocation: { in: getVocation(vocation) } } : {},
          { id: { not: { in: [1, 2, 3, 4, 5] } } },
          { group_id: { not: { in: [6] } } },
        ],
      },
      orderBy: { [category]: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    })

    return { players: convertBigIntsToNumbers(players), totalPage: Math.ceil(Number(count) / ITEMS_PER_PAGE) }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders data.');
  }
}