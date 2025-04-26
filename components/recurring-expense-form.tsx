"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

export function RecurringExpenseForm() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0])

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input id="name" placeholder="Netflix Subscription" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input id="amount" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subscription">Subscription</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="rent">Rent/Mortgage</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="loan">Loan Payment</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select>
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="biweekly">Bi-weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="start-date">Start Date</Label>
        <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" placeholder="Add any additional details here..." />
      </div>
      <DialogFooter>
        <Button type="submit">Save Recurring Expense</Button>
      </DialogFooter>
    </div>
  )
}
