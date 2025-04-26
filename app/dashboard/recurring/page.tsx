import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecurringExpenseForm } from "@/components/recurring-expense-form";
import { RecurringExpenseList } from "@/components/recurring-expense-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RecurringExpensesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Recurring Expenses
          </h2>
          <p className="text-muted-foreground">
            Manage your recurring bills and subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Recurring Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Recurring Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your recurring expense below.
                </DialogDescription>
              </DialogHeader>
              <RecurringExpenseForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <RecurringExpenseList filter="active" />
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <RecurringExpenseList filter="upcoming" />
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <RecurringExpenseList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
