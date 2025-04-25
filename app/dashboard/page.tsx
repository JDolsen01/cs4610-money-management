import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpIcon,
  CalendarIcon,
  CreditCard,
  DollarSign,
  Download,
  Plus,
  Users,
} from "lucide-react";
import { ExpenseTable } from "@/components/dashboard/expense-table";
import { RecurringPayments } from "@/components/dashboard/recurring-payments";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { BudgetOverview } from "@/components/dashboard/budget-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your finances and track your expenses."
      >
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Expenses
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,350.45</div>
            <div className="flex items-center pt-1">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-red-500" />
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Income
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,200.00</div>
            <div className="flex items-center pt-1">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Payments
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,325.00</div>
            <p className="text-xs text-muted-foreground">
              5 payments due this week
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Payments</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Expense Overview</CardTitle>
                <CardDescription>
                  Your expense breakdown for the past 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ExpenseChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your most recent expenses and income.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Your monthly budget progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>
                  Payments due in the next 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecurringPayments limit={5} showUpcomingOnly={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>All Expenses</CardTitle>
                <CardDescription>
                  A complete list of all your expenses.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ExpenseTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recurring" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Recurring Payments</CardTitle>
                <CardDescription>
                  Manage your recurring bills and subscriptions.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecurringPayments />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>
                  Track and manage your monthly budgets.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Budget
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <BudgetOverview showAll={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
