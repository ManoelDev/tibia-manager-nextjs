import { NextRequest, NextResponse } from "next/server"
import configLua from '@/hooks/configLua'
import { StatusServer } from '@/utils/statusServer'
import { prisma } from "@/lib/prisma";

const lua = configLua()

export const revalidate = 0

async function getStatus() {
  try {
    const statusServer = new StatusServer();
    const host = lua['ip']
    const port = +lua['statusProtocolPort'];
    const status = await statusServer.getStatus(host, port);
    return {
      status: !!status,
    };
  } catch (error) {
    console.error('Ocorreu um erro ao verificar o status do servidor:', error);
    return {
      status: false,
    };
  }
}


const handle = async (request: NextRequest) => {
  const status = await getStatus()
  const playersOnline = await prisma.players_online.count()
  return NextResponse.json({ status, playersOnline })
}

export { handle as GET }