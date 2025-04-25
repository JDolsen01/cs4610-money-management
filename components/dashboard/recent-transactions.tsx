"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the transaction data type
type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
}

// Sample data
const transactions: Transaction[] = [
  {
    id: "1",
    date: "2023-04-23",
    description: "Salary Deposit",
    amount: 3500.0,
    type: "income",
  },
  {
    id: "2",
    date: "2023-04-22",
    description: "Grocery Shopping",
    amount: 85.75,
    type: "expense",
  },
  {
    id: "3",
    date: "2023-04-21",
    description: "Freelance Payment",
    amount: 450.0,
    type: "income",
  },
  {
    id: "4",
    date: "2023-04-20",
    description: "Restaurant Dinner",
    amount: 65.2,
    type: "expense",
  },
  {
    id: "5",
    date: "2023-04-19",
    description: "Gas Station",
    amount: 45.5,
    type: "expense",
  },
  {
    id: "6",
    date: "2023-04-18",
    description: "Online Course",
    amount: 199.99,
    type: "expense",
  },
  {
    id: "7",
    date: "2023-04-17",
    description: "Side Project Income",
    amount: 250.0,
    type: "income",
  },
]

export function RecentTransactions() {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              transaction.type === "income" ? "bg-emerald-100" : "bg-red-100",
            )}
          >
            {transaction.type === "income" ? (
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
          </div>
          <div
            className={cn("ml-auto font-medium", transaction.type === "income" ? "text-emerald-500" : "text-red-500")}
          >
            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
