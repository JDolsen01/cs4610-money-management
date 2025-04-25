"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Define the budget data type
type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  color: string;
};

// Sample data
const budgets: Budget[] = [
  {
    id: "1",
    category: "Housing",
    allocated: 1500.0,
    spent: 1200.0,
    remaining: 300.0,
    color: "bg-emerald-500",
  },
  {
    id: "2",
    category: "Food & Dining",
    allocated: 600.0,
    spent: 450.75,
    remaining: 149.25,
    color: "bg-blue-500",
  },
  {
    id: "3",
    category: "Transportation",
    allocated: 400.0,
    spent: 325.5,
    remaining: 74.5,
    color: "bg-purple-500",
  },
  {
    id: "4",
    category: "Entertainment",
    allocated: 200.0,
    spent: 185.99,
    remaining: 14.01,
    color: "bg-amber-500",
  },
  {
    id: "5",
    category: "Utilities",
    allocated: 350.0,
    spent: 295.3,
    remaining: 54.7,
    color: "bg-indigo-500",
  },
  {
    id: "6",
    category: "Shopping",
    allocated: 300.0,
    spent: 234.99,
    remaining: 65.01,
    color: "bg-pink-500",
  },
  {
    id: "7",
    category: "Health",
    allocated: 250.0,
    spent: 150.0,
    remaining: 100.0,
    color: "bg-teal-500",
  },
  {
    id: "8",
    category: "Personal Care",
    allocated: 150.0,
    spent: 85.25,
    remaining: 64.75,
    color: "bg-orange-500",
  },
];

interface BudgetOverviewProps {
  showAll?: boolean;
}

export function BudgetOverview({ showAll = false }: BudgetOverviewProps) {
  // Limit the number of budgets if showAll is false
  const displayedBudgets = showAll ? budgets : budgets.slice(0, 4);

  // Calculate percentage spent
  const getPercentage = (spent: number, allocated: number) => {
    return Math.round((spent / allocated) * 100);
  };

  // Get progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="space-y-6">
      {displayedBudgets.map((budget) => {
        const percentage = getPercentage(budget.spent, budget.allocated);
        return (
          <div key={budget.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={cn("h-3 w-3 rounded-full mr-2", budget.color)}
                />
                <span className="font-medium">{budget.category}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ${budget.spent.toFixed(2)} / ${budget.allocated.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={percentage}
                className={cn("h-2", getProgressColor(percentage))}
              />
              <span className="text-sm font-medium w-10">{percentage}%</span>
            </div>
          </div>
        );
      })}

      {!showAll && (
        <div className="pt-2">
          <span className="text-sm text-muted-foreground">
            Showing 4 of {budgets.length} budgets. View all in the Budgets tab.
          </span>
        </div>
      )}
    </div>
  );
}
