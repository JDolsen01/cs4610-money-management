"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle2, Clock, MoreHorizontal } from "lucide-react"

// Define the recurring payment data type
type RecurringPayment = {
  id: string
  name: string
  amount: number
  dueDate: string
  frequency: "Monthly" | "Weekly" | "Yearly" | "Quarterly"
  category: string
  status: "Upcoming" | "Paid" | "Overdue"
}

// Sample data
const recurringPayments: RecurringPayment[] = [
  {
    id: "1",
    name: "Netflix Subscription",
    amount: 15.99,
    dueDate: "2023-05-01",
    frequency: "Monthly",
    category: "Entertainment",
    status: "Upcoming",
  },
  {
    id: "2",
    name: "Rent Payment",
    amount: 1200.0,
    dueDate: "2023-05-01",
    frequency: "Monthly",
    category: "Housing",
    status: "Upcoming",
  },
  {
    id: "3",
    name: "Gym Membership",
    amount: 50.0,
    dueDate: "2023-04-28",
    frequency: "Monthly",
    category: "Health",
    status: "Upcoming",
  },
  {
    id: "4",
    name: "Internet Bill",
    amount: 65.0,
    dueDate: "2023-04-25",
    frequency: "Monthly",
    category: "Utilities",
    status: "Upcoming",
  },
  {
    id: "5",
    name: "Phone Bill",
    amount: 85.0,
    dueDate: "2023-04-20",
    frequency: "Monthly",
    category: "Utilities",
    status: "Paid",
  },
  {
    id: "6",
    name: "Car Insurance",
    amount: 120.0,
    dueDate: "2023-04-15",
    frequency: "Monthly",
    category: "Insurance",
    status: "Paid",
  },
  {
    id: "7",
    name: "Spotify Subscription",
    amount: 9.99,
    dueDate: "2023-04-10",
    frequency: "Monthly",
    category: "Entertainment",
    status: "Paid",
  },
  {
    id: "8",
    name: "Amazon Prime",
    amount: 14.99,
    dueDate: "2023-05-05",
    frequency: "Monthly",
    category: "Shopping",
    status: "Upcoming",
  },
]

interface RecurringPaymentsProps {
  limit?: number
  showUpcomingOnly?: boolean
}

export function RecurringPayments({ limit, showUpcomingOnly = false }: RecurringPaymentsProps) {
  const [payments, setPayments] = useState<RecurringPayment[]>(recurringPayments)

  // Filter payments if showUpcomingOnly is true
  let filteredPayments = payments
  if (showUpcomingOnly) {
    filteredPayments = payments.filter((payment) => payment.status === "Upcoming")
  }

  // Limit the number of payments if limit is provided
  if (limit && limit > 0) {
    filteredPayments = filteredPayments.slice(0, limit)
  }

  // Function to mark a payment as paid
  const markAsPaid = (id: string) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) => (payment.id === id ? { ...payment, status: "Paid" } : payment)),
    )
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-emerald-500">Paid</Badge>
      case "Upcoming":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Upcoming
          </Badge>
        )
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-4">
      {filteredPayments.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No recurring payments found.</div>
      ) : (
        filteredPayments.map((payment) => (
          <Card key={payment.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-full p-2 ${payment.status === "Paid" ? "bg-emerald-100 text-emerald-500" : "bg-amber-100 text-amber-500"}`}
                  >
                    {payment.status === "Paid" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{payment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {formatDate(payment.dueDate)} • {payment.frequency}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">${payment.amount.toFixed(2)}</div>
                    <div className="mt-1">{getStatusBadge(payment.status)}</div>
                  </div>
                  <div className="flex items-center">
                    {payment.status === "Upcoming" && (
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => markAsPaid(payment.id)}>
                        Mark as Paid
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit payment</DropdownMenuItem>
                        <DropdownMenuItem>View history</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
