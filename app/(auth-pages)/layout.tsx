import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MoneyTrack - Expense Tracking App",
  description:
    "Track expenses, manage recurring payments, and gain insights into your spending habits.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
