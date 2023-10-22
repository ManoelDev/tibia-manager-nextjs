import { Metadata } from "next"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

import { redirect } from "next/navigation"



export const metadata: Metadata = {
  title: 'Account Manager',
  description: "Advanced form example using react-hook-form and Zod.",
}

interface SettingsLayoutProps { children: React.ReactNode }

export default async function SettingsLayout({ children }: SettingsLayoutProps) {

  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/account-manager/login')

  return (<> {children} </>)
}