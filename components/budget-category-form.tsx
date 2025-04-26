"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBudget, updateBudget } from "@/app/budgets";

interface BudgetCategoryFormProps {
  initialData?: {
    id?: string;
    name?: string;
    budget?: number;
    color?: string;
    notes?: string;
  };
}

export function BudgetCategoryForm({ initialData }: BudgetCategoryFormProps) {
  return (
    <form className="space-y-4 py-2 pb-4">
      <input type="hidden" name="id" defaultValue={initialData?.id} />
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Groceries"
          defaultValue={initialData?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget-amount">Monthly Budget</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="budget-amount"
            name="budget"
            defaultValue={initialData?.budget}
            type="number"
            step="0.01"
            min="0"
            className="pl-7"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {[
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
          ].map((color, index) => (
            <label key={index} className="relative block cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color.split("-")[1].toUpperCase()} // use the color name for value
                className="peer sr-only" // hide the input but keep it accessible
              />
              <div
                className={`h-8 w-8 rounded-full ${color} border-2 border-transparent peer-checked:border-gray-800 hover:border-gray-400`}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={initialData?.notes}
          placeholder="Add any additional details here..."
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          formAction={initialData ? updateBudget : createBudget}
        >
          Save Category
        </Button>
      </DialogFooter>
    </form>
  );
}
