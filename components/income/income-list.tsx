"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IncomeForm } from "@/components/income/income-form";
import { createClient } from "@/utils/supabase/client";

interface IncomeListProps {
  filter?: "highest" | "lowest";
  incomeEntries: any[] | null;
}

export function IncomeList({
  filter,
  incomeEntries: initialIncomeEntries,
}: IncomeListProps) {
  const [incomeEntries, setIncomeEntries] = useState(
    initialIncomeEntries || []
  ); // State for income entries
  const [openDialog, setOpenDialog] = useState<{
    id: string;
    type: "edit" | "view" | "delete";
  } | null>(null);

  const refreshIncome = async () => {
    const supabase = createClient();
    const { data: updatedIncome } = await supabase
      .from("income")
      .select("*")
      .order("date", { ascending: false });
    setIncomeEntries(updatedIncome || []);
  };

  let filteredIncome = [...incomeEntries];
  if (filter === "highest") {
    filteredIncome.sort((a, b) => b.amount - a.amount);
  } else if (filter === "lowest") {
    filteredIncome.sort((a, b) => a.amount - b.amount);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income History</CardTitle>
        <CardDescription>
          {filter === "highest"
            ? "Your highest income entries"
            : filter === "lowest"
            ? "Your lowest income sources"
            : "A complete list of your income"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {filteredIncome.map((income) => (
            <div key={income.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{income.source}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{income.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    +${income.amount.toFixed(2)}
                  </p>
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
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: income.id, type: "edit" })
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: income.id, type: "view" })
                      }
                    >
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setOpenDialog({ id: income.id, type: "delete" })
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
                  openDialog?.id === income.id && openDialog?.type === "edit"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Income</DialogTitle>
                    <DialogDescription>
                      Update the details of your income below.
                    </DialogDescription>
                  </DialogHeader>
                  <IncomeForm
                    initialData={income}
                    onSubmit={async () => {
                      setOpenDialog(null); // Close dialog
                      await refreshIncome(); // Refresh income list
                    }}
                  />
                </DialogContent>
              </Dialog>

              <Dialog
                open={
                  openDialog?.id === income.id && openDialog?.type === "view"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Income Details</DialogTitle>
                    <DialogDescription>
                      Here are more details about this income
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p>
                      <strong>Source:</strong> {income.source}
                    </p>
                    <p>
                      <strong>Date:</strong> ${income.date}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${income.amount?.toFixed(2)}
                    </p>
                    <p>
                      <strong>Notes:</strong>{" "}
                      {income.notes || "No notes provided."}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={
                  openDialog?.id === income.id && openDialog?.type === "delete"
                }
                onOpenChange={(open) => {
                  if (!open) setOpenDialog(null);
                }}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this income?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Cancel
                    </Button>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const supabase = createClient();
                        await supabase
                          .from("income")
                          .delete()
                          .eq("id", income.id);
                        setOpenDialog(null); // Close dialog
                        await refreshIncome(); // Refresh income list
                      }}
                    >
                      <input type="hidden" name="id" value={income.id} />
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
