import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function BudgetCategoryOverview() {
  // This would normally come from a database
  const budgetCategories = [
    {
      id: 1,
      name: "Groceries",
      budget: 500,
      spent: 320,
      remaining: 180,
      color: "bg-green-500",
      active: true,
      percentSpent: 64,
      isOverspent: false,
    },
    {
      id: 2,
      name: "Dining Out",
      budget: 200,
      spent: 175,
      remaining: 25,
      color: "bg-blue-500",
      active: true,
      percentSpent: 87.5,
      isOverspent: false,
    },
    {
      id: 3,
      name: "Entertainment",
      budget: 150,
      spent: 180,
      remaining: -30,
      color: "bg-red-500",
      active: true,
      percentSpent: 120,
      isOverspent: true,
    },
    {
      id: 4,
      name: "Transportation",
      budget: 300,
      spent: 250,
      remaining: 50,
      color: "bg-yellow-500",
      active: true,
      percentSpent: 83.3,
      isOverspent: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Budget Categories</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/budgets">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {budgetCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${category.color}`} />
                <CardTitle className="text-sm font-medium">
                  {category.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${category.spent} of ${category.budget}
                  </span>
                  <span
                    className={`font-medium ${
                      category.isOverspent ? "text-red-500" : ""
                    }`}
                  >
                    {category.percentSpent}%
                  </span>
                </div>
                <Progress
                  value={
                    category.percentSpent > 100 ? 100 : category.percentSpent
                  }
                  className={`h-2 ${category.isOverspent ? "bg-red-200" : ""}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
