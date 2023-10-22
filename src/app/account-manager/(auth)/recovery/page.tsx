
import { Metadata } from "next"

import { UserRecoveryForm } from "./components/user-recovery-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Recover Password",
  description: "Login forms built using the components.",
}

export default function Recovery() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Recover by Email or Character Name</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <div>
          Texto aqui
        </div>
        <div><UserRecoveryForm /></div>
      </CardContent>
    </Card>
  )
}