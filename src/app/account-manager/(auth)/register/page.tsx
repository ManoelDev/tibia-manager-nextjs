
import { Metadata } from "next"

import { UseRegisterForm } from "./components/user-register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export const metadata: Metadata = {
  title: "Create Account",
  description: "Login forms built using the components.",
}

export default function Register() {
  return (
    <>
      <Card className="rounded-md relative">
        <CardHeader className="border-b">
          <CardTitle>Create New Account</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <UseRegisterForm />
        </CardContent>
      </Card>
    </>
  )
}