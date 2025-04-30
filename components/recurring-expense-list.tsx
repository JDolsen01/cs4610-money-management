"use client";

import {
  CreditCard,
  Edit,
  Home,
  MoreHorizontal,
  Trash,
  Tv,
  Wifi,
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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { RecurringExpenseForm } from "./recurring-expense-form";
import {
  deleteReoccuringExpense,
  markReoccuringExpenseAsPaid,
} from "@/app/recurring";

interface RecurringExpenseListProps {
  filter?: "late" | "upcoming" | "active";
  recurringExpenses?: any[] | null;
  budgets?: any[] | null;
}

export function RecurringExpenseList({
  filter,
  recurringExpenses,
  budgets,
}: RecurringExpenseListProps) {
  const [openDialog, setOpenDialog] = useState<{
    id: string;
    type: "edit" | "view" | "complete" | "delete";
  } | null>(null);

  if (!recurringExpenses) {
    return <div className="text-red-500">No recurring expenses found.</div>;
  }

  let filteredExpenses = [...recurringExpenses];
  if (filter === "late") {
    filteredExpenses = recurringExpenses
      .filter((expense) => expense.dueDate < new Date())
      .sort((a) => a.dueDate);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Expenses</CardTitle>
        <CardDescription>
          {filter === "late"
            ? "Expenses past due"
            : "All your recurring expenses"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Next due: {expense.dueDate} · {expense.frequency}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {expense.daysUntilDue <= 3 ? (
                      <span className="text-red-500">Due soon</span>
                    ) : (
                      `Due in ${expense.daysUntilDue} days`
                    )}
                  </p>
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
                        setOpenDialog({ id: expense.id, type: "edit" })
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: expense.id, type: "complete" })
                      }
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Mark as Paid
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
                  <RecurringExpenseForm
                    initialData={expense}
                    budgets={budgets}
                  />
                </DialogContent>
              </Dialog>

              <Dialog
                open={
                  openDialog?.id === expense.id &&
                  openDialog?.type === "complete"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Mark Expense as Paid</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to mark this expense as paid?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Cancel
                    </Button>
                    <form action={markReoccuringExpenseAsPaid}>
                      <input type="hidden" name="id" value={expense.id} />
                      <input type="hidden" name="name" value={expense.name} />
                      <input
                        type="hidden"
                        name="amount"
                        value={expense.amount}
                      />
                      <input type="hidden" name="due" value={expense.due} />
                      <input
                        type="hidden"
                        name="frequency"
                        value={expense.frequency}
                      />
                      <input
                        type="hidden"
                        name="budget"
                        value={expense.budget.id}
                      />
                      <input type="hidden" name="notes" value={expense.notes} />
                      <Button type="submit">Mark as Paid</Button>
                    </form>
                  </div>
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
                      <strong>Due Date:</strong> {expense.due}
                    </p>
                    <p>
                      <strong>Amount Due:</strong> ${expense.amount?.toFixed(2)}
                    </p>
                    <p>
                      <strong>Frequency:</strong> {expense.frequency}
                    </p>
                    <p>
                      <strong>Budget Category:</strong>{" "}
                      {expense.budget?.name || "No category assigned"}
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
                    <form action={deleteReoccuringExpense}>
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
