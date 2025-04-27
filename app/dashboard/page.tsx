import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentExpenses } from "@/components/recent-expenses";
import { RecentIncome } from "@/components/recent-income";
import { FinancialSummary } from "@/components/financial-summary";
import { BudgetCategoryOverview } from "@/components/budget-category-overview";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
    .eq("user_id", user.id)
    .limit(4);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, John! Here's an overview of your finances.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/income">
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/expenses">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </div>
      </div>

      <FinancialSummary />

      <div className="my-8">
        <BudgetCategoryOverview budgetCategories={budgetCategories} />
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <RecentIncome />
            <RecentExpenses />
          </div>
        </TabsContent>
        <TabsContent value="income" className="space-y-4">
          <RecentIncome />
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <RecentExpenses />
        </TabsContent>
      </Tabs>
    </div>
  );
}
