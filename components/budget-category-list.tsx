"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { BudgetCategoryForm } from "./budget-category-form";
import { deleteBudget } from "@/app/budgets";

interface BudgetCategoryListProps {
  budgetCategories: any[] | null;
  filter?: "active" | "overspent";
}

export function BudgetCategoryList({
  budgetCategories,
  filter,
}: BudgetCategoryListProps) {
  if (!budgetCategories) {
    return <div className="text-red-500">No budget categories found.</div>;
  }

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
                <div
                  className={`h-4 w-4 rounded-full bg-${category.color.toLowerCase()}-500`}
                />
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <Dialog>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit category
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem>View expenses</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" asChild>
                      <form action={deleteBudget}>
                        <input type="hidden" name="id" value={category.id} />
                        <Button
                          type="submit"
                          variant="ghost"
                          className="w-full text-left"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete category
                        </Button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Budget Category</DialogTitle>
                      <DialogDescription>
                        Update the details of your budget category.
                      </DialogDescription>
                    </DialogHeader>
                    <BudgetCategoryForm initialData={category} />
                  </DialogContent>
                </Dialog>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget: ${category.budget?.toFixed(2)}</span>
                <span>
                  Spent: ${category.spent?.toFixed(2)} ({category.percentSpent}
                  %)
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
                  ${(category.budget - category.spent).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
