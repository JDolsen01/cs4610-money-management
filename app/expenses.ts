import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function createExpense(formData: FormData) {
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const date = formData.get("date");
  const budget = formData.get("budget")?.toString();
  const notes = formData.get("notes")?.toString();

  console.log("Creating expense with data:", {
    name,
    amount,
    date,
    budget,
    notes,
  });

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
