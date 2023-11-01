import Link from "next/link"

import { cn } from "@/lib/utils"

export function ShopAdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/account-manager/admin/shop"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/account-manager/admin/shop/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/account-manager/admin/shop/orders"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Orders
      </Link>
      {/* <Link
        href="/account-manager/admin/shop/categories"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Categories
      </Link> */}
      <Link
        href="/account-manager/admin/shop/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}