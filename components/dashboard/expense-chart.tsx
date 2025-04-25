"use client";

import { useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export function ExpenseChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Sample data for the chart
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [
          1800, 2200, 1900, 2350, 2100, 2400, 2300, 2500, 2200, 2100, 2300,
          2400,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Income",
        data: [
          3500, 3500, 3500, 4200, 3500, 3500, 3500, 3500, 4200, 3500, 3500,
          4200,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                align: "end",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value.toLocaleString(),
                },
              },
            },
          },
        });
      }
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-[350px]">
      <div className="mb-4 flex items-center justify-between">
        <Tabs defaultValue="line" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select defaultValue="year">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
