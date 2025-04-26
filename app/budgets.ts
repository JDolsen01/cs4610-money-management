import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getBudgets() {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data;
}

export async function createBudget(formData: FormData) {
  const name = formData.get("name")?.toString();
  const budget = formData.get("budget")?.toString();
  const spent = 0;
  const color = formData.get("color")?.toString();
  const notes = formData.get("notes")?.toString();
  const { data, error } = await supabase
    .from("budgets")
    .insert({
      name,
      budget: budget ? parseFloat(budget) : null,
      spent,
      color,
      notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select("*");

  if (error) {
    console.error("Error creating budget:", error.message);
    return null;
  }

  return data[0];
}
