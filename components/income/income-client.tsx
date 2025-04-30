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
import { IncomeForm } from "@/components/income/income-form";
import { IncomeList } from "@/components/income/income-list";
import { createClient } from "@/utils/supabase/client";

interface IncomeClientProps {
  initialIncome: any[];
}

export default function IncomeClient({ initialIncome }: IncomeClientProps) {
  const [incomeEntries, setIncomeEntries] = useState(initialIncome); // State for income entries
  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog

  const refreshIncome = async () => {
    const supabase = createClient();
    const { data: updatedIncome } = await supabase
      .from("income")
      .select("*")
      .order("date", { ascending: false });
    setIncomeEntries(updatedIncome || []);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Income</h2>
          <p className="text-muted-foreground">
            Track and manage your income sources.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
                <DialogDescription>
                  Enter the details of your income below.
                </DialogDescription>
              </DialogHeader>
              <IncomeForm
                onSubmit={async () => {
                  setDialogOpen(false); // Close dialog
                  await refreshIncome(); // Refresh income list
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Income</TabsTrigger>
          <TabsTrigger value="highest">Highest</TabsTrigger>
          <TabsTrigger value="lowest">Lowest</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <IncomeList incomeEntries={incomeEntries} />
        </TabsContent>
        <TabsContent value="highest" className="space-y-4">
          <IncomeList filter="highest" incomeEntries={incomeEntries} />
        </TabsContent>
        <TabsContent value="lowest" className="space-y-4">
          <IncomeList filter="lowest" incomeEntries={incomeEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
