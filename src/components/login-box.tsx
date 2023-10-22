"use strict"
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout";
import { authOptions } from "@/lib/auth";

export default async function LoginBox() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <>
        <div className='bg-background/10 shadow rounded-md p-1 backdrop-blur-[6px]'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col flex-grow space-y-1'>
              <Button asChild variant={'blue'}>
                <Link href={'/account-manager/login'}>Login</Link>
              </Button>
              <Button asChild size={'sm'}>
                <Link href={'/account-manager/register'}>Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='bg-background/10 shadow rounded-md p-1 backdrop-blur-[6px]'>
        <div className='flex flex-row gap-2'>
          <div className='flex flex-col flex-grow space-y-1'>
            {session?.user?.role === 'admin' && (
              <Button variant={'destructive'} asChild>
                <Link href={'/account-manager/admin'}>Admin Panel</Link>
              </Button>
            )}

            <Button asChild variant={'blue'}>
              <Link href={'/account-manager/'}>My Account</Link>
            </Button>
            <LogoutButton />

          </div>
        </div>
      </div>
    </>
  )
}