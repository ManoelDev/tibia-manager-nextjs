import { writeFile } from 'fs/promises'
import { randomUUID } from 'crypto';

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const Create = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) } })
    if (!acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await req.formData()
    const file: File | null = data.get('img') as unknown as File
    if (!file || !data.get('title') || !data.get('price') || !data.get('quantity') || !data.get('category')) {
      throw new Error('No file uploaded')
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${randomUUID()}-${file.name}`

    await writeFile(`./public/shop/${fileName}`, buffer)

    await prisma.products.create({
      data: {
        title: data.get('title') as string,
        price: data.get('price') as string,
        quantity: Number(data.get('quantity')),
        category_id: Number(data.get('category')),
        content: data.get('title') as string,
        img_url: fileName,
        currency: data.get('currency') as string
      }
    })
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export { Create as POST }
