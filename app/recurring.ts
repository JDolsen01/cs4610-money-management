import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getReoccuringExpenses() {
  const { data, error } = await supabase
    .from("recurring")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error("Error fetching reoccuring expenses:", error.message);
    return [];
  }

  return data;
}

export async function createReoccuringExpense(formData: FormData) {
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const budget = formData.get("budget")?.toString();
  const frequency = formData.get("frequency")?.toString();
  const due = formData.get("due");
  const notes = formData.get("notes")?.toString();

  console.log("Creating reoccuring expense:");

  const { data, error } = await supabase
    .from("recurring")
    .insert({
      name,
      amount: amount ? parseFloat(amount.toString()) : null,
      frequency,
      budget,
      due: due ? new Date(due.toString()) : null,
      notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select("*");

  if (error) {
    console.error("Error creating reoccuring expense:", error.message);
    return null;
  }

  return data[0];
}

export async function updateReoccuringExpense(formData: FormData) {
  const expenseId = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const budget = formData.get("budget")?.toString();
  const frequency = formData.get("frequency")?.toString();
  const due = formData.get("due");
  const notes = formData.get("notes")?.toString();

  console.log("Budget:", budget);

  const { data, error } = await supabase
    .from("recurring")
    .update({
      name,
      amount: amount ? parseFloat(amount.toString()) : null,
      budget: budget == "NULL" ? null : budget,
      frequency,
      due: due ? new Date(due.toString()) : null,
      notes,
    })
    .eq("id", expenseId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .select("*");

  if (error) {
    console.error("Error updating reoccuring expense:", error.message, budget);
    return null;
  }

  return data[0];
}

export async function markReoccuringExpenseAsPaid(formData: FormData) {
  const expenseId = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const amount = formData.get("amount");
  const budget = formData.get("budget")?.toString();
  const frequency = formData.get("frequency")?.toString();
  const due = formData.get("due");
  const dueDate = due ? new Date(due.toString()) : new Date();
  const notes = formData.get("notes")?.toString();

  switch (frequency) {
    case "weekly":
      dueDate.setDate(dueDate.getDate() + 7);
      break;
    case "bi-weekly":
      dueDate.setDate(dueDate.getDate() + 14);
      break;
    case "monthly":
      dueDate.setMonth(dueDate.getMonth() + 1);
      break;
    case "quarterly":
      dueDate.setMonth(dueDate.getMonth() + 3);
      break;
    case "semi-annually":
      dueDate.setMonth(dueDate.getMonth() + 6);
      break;
    case "annually":
      dueDate.setFullYear(dueDate.getFullYear() + 1);
      break;
    default:
      throw new Error(`Unknown increment type: ${frequency}`);
  }

  // Update the expense as paid by incrementing the due date
  const { error: updateError } = await supabase
    .from("recurring")
    .update({ due: dueDate })
    .eq("id", expenseId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (updateError) {
    console.error(
      "Error marking reoccuring expense as paid:",
      updateError.message
    );
    return;
  }

  // Create a new expense record for the paid reoccuring expense
  const { error: insertError } = await supabase
    .from("expenses")
    .insert({
      name,
      amount: amount ? parseFloat(amount.toString()) : null,
      date: dueDate,
      budget: budget === "NULL" ? null : budget,
      notes,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select("*");
  if (insertError) {
    console.error(
      "Error creating expense for paid reoccuring expense:",
      insertError.message
    );
  }
}

export async function deleteReoccuringExpense(formData: FormData) {
  const expenseId = formData.get("id")?.toString();
  const { error } = await supabase
    .from("recurring")
    .delete()
    .eq("id", expenseId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error("Error deleting reoccuring expense:", error.message);
  }
}
