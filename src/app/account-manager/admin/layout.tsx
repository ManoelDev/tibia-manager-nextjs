import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

import { Metadata } from "next"
import { MainNav } from "./componets/main-nav"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
export const metadata: Metadata = {
  title: "Admin Panel",
}

interface AdminLayoutProps { children: React.ReactNode }

export default async function SettingsLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions)
  const rule = session?.user.role
  if (!session?.user) redirect('/account-manager/login')
  if (rule !== 'admin') redirect('/account-manager/login')

  return (<>

    <Card>
      <CardHeader className="border-b">
        <MainNav />
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {children}
        </div>
      </CardContent>
    </Card>

  </>)
}