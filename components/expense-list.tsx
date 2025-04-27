import {
  Coffee,
  CreditCard,
  Home,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExpenseListProps {
  filter?: "recent" | "highest" | "lowest";
  expenses: any[] | null;
}

export function ExpenseList({ filter, expenses }: ExpenseListProps) {
  if (!expenses) {
    return <div className="text-red-500">No recent expenses found.</div>;
  }

  // Apply filters if needed
  let filteredExpenses = [...expenses];
  if (filter === "recent") {
    filteredExpenses = expenses.slice(0, 3);
  } else if (filter === "highest") {
    filteredExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
  } else if (filter === "lowest") {
    filteredExpenses = [...expenses].sort((a, b) => a.amount - b.amount);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
        <CardDescription>
          {filter === "recent"
            ? "Your most recent expenses"
            : filter === "highest"
            ? "Your expenses sorted by highest amount"
            : filter === "lowest"
            ? "Your expenses sorted by lowest amount"
            : "A complete list of your expenses"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full bg-${expense.budget.color.toLowerCase()}-500`}
                      title={`Budget: ${expense.budget.name}`}
                    />
                    <p className="font-medium">{expense.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {expense.date} · {expense.budget.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-red-600">
                      -${expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit expense</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>
                      {expense.paid ? "Mark as unpaid" : "Mark as paid"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete expense
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
