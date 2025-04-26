"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function BudgetCategoryForm() {
  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input id="name" placeholder="Groceries" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget-amount">Monthly Budget</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input id="budget-amount" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"].map(
            (color, index) => (
              <div
                key={index}
                className={`h-8 w-8 cursor-pointer rounded-full ${color} border-2 border-transparent hover:border-gray-400 focus:border-gray-400`}
                role="button"
                tabIndex={0}
                aria-label={`Select ${color} color`}
              />
            ),
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="active" defaultChecked />
        <Label htmlFor="active">Active</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" placeholder="Add any additional details here..." />
      </div>
      <DialogFooter>
        <Button type="submit">Save Category</Button>
      </DialogFooter>
    </div>
  )
}
