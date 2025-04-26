"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ExpenseForm() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input id="name" placeholder="Grocery shopping" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input id="amount" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Budget Category</Label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select budget category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="dining">Dining Out</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="paid" />
        <Label htmlFor="paid">Mark as paid</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" placeholder="Add any additional details here..." />
      </div>
      <DialogFooter>
        <Button type="submit">Save Expense</Button>
      </DialogFooter>
    </div>
  )
}
