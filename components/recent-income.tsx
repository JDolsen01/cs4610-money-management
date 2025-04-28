import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  Briefcase,
  DollarSign,
  PiggyBank,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentIncomeProps {
  income: any[] | null;
}

export function RecentIncome({ income }: RecentIncomeProps) {
  if (!income) {
    return <div className="text-red-500">No recent income found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Income</CardTitle>
        <CardDescription>You've earned $5,675.50 this month.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {income.slice(0, 4).map((income) => (
          <div key={income.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">{income.source}</p>
                <p className="text-xs text-muted-foreground">{income.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">
                +${income.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/dashboard/income">
            View All Income
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
