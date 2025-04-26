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
import { BudgetCategoryForm } from "@/components/budget-category-form";
import { BudgetCategoryList } from "@/components/budget-category-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function BudgetsPage() {
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
            Budget Categories
          </h2>
          <p className="text-muted-foreground">
            Create and manage your budget categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Budget Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Budget Category</DialogTitle>
                <DialogDescription>
                  Set up a new budget category with a monthly limit.
                </DialogDescription>
              </DialogHeader>
              <BudgetCategoryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="overspent">Overspent</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <BudgetCategoryList />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <BudgetCategoryList filter="active" />
        </TabsContent>
        <TabsContent value="overspent" className="space-y-4">
          <BudgetCategoryList filter="overspent" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
