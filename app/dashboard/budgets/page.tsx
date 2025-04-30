import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BudgetsClient from "@/components/budget/budget-client";
export default async function BudgetsPage() {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch budget categories
  const { data: budgetCategories } = await supabase.rpc(
    "get_budget_totals",
    {}
  );

  return <BudgetsClient initialBudgetCategories={budgetCategories || []} />;
}
