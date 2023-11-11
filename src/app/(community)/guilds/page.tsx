"use server"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import TableGuild from "./components/tableGuil";



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