import Pagination from "@/components/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Search from "./components/search";
import ListGuilds from "./components/listGuilds";
import { prisma } from "@/lib/prisma";
import CreateGuild from "./components/createGuild";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 0

const ITEMS_PER_PAGE = 10

async function fetchGuilds({ page, search }: { search: string, page: number }) {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  try {
    const count = await prisma.guilds.count({ where: { name: { contains: search ? search : undefined } } })

    const guilds = await prisma.guilds.findMany({
      where: { name: { contains: search ? search : undefined } },
      include: {
        players: { select: { id: true, name: true } },
        guild_membership: { select: { players: { select: { id: true } } } }
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: { name: 'asc' }
    })

    return { guilds, totalPage: Math.ceil(Number(count) / ITEMS_PER_PAGE) }
  } catch (error) {
    console.error('Database Error:', error);
    return { guilds: [], totalPage: 0 }
  }
}

export default async function Guilds({ searchParams }: { searchParams?: { search?: string; page?: string; } }) {
  const session = await getServerSession(authOptions)
  const search = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
  const { guilds, totalPage, } = await fetchGuilds({ page, search });


  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Guilds</CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">

        <Suspense key={session?.user.id}>
          <div className="flex justify-between items-center text-sm">
            Can&apos;t find the guild you&apos;re looking for?
            {session?.user.id
              ? (<CreateGuild />)
              : (<Link href={'/account-manager/login'} className="text-blue-500 py-2">Log in to create</Link>)
            }
          </div>
        </Suspense>

        <div className="border rounded">
          <div>
            <div className="flex flex-row gap-2 p-2">
              <Search placeholder="Search..." />
              <Pagination totalPages={totalPage} />
            </div>
            <ListGuilds guilds={guilds ?? []} />
          </div>
        </div>

      </CardContent>

    </Card>
  )
}