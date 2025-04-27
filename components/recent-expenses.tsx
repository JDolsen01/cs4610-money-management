import Link from "next/link";
import {
  ArrowUpRight,
  Coffee,
  CreditCard,
  Home,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentExpensesProps {
  expenses: any[] | null;
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  if (!expenses) {
    return <div className="text-red-500">No recent expenses found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>You've spent $519.95 this week.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      expense.budget
                        ? "bg-" + expense.budget?.color.toLowerCase() + "-500"
                        : "bg-black"
                    }`}
                    title={`Budget: ${
                      expense.budget ? expense.budget.name : "N/A"
                    }`}
                  />
                  <p className="text-sm font-medium">{expense.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {expense.date} ·{" "}
                  {expense.budget ? expense.budget.name : "N/A"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-red-600">
                  -${expense.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/dashboard/expenses">
            View All Expenses
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
