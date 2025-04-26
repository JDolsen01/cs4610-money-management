import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function updateBudget(formData: FormData) {
  const budgetId = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const budget = formData.get("budget")?.toString();
  const color = formData.get("color")?.toString();
  const notes = formData.get("notes")?.toString();

  const { data, error } = await supabase
    .from("budgets")
    .update({
      name,
      budget: budget ? parseFloat(budget) : null,
      color,
      notes,
    })
    .eq("id", budgetId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .select("*");

  if (error) {
    console.error("Error updating budget:", error.message);
    return null;
  }

  return data[0];
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
