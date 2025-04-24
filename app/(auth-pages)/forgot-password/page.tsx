import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";
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

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <DollarSign className="h-8 w-8 text-emerald-500" />
        <span>MoneyTrack</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <SubmitButton
              className="w-full bg-emerald-500 hover:bg-emerald-600"
              formAction={forgotPasswordAction}
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium"
            >
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/" className="hover:underline underline-offset-4">
          Back to home
        </Link>
        <span className="mx-2">•</span>
        <Link href="/privacy" className="hover:underline underline-offset-4">
          Privacy Policy
        </Link>
        <span className="mx-2">•</span>
        <Link href="/terms" className="hover:underline underline-offset-4">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
