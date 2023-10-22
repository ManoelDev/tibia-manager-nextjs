import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {

  const session = await getServerSession(authOptions)
  if (session) redirect('/account-manager')

  return (
    <>{children}</>
  )
}