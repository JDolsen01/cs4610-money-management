import { Edit, MoreHorizontal, Trash } from "lucide-react";

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
import { Progress } from "@/components/ui/progress";

interface BudgetCategoryListProps {
  filter?: "active" | "overspent";
}

export function BudgetCategoryList({ filter }: BudgetCategoryListProps = {}) {
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
    {
      id: 5,
      name: "Shopping",
      budget: 200,
      spent: 220,
      remaining: -20,
      color: "bg-purple-500",
      active: true,
      percentSpent: 110,
      isOverspent: true,
    },
    {
      id: 6,
      name: "Vacation",
      budget: 500,
      spent: 0,
      remaining: 500,
      color: "bg-pink-500",
      active: false,
      percentSpent: 0,
      isOverspent: false,
    },
  ];

  // Apply filters if needed
  let filteredCategories = [...budgetCategories];
  if (filter === "active") {
    filteredCategories = budgetCategories.filter((category) => category.active);
  } else if (filter === "overspent") {
    filteredCategories = budgetCategories.filter(
      (category) => category.isOverspent
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredCategories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`h-4 w-4 rounded-full ${category.color}`} />
                <CardTitle className="text-lg">{category.name}</CardTitle>
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
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit category
                  </DropdownMenuItem>
                  <DropdownMenuItem>View expenses</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>
              {category.active ? (
                <span className="text-xs">Active</span>
              ) : (
                <span className="text-xs text-muted-foreground">Inactive</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget: ${category.budget.toFixed(2)}</span>
                <span>
                  Spent: ${category.spent.toFixed(2)} ({category.percentSpent}%)
                </span>
              </div>
              <Progress
                value={
                  category.percentSpent > 100 ? 100 : category.percentSpent
                }
                className={`h-2 ${category.isOverspent ? "bg-red-200" : ""}`}
              />
              <div className="flex justify-between text-sm">
                <span>Remaining:</span>
                <span
                  className={
                    category.isOverspent
                      ? "text-red-500 font-medium"
                      : "font-medium"
                  }
                >
                  ${category.remaining.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
