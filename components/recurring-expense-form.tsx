"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import {
  createReoccuringExpense,
  updateReoccuringExpense,
} from "@/app/recurring";

interface RecurringExpenseFormProps {
  initialData?: {
    id?: string;
    name?: string;
    amount?: number;
    budget?: any;
    frequency?: string;
    dueDate?: string;
    notes?: string;
  };
  budgets?: { id: string; name: string }[] | null;
}

export function RecurringExpenseForm({
  initialData,
  budgets,
}: RecurringExpenseFormProps) {
  const [dueDate, setDueDate] = useState<string>(
    initialData?.dueDate || new Date().toISOString().split("T")[0]
  );

  return (
    <form className="space-y-4 py-2 pb-4">
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Netflix Subscription"
          defaultValue={initialData?.name}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            className="pl-7"
            placeholder="e.g., 5000"
            defaultValue={initialData?.amount}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget Category</Label>
        <Select name="budget">
          <SelectTrigger id="budget">
            <SelectValue placeholder="Select Budget" />
          </SelectTrigger>
          <SelectContent defaultValue={initialData?.budget.id}>
            {budgets?.map((budget) => (
              <SelectItem key={budget.name + initialData?.id} value={budget.id}>
                {budget.name}
              </SelectItem>
            ))}
            <SelectItem value="NULL">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select name="frequency">
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="semi-annually">Semi-annually</SelectItem>
            <SelectItem value="annually">Annually</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="due">Due Date</Label>
        <Input
          id="due"
          name="due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Add any additional details here..."
          defaultValue={initialData?.notes}
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          formAction={
            initialData ? updateReoccuringExpense : createReoccuringExpense
          }
        >
          Save Recurring Expense
        </Button>
      </DialogFooter>
    </form>
  );
}
