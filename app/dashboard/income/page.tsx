import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import IncomeClient from "@/components/income/income-client";

export default async function IncomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: income } = await supabase
    .from("income")
    .select("*")
    .order("date", { ascending: false });

  return <IncomeClient initialIncome={income || []} />;
}
