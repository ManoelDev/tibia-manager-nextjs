import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { omit } from 'lodash';
import { convertBigIntsToNumbers } from "@/utils/functions/convertBigIntsToNumbers";
import { generateSlug } from "@/utils/functions/generateSlug";

const validationPOST = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['BLOG', 'TICKER', 'ROADMAP']).default('BLOG')
})

const create = async (req: Request) => {
  try {
    const body = validationPOST.parse(await req.json())
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (session.user.role !== "admin" || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await prisma.posts.create({
      data: {
        ...omit(body, 'id'),
        slug: generateSlug(body.title),
        account_id: acc.id
      }
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

}

const update = async (req: Request) => {
  try {
    const body = validationPOST.parse(await req.json())
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (session.user.role !== "admin" || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });


    const data = {
      ...body,
      slug: generateSlug(body.title)
    }

    await prisma.posts.update({
      where: { id: body.id },
      data
    })

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

}


const list = async (req: Request) => {
  try {

    const session = await getServerSession(authOptions);

    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (session.user.role !== "admin" || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get("page") || "1");
    const postsPerPage = parseInt((url.searchParams.get("limit") || "10"));
    const skip = (page - 1) * postsPerPage;

    const posts = await prisma.posts.findMany({
      skip,
      take: postsPerPage,
      orderBy: { createdAt: 'desc' },
    });

    const totalPosts = await prisma.posts.count()
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return NextResponse.json({
      posts: convertBigIntsToNumbers(posts),
      currentPage: page,
      totalPages
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}


const remove = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (session.user.role !== "admin" || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const url = new URL(req.url)

    if (url.searchParams.get("id")) {
      const id = parseInt(url.searchParams.get("id") || "0");
      await prisma.posts.delete({ where: { id } })
    } else {
      throw new Error('Post not found.')
    }


    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

}


export { create as POST, update as PUT, list as GET, remove as DELETE };