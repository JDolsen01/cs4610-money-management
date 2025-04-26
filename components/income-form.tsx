"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function IncomeForm() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [isRecurring, setIsRecurring] = useState(false)

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="name">Income Source</Label>
        <Input id="name" placeholder="Salary, Freelance work, etc." />
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
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
            <SelectItem value="investments">Investments</SelectItem>
            <SelectItem value="rental">Rental Income</SelectItem>
            <SelectItem value="gifts">Gifts</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date Received</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
        <Label htmlFor="recurring">Recurring Income</Label>
      </div>
      {isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" placeholder="Add any additional details here..." />
      </div>
      <DialogFooter>
        <Button type="submit">Save Income</Button>
      </DialogFooter>
    </div>
  )
}
