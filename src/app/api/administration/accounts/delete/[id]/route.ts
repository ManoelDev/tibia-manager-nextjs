

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Params = { id: string }

const handleAddCoins = async (req: Request, { params }: { params: Params }) => {
  try {
    const id = params.id

    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await prisma.accounts.delete({ where: { id: +id } })

    return NextResponse.json({ message: `Account a been deleted.` }, { status: 200 });
  } catch (err) {

    return NextResponse.json({ err }, { status: 500 });
  }
}



export { handleAddCoins as DELETE };