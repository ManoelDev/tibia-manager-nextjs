import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'

enum types {
  blog = "BLOG",
  ticker = "TICKER",
  roadmap = "ROADMAP"
}
type Params = { type: types }

const listNews = async (request: Request, { params }: { params: Params }) => {

  try {
    const url = new URL(request.url)

    const page = parseInt(url.searchParams.get("page") || "1");
    const postsPerPage = parseInt((url.searchParams.get("limit") || "2"));
    const skip = (page - 1) * postsPerPage;

    const posts = await prisma.posts.findMany({
      where: { category: params.type.toUpperCase() as types, published: true },
      select: {
        title: true,
        content: true,
        slug: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: postsPerPage,
    });

    const totalPosts = await prisma.posts.count({
      where: { category: params.type.toUpperCase() as types },
    })

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return NextResponse.json({
      posts: convertBigIntsToNumbers(posts),
      currentPage: page,
      totalPages
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { listNews as GET };


