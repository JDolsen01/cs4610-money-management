import type React from "react";
import { signOutAction } from "@/app/actions";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "../theme-switcher";
import { DollarSign } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">MoneyTrack</span>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant={"outline"}>
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <main className="container flex w-full flex-1 flex-col overflow-hidden py-6">
        {children}
      </main>
      <footer className="container">
        <div className="mt-4 mb-4 pb-4 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MoneyTrack. All rights reserved.
          </p>
          <ThemeSwitcher />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Made with ❤️ for better financial management
          </p>
        </div>
      </footer>
    </div>
  );
}
