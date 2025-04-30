import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ExpensesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: budgetCategories } = await supabase
    .from("budgets")
    .select("id, name")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, budget(name, color)")
    .order("date", { ascending: false })
    .eq("user_id", user.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Manage and track your expenses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
                </DialogDescription>
              </DialogHeader>
              <ExpenseForm budgets={budgetCategories} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="highest">Highest</TabsTrigger>
            <TabsTrigger value="lowest">Lowest</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <ExpenseList
              filter="recent"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
          <TabsContent value="highest" className="space-y-4">
            <ExpenseList
              filter="highest"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
          <TabsContent value="lowest" className="space-y-4">
            <ExpenseList
              filter="lowest"
              expenses={expenses}
              budgets={budgetCategories}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
