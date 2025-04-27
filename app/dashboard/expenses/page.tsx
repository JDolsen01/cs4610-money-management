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
        <Card>
          <CardHeader>
            <CardTitle>Filter Expenses</CardTitle>
            <CardDescription>
              Narrow down your expenses by date, category, or amount.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date Range</Label>
                <Select defaultValue="this-month">
                  <SelectTrigger id="date">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount Range</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="min-amount"
                    type="number"
                    placeholder="Min"
                    className="w-full"
                  />
                  <span>to</span>
                  <Input
                    id="max-amount"
                    type="number"
                    placeholder="Max"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
