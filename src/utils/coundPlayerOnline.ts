import { prisma } from "@/lib/prisma"

const playerOnline = async () => {
  const onlineCount = await prisma.players_online.count()
  return onlineCount
}

export { playerOnline }