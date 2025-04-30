"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentExpenses } from "@/components/recent-expenses";
import { RecentIncome } from "@/components/recent-income";
import { FinancialSummary } from "@/components/financial-summary";
import { BudgetCategoryOverview } from "@/components/budget-category-overview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExpenseForm } from "@/components/expense/expense-form";
import { IncomeForm } from "@/components/income/income-form";
import { createClient } from "@/utils/supabase/client";

interface DashboardClientProps {
  initialBudgetCategories: any[];
  initialBudgetTotals: any[];
  initialExpenses: any[];
  initialIncome: any[];
  initialTotalIncome: number;
  initialTotalExpenses: number;
}

export default function DashboardClient({
  initialBudgetCategories,
  initialBudgetTotals,
  initialExpenses,
  initialIncome,
  initialTotalIncome,
  initialTotalExpenses,
}: DashboardClientProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [income, setIncome] = useState(initialIncome);
  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);
  const [totalExpenses, setTotalExpenses] = useState(initialTotalExpenses);

  const [isIncomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setExpenseDialogOpen] = useState(false);

  const refreshData = async () => {
    const supabase = createClient();

    const { data: updatedExpenses } = await supabase
      .from("expenses")
      .select("*, budget(name, color)")
      .order("date", { ascending: false })
      .limit(4);
    setExpenses(updatedExpenses || []);

    const { data: updatedIncome } = await supabase
      .from("income")
      .select("*")
      .order("date", { ascending: false })
      .limit(4);
    setIncome(updatedIncome || []);

    const { data: updatedTotalIncome } = await supabase.rpc(
      "sum_income_amount",
      {}
    );
    setTotalIncome(updatedTotalIncome || 0);

    const { data: updatedTotalExpenses } = await supabase.rpc(
      "sum_expenses_amount",
      {}
    );
    setTotalExpenses(updatedTotalExpenses || 0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your finances.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isIncomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
                <DialogDescription>
                  Enter the details of your income below.
                </DialogDescription>
              </DialogHeader>
              <IncomeForm
                onSubmit={async () => {
                  setIncomeDialogOpen(false); // Close dialog
                  await refreshData(); // Refresh data after adding income
                }}
              />
            </DialogContent>
          </Dialog>

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
                budgets={initialBudgetCategories}
                onSubmit={async () => {
                  setExpenseDialogOpen(false); // Close dialog
                  await refreshData(); // Refresh data after adding expense
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <FinancialSummary
        totalExpenses={totalExpenses}
        totalIncome={totalIncome}
      />

      <div className="my-8">
        <BudgetCategoryOverview budgetCategories={initialBudgetTotals} />
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <RecentIncome income={income} />
            <RecentExpenses expenses={expenses} />
          </div>
        </TabsContent>
        <TabsContent value="income" className="space-y-4">
          <RecentIncome income={income} />
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <RecentExpenses expenses={expenses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
