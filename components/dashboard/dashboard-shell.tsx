import type React from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { signOutAction } from "@/app/actions";
import { Button } from "../ui/button";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileNav />
            <span className="hidden font-bold md:inline-block">MoneyTrack</span>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant={"outline"}>
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
