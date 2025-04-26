import Link from "next/link";
import { DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { FormMessage, Message } from "@/components/form-message";

export default async function ForgotPasswordPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="absolute right-8 top-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
        <DollarSign className="h-6 w-6 text-emerald-600" />
        <span className="font-bold">MoneyMinder</span>
      </Link>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Reset your password
          </CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-emerald-600 hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
