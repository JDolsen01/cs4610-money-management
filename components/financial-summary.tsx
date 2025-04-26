import { ArrowDownRight, ArrowUpRight, Banknote, CreditCard } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FinancialSummary() {
  // This would normally come from a database or calculations
  const financialData = {
    totalIncome: 6425.5,
    totalExpenses: 2175.0,
    balance: 4250.5,
    savingsGoal: 2000.0,
    savingsProgress: 40,
    incomeVsExpensesRatio: 74.66, // Percentage of income remaining after expenses
    monthlyChange: 15.3, // Percentage change from last month
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${financialData.totalIncome.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-${financialData.totalExpenses.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
              <span className="text-red-600">-4.5%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
              $
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.balance.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+{financialData.monthlyChange}%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income vs Expenses</CardTitle>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              %
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialData.incomeVsExpensesRatio.toFixed(1)}%</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Expenses</span>
                <span className="text-muted-foreground">Income</span>
              </div>
              <Progress value={100 - financialData.incomeVsExpensesRatio} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
