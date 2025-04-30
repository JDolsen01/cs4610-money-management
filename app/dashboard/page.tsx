import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/dashboard-client";

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
    <DashboardClient
      initialBudgetCategories={budgetCategories || []}
      initialBudgetTotals={budgetTotals || []}
      initialExpenses={expenses || []}
      initialIncome={income || []}
      initialTotalIncome={totalIncome || 0}
      initialTotalExpenses={totalExpenses || 0}
    />
  );
}
