"use server"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import TableGuild from "./components/tableGuil";
import CreateGuild from "./[name]/components/create-guild";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";


export default async function Guilds() {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Guilds</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2">
          <TableGuild />
        </CardContent>

      </Card>
    </>
  )
}