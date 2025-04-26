import { Banknote, Briefcase, DollarSign, MoreHorizontal, PiggyBank, Repeat } from "lucide-react"

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

interface IncomeListProps {
  filter?: "recent" | "recurring"
}

export function IncomeList({ filter }: IncomeListProps = {}) {
  // This would normally come from a database
  const incomeEntries = [
    {
      id: 1,
      source: "Monthly Salary",
      amount: 3500.0,
      date: "Apr 25, 2025",
      category: "Salary",
      icon: Briefcase,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      isRecurring: true,
      frequency: "Monthly",
    },
    {
      id: 2,
      source: "Freelance Project",
      amount: 850.0,
      date: "Apr 20, 2025",
      category: "Freelance",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      isRecurring: false,
    },
    {
      id: 3,
      source: "Dividend Payment",
      amount: 125.5,
      date: "Apr 15, 2025",
      category: "Investments",
      icon: PiggyBank,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      isRecurring: true,
      frequency: "Quarterly",
    },
    {
      id: 4,
      source: "Apartment Rental",
      amount: 1200.0,
      date: "Apr 10, 2025",
      category: "Rental Income",
      icon: Banknote,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
      isRecurring: true,
      frequency: "Monthly",
    },
    {
      id: 5,
      source: "Tax Refund",
      amount: 750.0,
      date: "Apr 5, 2025",
      category: "Other",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      isRecurring: false,
    },
  ]

  // Apply filters if needed
  let filteredIncome = [...incomeEntries]
  if (filter === "recent") {
    filteredIncome = incomeEntries.slice(0, 3)
  } else if (filter === "recurring") {
    filteredIncome = incomeEntries.filter((income) => income.isRecurring)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income History</CardTitle>
        <CardDescription>
          {filter === "recent"
            ? "Your most recent income entries"
            : filter === "recurring"
              ? "Your recurring income sources"
              : "A complete list of your income"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredIncome.map((income) => (
            <div key={income.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`rounded-full ${income.bgColor} p-2`}>
                  <income.icon className={`h-4 w-4 ${income.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{income.source}</p>
                    {income.isRecurring && (
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Repeat className="mr-1 h-3 w-3" />
                        {income.frequency}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {income.date} · {income.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-green-600">+${income.amount.toFixed(2)}</p>
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
                    <DropdownMenuItem>Edit income</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete income</DropdownMenuItem>
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
