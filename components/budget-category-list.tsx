"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [openDialog, setOpenDialog] = useState<{
    id: string;
    type: "edit" | "view" | "delete";
  } | null>(null);

  if (!budgetCategories) {
    return <div className="text-red-500">No budget categories found.</div>;
  }

  let filteredCategories = [...budgetCategories];
  if (filter === "active") {
    filteredCategories = budgetCategories.filter((category) => category.active);
  } else if (filter === "overspent") {
    filteredCategories = budgetCategories.filter(
      (category) => category.total_spent > category.budget
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

                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      setOpenDialog({ id: category.id, type: "edit" })
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setOpenDialog({ id: category.id, type: "view" })
                    }
                  >
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      setOpenDialog({ id: category.id, type: "delete" })
                    }
                    className="text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget: ${category.budget?.toFixed(2)}</span>
                <span>
                  {((category.total_spent / category.budget) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={
                  (category.total_spent / category.budget) * 100 > 100
                    ? 100
                    : (category.total_spent / category.budget) * 100
                }
                className={`h-2 ${category.isOverspent ? "bg-red-200" : ""}`}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Remaining:</span>
                <span
                  className={
                    category.isOverspent
                      ? "text-red-500 font-medium"
                      : "font-medium"
                  }
                >
                  ${(category.budget - category.total_spent).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>

          <Dialog
            open={openDialog?.id === category.id && openDialog?.type === "edit"}
            onOpenChange={(open) => {
              if (!open) setOpenDialog(null);
            }}
          >
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

          <Dialog
            open={openDialog?.id === category.id && openDialog?.type === "view"}
            onOpenChange={(open) => {
              if (!open) setOpenDialog(null);
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Category Details</DialogTitle>
                <DialogDescription>
                  Here are more details about this budget category.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {category.name}
                </p>
                <p>
                  <strong>Budget:</strong> ${category.budget?.toFixed(2)}
                </p>
                <p>
                  <strong>Spent:</strong> ${category.total_spent?.toFixed(2)}
                </p>
                <p>
                  <strong>Notes:</strong>{" "}
                  {category.notes || "No notes provided."}
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={
              openDialog?.id === category.id && openDialog?.type === "delete"
            }
            onOpenChange={(open) => {
              if (!open) setOpenDialog(null);
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this budget category?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpenDialog(null)}>
                  Cancel
                </Button>
                <form action={deleteBudget}>
                  <input type="hidden" name="id" value={category.id} />
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </Card>
      ))}
    </div>
  );
}
