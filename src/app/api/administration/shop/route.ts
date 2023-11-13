import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = {
  search?: string | undefined,
  page?: string | undefined,
  limit?: string | undefined,
}

const List = async (req: Request) => {
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

  const products = await prisma.products.findMany({
    where: {
      AND: [
        queryParam.search
          ? {
            OR: [
              { Categories: { name: { contains: queryParam.search } } }
            ]
          }
          : {}
      ]
    },
    // include: {
    //   Categories: {
    //     where: {
    //       AND: [
    //         queryParam.search
    //           ? {
    //             OR: [
    //               { name: { contains: queryParam.search } }
    //             ]
    //           }
    //           : undefined
    //       ]
    //     }
    //   }
    // },
    skip,
    take: postsPerPage,
  });

  const totalPosts = await prisma.products.count()
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return NextResponse.json({
    products: convertBigIntsToNumbers(products),
    currentPage: page,
    totalPages
  }, { status: 200 })
}



export { List as GET };