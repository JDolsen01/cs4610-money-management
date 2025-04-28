import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function createIncome(formData: FormData) {
  const source = formData.get("source")?.toString();
  const amount = formData.get("amount");
  const date = formData.get("date");
  const category = formData.get("category")?.toString();
  const notes = formData.get("notes")?.toString();

  const { data, error } = await supabase
    .from("income")
    .insert({
      source,
      amount: amount ? parseFloat(amount.toString()) : null,
      date: date ? new Date(date.toString()) : null,
      category,
      notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select("*");
  if (error) {
    console.error("Error creating income:", error.message);
    return null;
  }
  return data[0];
}

export async function updateIncome(formData: FormData) {
  const incomeId = formData.get("id")?.toString();
  const source = formData.get("source")?.toString();
  const amount = formData.get("amount");
  const date = formData.get("date");
  const category = formData.get("category")?.toString();
  const notes = formData.get("notes")?.toString();

  const { data, error } = await supabase
    .from("income")
    .update({
      source,
      amount,
      date,
      category,
      notes,
    })
    .eq("id", incomeId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .select("*");

  if (error) {
    console.error("Error updating income:", error.message);
    return null;
  }

  return data[0];
}

export async function deleteIncome(formData: FormData) {
  const incomeId = formData.get("id")?.toString();
  const { error } = await supabase
    .from("income")
    .delete()
    .eq("id", incomeId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error("Error deleting income:", error.message);
  }
}
