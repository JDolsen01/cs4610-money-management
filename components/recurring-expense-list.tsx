import { CreditCard, Home, MoreHorizontal, Tv, Wifi } from "lucide-react"

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

interface RecurringExpenseListProps {
  filter?: "active" | "upcoming"
}

export function RecurringExpenseList({ filter }: RecurringExpenseListProps = {}) {
  // This would normally come from a database
  const recurringExpenses = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 14.99,
      nextDueDate: "May 5, 2025",
      frequency: "Monthly",
      category: "Subscription",
      icon: Tv,
      iconColor: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      status: "active",
      daysUntilDue: 10,
    },
    {
      id: 2,
      name: "Rent Payment",
      amount: 1200.0,
      nextDueDate: "May 1, 2025",
      frequency: "Monthly",
      category: "Housing",
      icon: Home,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      status: "active",
      daysUntilDue: 6,
    },
    {
      id: 3,
      name: "Internet Bill",
      amount: 65.0,
      nextDueDate: "May 15, 2025",
      frequency: "Monthly",
      category: "Utilities",
      icon: Wifi,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      status: "active",
      daysUntilDue: 20,
    },
    {
      id: 4,
      name: "Credit Card Payment",
      amount: 350.0,
      nextDueDate: "May 10, 2025",
      frequency: "Monthly",
      category: "Bills",
      icon: CreditCard,
      iconColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      status: "active",
      daysUntilDue: 15,
    },
  ]

  // Apply filters if needed
  let filteredExpenses = [...recurringExpenses]
  if (filter === "upcoming") {
    filteredExpenses = recurringExpenses
      .filter((expense) => expense.daysUntilDue <= 14)
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
  } else if (filter === "active") {
    filteredExpenses = recurringExpenses.filter((expense) => expense.status === "active")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Expenses</CardTitle>
        <CardDescription>
          {filter === "upcoming"
            ? "Expenses due in the next 14 days"
            : filter === "active"
              ? "Your active recurring expenses"
              : "All your recurring expenses"}
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
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Next due: {expense.nextDueDate} · {expense.frequency}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {expense.daysUntilDue <= 3 ? (
                      <span className="text-red-500">Due soon</span>
                    ) : (
                      `Due in ${expense.daysUntilDue} days`
                    )}
                  </p>
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
                    <DropdownMenuItem>Mark as paid</DropdownMenuItem>
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
