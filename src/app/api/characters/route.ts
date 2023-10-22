import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { ZodError, z } from 'zod';
import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'


const validateFilter = z
  .object({
    order: z.enum(['experience', 'maglevel', 'skill_axe', 'skill_club', 'skill_dist', 'skill_fishing', 'skill_fist', 'skill_shielding', 'skill_sword',]).optional(),
    vocation: z.enum(['0', '1', '2', '3', '4', '5', '6', '7', '8',]).optional(),
  })
  .strict()

type Params = {
  filter?: { vocation: number },
  order?: { [key: string]: 'asc' | 'desc' }
};

const filteredPlayer = async (req: Request,) => {
  try {
    const query = req.url.split('?')[1];
    const params = new URLSearchParams(query);

    validateFilter.parse({
      order: params.get('order') ?? undefined,
      vocation: params.get('vocation') ?? undefined,
    })

    const queryParam: Params = {};

    if (params.has('vocation')) {
      queryParam.filter = { vocation: Number(params.get('vocation')) };
    }

    if (params.has('order')) {
      const orderValue = params.get('order') as any;
      queryParam.order = { [orderValue]: 'desc' };
    }

    const characters = await prisma.players.findMany({
      where: {
        AND: [
          { ...queryParam.filter },
          { id: { not: { in: [1, 2, 3, 4, 5] } } },
          { group_id: { not: { in: [6] } } },
        ],
      },
      select: {
        name: true,
        level: true,
        vocation: true,
        maglevel: true,
        skill_axe: true,
        skill_club: true,
        skill_dist: true,
        experience: true,
        skill_fishing: true,
        skill_fist: true,
        skill_shielding: true,
        skill_sword: true,
      },
      orderBy: {
        ...queryParam.order
      }
    });

    return NextResponse.json(convertBigIntsToNumbers(characters));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ issues: error.issues[0] }, { status: 400 })
    }
    return NextResponse.json({}, { status: 500 })
  }

}




export { filteredPlayer as GET };