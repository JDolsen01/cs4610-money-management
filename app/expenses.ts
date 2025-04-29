import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*, budget(name, color)")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error.message);
    return [];
  }

  return data;
}

export async function createExpense(formData: FormData) {
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const date = formData.get("date");
  const budget = formData.get("budget")?.toString();
  const notes = formData.get("notes")?.toString();

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      name,
      amount: amount ? parseFloat(amount.toString()) : null,
      date: date ? new Date(date.toString()) : null,
      budget: budget == "NULL" ? null : budget,
      notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select("*");
  if (error) {
    console.error("Error creating expense:", error.message);
    return null;
  }
  return data[0];
}

export async function updateExpense(formData: FormData) {
  const expenseId = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const budget = formData.get("budget")?.toString();
  const date = formData.get("date");
  const notes = formData.get("notes")?.toString();

  const { data, error } = await supabase
    .from("expenses")
    .update({
      name,
      amount,
      budget: budget == "NULL" ? null : budget,
      date,
      notes,
    })
    .eq("id", expenseId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .select("*");

  if (error) {
    console.error("Error updating expense:", error.message);
    return null;
  }

  return data[0];
}

export async function deleteExpense(formData: FormData) {
  const expenseId = formData.get("id")?.toString();
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error("Error deleting expense:", error.message);
  }
}
