"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  PieChart,
  Repeat,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
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
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center gap-2 px-7">
          <DollarSign className="h-6 w-6 text-emerald-500" />
          <span className="font-bold">MoneyTrack</span>
        </div>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.href ? "bg-muted" : "hover:bg-muted"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    pathname === item.href ? "text-emerald-500" : ""
                  )}
                />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
