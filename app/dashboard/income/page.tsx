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
import { IncomeForm } from "@/components/income-form";
import { IncomeList } from "@/components/income-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
    .order("date", { ascending: false })
    .eq("user_id", user.id);

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
          <Dialog>
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
              <IncomeForm />
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
          <IncomeList incomeEntries={income} />
        </TabsContent>
        <TabsContent value="highest" className="space-y-4">
          <IncomeList filter="highest" incomeEntries={income} />
        </TabsContent>
        <TabsContent value="lowest" className="space-y-4">
          <IncomeList filter="lowest" incomeEntries={income} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
