import Link from "next/link"
import { ArrowUpRight, Coffee, CreditCard, Home, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentExpenses() {
  const expenses = [
    {
      id: 1,
      name: "Grocery Shopping",
      amount: 85.45,
      date: "Today",
      category: "Shopping",
      budgetCategory: {
        name: "Groceries",
        color: "bg-green-500",
      },
      icon: ShoppingBag,
      iconColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      paid: true,
    },
    {
      id: 2,
      name: "Coffee Shop",
      amount: 4.5,
      date: "Yesterday",
      category: "Food & Drink",
      budgetCategory: {
        name: "Dining Out",
        color: "bg-blue-500",
      },
      icon: Coffee,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
      paid: true,
    },
    {
      id: 3,
      name: "Electricity Bill",
      amount: 75.0,
      date: "2 days ago",
      category: "Utilities",
      budgetCategory: {
        name: "Housing",
        color: "bg-yellow-500",
      },
      icon: Home,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      paid: false,
    },
    {
      id: 4,
      name: "Credit Card Payment",
      amount: 350.0,
      date: "3 days ago",
      category: "Bills",
      budgetCategory: {
        name: "Financial",
        color: "bg-purple-500",
      },
      icon: CreditCard,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      paid: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>You've spent $519.95 this week.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`rounded-full ${expense.bgColor} p-2`}>
                <expense.icon className={`h-4 w-4 ${expense.iconColor}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{expense.name}</p>
                  <div
                    className={`h-2 w-2 rounded-full ${expense.budgetCategory.color}`}
                    title={`Budget: ${expense.budgetCategory.name}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {expense.date} · {expense.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">-${expense.amount.toFixed(2)}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${expense.paid ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"}`}
                >
                  {expense.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/dashboard/expenses">
            View All Expenses
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
