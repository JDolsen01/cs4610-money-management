"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  PiggyBank,
  Repeat,
  Settings,
  User,
  Wallet,
  Banknote,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOutAction } from "@/app/actions";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Income",
      href: "/dashboard/income",
      icon: Banknote,
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: CreditCard,
    },
    {
      title: "Recurring",
      href: "/dashboard/recurring",
      icon: Repeat,
    },
    {
      title: "Budgets",
      href: "/dashboard/budgets",
      icon: Wallet,
    },
    {
      title: "Savings",
      href: "/dashboard/savings",
      icon: PiggyBank,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <PiggyBank className="h-6 w-6 text-emerald-600" />
              <span className="font-bold">MoneyMinder</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <form action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                  Sign out
                </Button>
              </form>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
