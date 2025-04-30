"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "@/components/expense/expense-form";
import { ExpenseList } from "@/components/expense/expense-list";
import { createClient } from "@/utils/supabase/client";

interface ExpensesClientProps {
  initialExpenses: any[];
  initialBudgetCategories: any[];
}

export default function ExpensesClient({
  initialExpenses,
  initialBudgetCategories,
}: ExpensesClientProps) {
  const [isExpenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [budgetCategories, setBudgetCategories] = useState(
    initialBudgetCategories
  );

  const refreshData = async () => {
    const supabase = createClient();
    const { data: updatedExpenses } = await supabase
      .from("expenses")
      .select("*, budget(name, color)")
      .order("date", { ascending: false });
    setExpenses(updatedExpenses || []);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Manage and track your expenses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={isExpenseDialogOpen}
            onOpenChange={setExpenseDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
                </DialogDescription>
              </DialogHeader>
              <ExpenseForm
                budgets={budgetCategories}
                onSubmit={async () => {
                  setExpenseDialogOpen(false);
                  await refreshData();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="highest">Highest</TabsTrigger>
            <TabsTrigger value="lowest">Lowest</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <ExpenseList
              filter="recent"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
          <TabsContent value="highest" className="space-y-4">
            <ExpenseList
              filter="highest"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
          <TabsContent value="lowest" className="space-y-4">
            <ExpenseList
              filter="lowest"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
