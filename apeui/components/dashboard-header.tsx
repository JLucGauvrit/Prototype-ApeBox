"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Tableau de bord" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/chat", label: "Chat" }, // Added chat navigation item
    { href: "/settings", label: "Paramètres" },
    { href: "/users", label: "Utilisateurs" },
  ]

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-2xl">🦍</div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">ApeBox</h1>
                <p className="text-xs text-muted-foreground">Appliance IA locale</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-2 w-2 animate-pulse rounded-full bg-success"></div>
            <span className="text-sm font-medium text-success">En ligne</span>
          </div>
        </div>
      </div>
    </header>
  )
}
