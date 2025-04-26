import Link from "next/link"
import { ArrowUpRight, Banknote, Briefcase, DollarSign, PiggyBank } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentIncome() {
  const incomeEntries = [
    {
      id: 1,
      source: "Monthly Salary",
      amount: 3500.0,
      date: "Today",
      category: "Salary",
      icon: Briefcase,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: 2,
      source: "Freelance Project",
      amount: 850.0,
      date: "3 days ago",
      category: "Freelance",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      id: 3,
      source: "Dividend Payment",
      amount: 125.5,
      date: "1 week ago",
      category: "Investments",
      icon: PiggyBank,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      id: 4,
      source: "Apartment Rental",
      amount: 1200.0,
      date: "2 weeks ago",
      category: "Rental Income",
      icon: Banknote,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Income</CardTitle>
        <CardDescription>You've earned $5,675.50 this month.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {incomeEntries.slice(0, 4).map((income) => (
          <div key={income.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`rounded-full ${income.bgColor} p-2`}>
                <income.icon className={`h-4 w-4 ${income.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium">{income.source}</p>
                <p className="text-xs text-muted-foreground">
                  {income.date} · {income.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">+${income.amount.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/dashboard/income">
            View All Income
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
