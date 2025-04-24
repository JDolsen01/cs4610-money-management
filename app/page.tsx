import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  DollarSign,
  LineChart,
  PieChart,
  Repeat,
  Smartphone,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">MoneyTrack</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-emerald-500 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-emerald-500 transition-colors"
            >
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Sign In
            </Link>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Take control of your{" "}
                <span className="text-emerald-500">finances</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Track expenses, manage recurring payments, and gain insights
                into your spending habits with our intuitive money management
                app.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Completely Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Link href="/sign-up">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="MoneyTrack App Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-slate-50 dark:bg-slate-900">
          <div className="container py-12 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your money effectively
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <BarChart3 className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Expense Tracking</h3>
                <p className="text-muted-foreground">
                  Easily log and categorize your expenses to see where your
                  money is going.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <Repeat className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Recurring Payments</h3>
                <p className="text-muted-foreground">
                  Set up and track recurring bills and subscriptions. Mark them
                  as paid with one click.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <PieChart className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spending Analysis</h3>
                <p className="text-muted-foreground">
                  Visualize your spending patterns with intuitive charts and
                  graphs.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <Bell className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Payment Reminders</h3>
                <p className="text-muted-foreground">
                  Never miss a payment with customizable alerts and
                  notifications.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <LineChart className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Budget Planning</h3>
                <p className="text-muted-foreground">
                  Create and manage budgets to help you reach your financial
                  goals.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <Smartphone className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Mobile Access</h3>
                <p className="text-muted-foreground">
                  Access your financial data anytime, anywhere with our
                  mobile-friendly app.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container py-12 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Managing your finances has never been easier
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Track Your Expenses
                  </h3>
                  <p className="text-muted-foreground">
                    Log your daily expenses and categorize them to understand
                    your spending habits.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Set Up Recurring Payments
                  </h3>
                  <p className="text-muted-foreground">
                    Add your monthly bills and subscriptions to keep track of
                    your recurring expenses.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Mark Payments as Paid
                  </h3>
                  <p className="text-muted-foreground">
                    When you pay a bill, mark it as paid with one click and it
                    will be added to your expenses.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Analyze Your Finances
                  </h3>
                  <p className="text-muted-foreground">
                    View detailed reports and insights to make better financial
                    decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl border">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="MoneyTrack App Features"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section
          id="recurring-payments"
          className="bg-slate-50 dark:bg-slate-900"
        >
          <div className="container py-12 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Recurring Payments Feature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Never Miss a Payment Again
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our recurring payments feature helps you stay on top of your
                  bills and subscriptions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-0.5" />
                    <span>
                      Set up monthly, quarterly, or annual recurring payments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-0.5" />
                    <span>Get reminders before payments are due</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-0.5" />
                    <span>Mark payments as paid with one click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-0.5" />
                    <span>
                      Automatically add paid bills to your expense tracker
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-0.5" />
                    <span>
                      View payment history and upcoming payments at a glance
                    </span>
                  </li>
                </ul>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Try It Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50 dark:bg-slate-900">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold">MoneyTrack</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Take control of your finances with our intuitive money
                management app.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MoneyTrack. All rights reserved.
            </p>
            <ThemeSwitcher />
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Made with ❤️ for better financial management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
