import { Coffee, CreditCard, Home, MoreHorizontal, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ExpenseListProps {
  filter?: "recent" | "highest" | "lowest"
}

export function ExpenseList({ filter }: ExpenseListProps = {}) {
  // This would normally come from a database
  const expenses = [
    {
      id: 1,
      name: "Grocery Shopping",
      amount: 85.45,
      date: "Apr 25, 2025",
      category: "Groceries",
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
      date: "Apr 24, 2025",
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
      date: "Apr 23, 2025",
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
      date: "Apr 22, 2025",
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
    {
      id: 5,
      name: "Restaurant Dinner",
      amount: 65.8,
      date: "Apr 21, 2025",
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
      id: 6,
      name: "Gas Station",
      amount: 45.25,
      date: "Apr 20, 2025",
      category: "Transportation",
      budgetCategory: {
        name: "Transportation",
        color: "bg-red-500",
      },
      icon: Home,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      paid: true,
    },
  ]

  // Apply filters if needed
  let filteredExpenses = [...expenses]
  if (filter === "recent") {
    filteredExpenses = expenses.slice(0, 3)
  } else if (filter === "highest") {
    filteredExpenses = [...expenses].sort((a, b) => b.amount - a.amount)
  } else if (filter === "lowest") {
    filteredExpenses = [...expenses].sort((a, b) => a.amount - b.amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
        <CardDescription>
          {filter === "recent"
            ? "Your most recent expenses"
            : filter === "highest"
              ? "Your expenses sorted by highest amount"
              : filter === "lowest"
                ? "Your expenses sorted by lowest amount"
                : "A complete list of your expenses"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`rounded-full ${expense.bgColor} p-2`}>
                  <expense.icon className={`h-4 w-4 ${expense.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{expense.name}</p>
                    <div
                      className={`h-2 w-2 rounded-full ${expense.budgetCategory.color}`}
                      title={`Budget: ${expense.budgetCategory.name}`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {expense.date} · {expense.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">-${expense.amount.toFixed(2)}</p>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${expense.paid ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"}`}
                    >
                      {expense.paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit expense</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>{expense.paid ? "Mark as unpaid" : "Mark as paid"}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete expense</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
