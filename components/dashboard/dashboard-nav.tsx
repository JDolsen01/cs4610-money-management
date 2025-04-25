"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, DollarSign, Home, PieChart, Repeat, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Expenses",
    href: "/dashboard/expenses",
    icon: CreditCard,
  },
  {
    title: "Income",
    href: "/dashboard/income",
    icon: DollarSign,
  },
  {
    title: "Recurring",
    href: "/dashboard/recurring",
    icon: Repeat,
  },
  {
    title: "Budgets",
    href: "/dashboard/budgets",
    icon: PieChart,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted font-medium")}
          >
            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-emerald-500" : "")} />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
