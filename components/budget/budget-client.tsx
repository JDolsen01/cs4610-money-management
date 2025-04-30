"use client";

import { useState } from "react";
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
import { BudgetCategoryForm } from "@/components/budget/budget-category-form";
import { BudgetCategoryList } from "@/components/budget/budget-category-list";
import { createClient } from "@/utils/supabase/client";

interface BudgetsClientProps {
  initialBudgetCategories: any[];
}

export default function BudgetsClient({
  initialBudgetCategories,
}: BudgetsClientProps) {
  const [budgetCategories, setBudgetCategories] = useState(
    initialBudgetCategories
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const refreshBudgetCategories = async () => {
    const supabase = createClient();
    const { data: updatedBudgetCategories } = await supabase.rpc(
      "get_budget_totals",
      {}
    );
    setBudgetCategories(updatedBudgetCategories || []);
  };

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
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
              <BudgetCategoryForm
                onSubmit={async () => {
                  setDialogOpen(false); // Close dialog
                  await refreshBudgetCategories(); // Refresh data
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="overspent">Overspent</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <BudgetCategoryList budgetCategories={budgetCategories} />
        </TabsContent>
        <TabsContent value="overspent" className="space-y-4">
          <BudgetCategoryList
            budgetCategories={budgetCategories}
            filter="overspent"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
