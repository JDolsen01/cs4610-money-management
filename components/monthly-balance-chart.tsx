"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MonthlyBalanceChart() {
  // This would normally come from a database
  const data = [
    {
      name: "Jan",
      income: 5200,
      expenses: 3800,
      balance: 1400,
    },
    {
      name: "Feb",
      income: 5300,
      expenses: 4100,
      balance: 1200,
    },
    {
      name: "Mar",
      income: 5800,
      expenses: 4300,
      balance: 1500,
    },
    {
      name: "Apr",
      income: 6425.5,
      expenses: 2175,
      balance: 4250.5,
    },
    {
      name: "May",
      income: 0,
      expenses: 0,
      balance: 0,
    },
    {
      name: "Jun",
      income: 0,
      expenses: 0,
      balance: 0,
    },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly Balance</CardTitle>
        <CardDescription>Your income vs expenses over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="balance" name="Balance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
