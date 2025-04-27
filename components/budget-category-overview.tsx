import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCategoryListProps {
  budgetCategories: any[] | null;
}

export function BudgetCategoryOverview({
  budgetCategories,
}: BudgetCategoryListProps) {
  if (!budgetCategories) {
    return <div className="text-red-500">No budget categories found.</div>;
  }

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
        {budgetCategories.map((category, index) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`h-3 w-3 rounded-full bg-${category.color.toLowerCase()}-500`}
                />
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
                      category.spent > category.budget ? "text-red-500" : ""
                    }`}
                  >
                    {category.percentSpent}%
                  </span>
                </div>
                <Progress
                  value={
                    category.percentSpent > 100 ? 100 : category.percentSpent
                  }
                  className={`h-2 ${
                    category.spent > category.budget ? "bg-red-200" : ""
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
