"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "./expense-form";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { deleteExpense } from "@/app/expenses";

interface ExpenseListProps {
  filter?: "recent" | "highest" | "lowest";
  expenses: any[] | null;
  budgets: any[] | null;
}

export function ExpenseList({ filter, expenses, budgets }: ExpenseListProps) {
  const [openDialog, setOpenDialog] = useState<{
    id: string;
    type: "edit" | "view" | "delete";
  } | null>(null);

  if (!expenses) {
    return <div className="text-red-500">No recent expenses found.</div>;
  }

  let filteredExpenses = [...expenses];
  if (filter === "highest") {
    filteredExpenses.sort((a, b) => b.amount - a.amount);
  } else if (filter === "lowest") {
    filteredExpenses.sort((a, b) => a.amount - b.amount);
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
                      className={`h-2 w-2 rounded-full ${
                        expense.budget
                          ? "bg-" + expense.budget?.color.toLowerCase() + "-500"
                          : "bg-black"
                      }`}
                      title={`Budget: ${
                        expense.budget ? expense.budget.name : "N/A"
                      }`}
                    />
                    <p className="font-medium">{expense.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {expense.date} ·{" "}
                    {expense.budget ? expense.budget.name : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <p className="font-medium text-red-600">
                  -${expense.amount.toFixed(2)}
                </p>

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
                        setOpenDialog({ id: expense.id, type: "edit" })
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: expense.id, type: "view" })
                      }
                    >
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: expense.id, type: "delete" })
                      }
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Dialog
                open={
                  openDialog?.id === expense.id && openDialog?.type === "edit"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                    <DialogDescription>
                      Update the details of your expense below.
                    </DialogDescription>
                  </DialogHeader>
                  <ExpenseForm initialData={expense} budgets={budgets} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={
                  openDialog?.id === expense.id && openDialog?.type === "view"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Expense Details</DialogTitle>
                    <DialogDescription>
                      Here are more details about this expense
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {expense.name}
                    </p>
                    <p>
                      <strong>Date:</strong> ${expense.date}
                    </p>
                    <p>
                      <strong>Spent:</strong> ${expense.amount?.toFixed(2)}
                    </p>
                    <p>
                      <strong>Notes:</strong>{" "}
                      {expense.notes || "No notes provided."}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={
                  openDialog?.id === expense.id && openDialog?.type === "delete"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this expense?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Cancel
                    </Button>
                    <form action={deleteExpense}>
                      <input type="hidden" name="id" value={expense.id} />
                      <Button type="submit" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
