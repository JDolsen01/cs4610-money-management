import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentExpenses } from "@/components/recent-expenses";
import { RecentIncome } from "@/components/recent-income";
import { FinancialSummary } from "@/components/financial-summary";
import { BudgetCategoryOverview } from "@/components/budget-category-overview";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExpenseForm } from "@/components/expense/expense-form";
import { IncomeForm } from "@/components/income-form";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: budgetCategories } = await supabase
    .from("budgets")
    .select("*")
    .order("budget", { ascending: true })
    .eq("user_id", user.id);

  const { data: budgetTotals } = await supabase.rpc("get_budget_totals", {});

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, budget(name, color)")
    .order("date", { ascending: false })
    .eq("user_id", user.id)
    .limit(4);

  const { data: income } = await supabase
    .from("income")
    .select("*")
    .order("date", { ascending: false })
    .eq("user_id", user.id)
    .limit(4);

  const { data: totalIncome } = await supabase.rpc("sum_income_amount", {});
  const { data: totalExpenses } = await supabase.rpc("sum_expenses_amount", {});

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
          <Dialog>
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
              <IncomeForm />
            </DialogContent>
          </Dialog>

          <Dialog>
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
              <ExpenseForm budgets={budgetCategories} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <FinancialSummary
        totalExpenses={totalExpenses}
        totalIncome={totalIncome}
      />

      <div className="my-8">
        <BudgetCategoryOverview budgetCategories={budgetTotals} />
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
