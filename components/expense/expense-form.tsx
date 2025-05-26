"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { createExpense, updateExpense } from "@/app/expenses";

interface ExpenseFormProps {
  initialData?: {
    id?: string;
    name?: string;
    amount?: number;
    category?: any;
    date: string;
    notes?: string;
  };
  budgets?: { id: string; name: string }[] | null;
}

export function ExpenseForm({
  initialData,
  budgets,
  onSubmit,
}: ExpenseFormProps & { onSubmit: () => void }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (initialData) {
      await updateExpense(formData); // Call your API or logic to update expense
    } else {
      await createExpense(formData); // Call your API or logic to create expense
    }
    onSubmit(); // Trigger parent callback
  };

  const [date, setDate] = useState<string>(
    initialData?.date || new Date().toISOString().split("T")[0]
  );

  return (
    <form className="space-y-4 py-2 pb-4" onSubmit={handleSubmit}>
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="space-y-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Grocery shopping"
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
        <Label htmlFor="category">Budget Category</Label>
        <Select name="budget" defaultValue="none">
          <SelectTrigger id="category">
            <SelectValue placeholder="Select budget category" />
          </SelectTrigger>
          <SelectContent
            defaultValue={
              initialData?.category?.id ? initialData.category.id : "NULL"
            }
          >
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
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <Button type="submit">Save Expense</Button>
      </DialogFooter>
    </form>
  );
}
