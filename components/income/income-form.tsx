"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { updateBudget } from "@/app/budgets";
import { createIncome, updateIncome } from "@/app/income";

interface IncomeFormProps {
  initialData?: {
    id?: string;
    source?: string;
    amount?: number;
    date?: string;
  };
}

export function IncomeForm({
  initialData,
  onSubmit,
}: IncomeFormProps & { onSubmit: () => void }) {
  const [date, setDate] = useState<string>(
    initialData?.date || new Date().toISOString().split("T")[0]
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (initialData) {
      await updateIncome(formData); // Call your API or logic to update income
    } else {
      await createIncome(formData); // Call your API or logic to create income
    }
    onSubmit(); // Trigger parent callback
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="space-y-2">
        <Label htmlFor="source">Income Source</Label>
        <Input
          id="source"
          name="source"
          defaultValue={initialData?.source}
          placeholder="e.g., Salary"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          name="amount"
          defaultValue={initialData?.amount}
          placeholder="e.g., 5000"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
