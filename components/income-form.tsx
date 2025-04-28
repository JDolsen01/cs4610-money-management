"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createIncome } from "@/app/income";

interface IncomeFormProps {
  initialData?: {
    id?: string;
    source?: string;
    amount?: number;
    date?: string;
    notes?: string;
  };
}

export function IncomeForm({ initialData }: IncomeFormProps) {
  const [date, setDate] = useState<string>(
    initialData?.date || new Date().toISOString().split("T")[0]
  );

  return (
    <form className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="source">Income Source</Label>
        <Input
          id="source"
          name="source"
          placeholder="Salary, Freelance work, etc."
          defaultValue={initialData?.source}
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
            placeholder="0.00"
            defaultValue={initialData?.amount}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date Received</Label>
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
        <Button type="submit" formAction={createIncome}>
          Save Income
        </Button>
      </DialogFooter>
    </form>
  );
}
