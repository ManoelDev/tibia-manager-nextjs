import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";


type Params = { id: string }


const handleDelete = async (req: Request, { params }: { params: Params }) => {

  try {
    const id = params.id

    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) }, select: { _count: { select: { players: true } } } })
    if (!session?.user || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // if (acc._count.players < 9) return NextResponse.json({ message: 'You already have the maximum number of players on your account.' }, { status: 403 });

    const findPlayers = await prisma.players.findUnique({ where: { id: +id } })
    if (!findPlayers) return NextResponse.json({ message: 'Player not found' }, { status: 400 });
    await prisma.players.delete({ where: { id: +id } })

    return NextResponse.json({});
  } catch (error) {
    console.log('Delete player error', error)
    return NextResponse.json({}, { status: 500 });
  }
}



const EditPlayerSchema = z.object({
  comment: z.string(),
  hidden: z.boolean().default(false),
}).strict()

const handleUpdate = async (req: Request, { params }: { params: Params }) => {

  try {
    const id = params.id

    const data = EditPlayerSchema.parse(await req.json())
    const session = await getServerSession(authOptions);
    const acc = await prisma.accounts.findUnique({ where: { id: Number(session?.user?.id) }, select: { _count: { select: { players: true } } } })
    if (!session?.user || !acc) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // if (acc._count.players < 9) return NextResponse.json({ message: 'You already have the maximum number of players on your account.' }, { status: 403 });

    const findPlayers = await prisma.players.findUnique({ where: { id: +id } })
    if (!findPlayers) return NextResponse.json({ message: 'Player not found' }, { status: 400 });
    await prisma.players.update({
      where: { id: +id }, data
    })

    return NextResponse.json({});
  } catch (error) {
    console.log('Delete player error', error)
    return NextResponse.json({}, { status: 500 });
  }
}





export { handleDelete as DELETE, handleUpdate as PATCH };