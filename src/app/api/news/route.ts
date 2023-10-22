import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";

import { NextResponse } from "next/server";

const find = async (req: Request) => {
  const news = await prisma.posts.findMany();
  return NextResponse.json(convertBigIntsToNumbers(news), { status: 200 })
}

export { find as GET };