import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, DollarSign, PiggyBank, Repeat } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <span className="font-bold">MoneyMinder</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Take control of your finances with MoneyMinder
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The smart way to track your expenses, manage recurring payments, and achieve your financial goals.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Login to Your Account</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 p-6 dark:from-emerald-900/20 dark:to-emerald-800/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PiggyBank className="h-32 w-32 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your money effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                  <CreditCard className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Easily log and categorize your daily expenses to understand your spending habits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                  <Repeat className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Recurring Payments</h3>
                <p className="text-center text-muted-foreground">
                  Never miss a bill again with our recurring payment tracking and reminders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Financial Insights</h3>
                <p className="text-center text-muted-foreground">
                  Get visual reports and insights to help you make better financial decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-muted-foreground">© 2025 MoneyMinder. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
