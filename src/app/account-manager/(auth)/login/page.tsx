
import { Metadata } from "next"

import { UserAuthForm } from "./components/user-auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/Typography";

export const metadata: Metadata = {
  title: "Login",
  description: "Login forms built using the components.",
}

export default function Login() {
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Important Information!</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2" >
          <Typography variant={'body2'} component={'p'}>
            We have changed the login process! Account names have been abolished. To log in, you only need your password and the account&apos;s email address.
          </Typography>
          <Typography variant={'body2'} component={'p'}>
            You have forgotten your email address but you still know the account name which had been used for your Tibia account?
          </Typography>
          <Typography variant={'body2'} component={'p'}>
            Get your email address here: link
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Account Login</CardTitle>
        </CardHeader>
        <CardContent className="p-2" >
          <UserAuthForm />
        </CardContent>
      </Card>
    </div>
  )
}