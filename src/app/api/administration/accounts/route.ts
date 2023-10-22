import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = {
  search?: string | undefined,
}

const find = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
  if (!session?.user || session.user.role !== "admin" || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });


  const query = req.url.split('?')[1];
  const params = new URLSearchParams(query);

  const queryParam: Params = {};

  if (params.has('search')) {
    queryParam.search = params.get('search') ?? undefined;
  }

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1");
  const postsPerPage = parseInt((url.searchParams.get("limit") || "10"));
  const skip = (page - 1) * postsPerPage;

  const accounts = await prisma.accounts.findMany({
    where: {
      AND: [
        // { id: { not: { in: [1, 2, 3, 4, 5] } } },
        queryParam.search
          ? {
            OR: [
              { email: { contains: queryParam.search } },
              { name: { contains: queryParam.search } }
            ]
          }
          : {}
      ]
    },
    skip,
    take: postsPerPage,
  });

  const totalPosts = await prisma.accounts.count()
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return NextResponse.json({
    accounts: convertBigIntsToNumbers(accounts),
    currentPage: page,
    totalPages
  }, { status: 200 })
}

export { find as GET };