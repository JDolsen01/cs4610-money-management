import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ExpensesClient from "@/components/expense/expense-client";

export default async function ExpensesPage() {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch data
  const { data: budgetCategories } = await supabase
    .from("budgets")
    .select("id, name")
    .eq("user_id", user.id);

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, budget(name, color)")
    .order("date", { ascending: false })
    .eq("user_id", user.id);

  return (
    <ExpensesClient
      initialExpenses={expenses || []}
      initialBudgetCategories={budgetCategories || []}
    />
  );
}
