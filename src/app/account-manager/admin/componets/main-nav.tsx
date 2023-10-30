'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation";

const BASE_ADMIN_PATH = '/account-manager/admin'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const pathname = usePathname();


  const partes = pathname.split('/');
  const ultimoPath = partes[partes.length - 1]


  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={BASE_ADMIN_PATH}
        className={`text-sm font-medium transition-colors  hover:text-primary ${ultimoPath !== 'admin' && 'text-muted-foreground'}`}
      >
        Manager
      </Link>
      {/* <Link
        href={`${BASE_ADMIN_PATH}/accounts`}
        className={`text-sm font-medium transition-colors hover:text-primary ${ultimoPath !== 'accounts' && 'text-muted-foreground'}`}
      >
        Accounts
      </Link> */}
      <Link
        href={`${BASE_ADMIN_PATH}/shop`}
        className={`text-sm font-medium transition-colors hover:text-primary ${ultimoPath !== 'shop' && 'text-muted-foreground'}`}
      >
        Shop
      </Link>
      <Link
        href={`${BASE_ADMIN_PATH}/blog`}
        className={`text-sm font-medium transition-colors hover:text-primary ${ultimoPath !== 'blog' && 'text-muted-foreground'}`}
      >
        Blog
      </Link>
      {/* <Link
        href={`${BASE_ADMIN_PATH}/settings`}
        className={`text-sm font-medium transition-colors hover:text-primary ${ultimoPath !== 'settings' && 'text-muted-foreground'}`}
      >
        Settings
      </Link> */}
    </nav>
  )
}
