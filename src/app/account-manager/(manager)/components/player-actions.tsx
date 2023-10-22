import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const deletePlayerAction = async (id: number) => {
  try {
    await prisma.players.delete({ where: { id } })
    return true
  } catch (error) {
    console.log('Delete player error', error)
    return false

  }
}

const PlayerDataSchema = z.object({
  comment: z.string().optional(),
  hidden: z.boolean().optional()
}).strict()

export const editPlayerAction = async (id: number, data: z.infer<typeof PlayerDataSchema>) => {
  try {
    return await prisma.players.update({ where: { id }, data })
  } catch (error) {
    return { message: 'Error to update player.' }
  }
}