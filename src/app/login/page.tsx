'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { Lock, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { signIn } from "@/lib/auth-client";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inputShell =
  "h-11 rounded-md border-transparent bg-[#f7f9fa] px-3 has-[[data-slot=input-group-control]:focus-visible]:border-cyan-500 has-[[data-slot=input-group-control]:focus-visible]:ring-cyan-500/20 dark:bg-input/30";

const inputControl =
  "h-full px-2 text-sm text-neutral-900 placeholder:text-muted-foreground";

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.09A11.99 11.99 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29a7.21 7.21 0 0 1 0-4.58V6.62H1.26a12.01 12.01 0 0 0 0 10.76l4.01-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.26 6.62l4.01 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
    />
  </svg>
);

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (data) {
        toast.success("Welcome back! Login successful.");
        router.push("/");
        router.refresh();
      }

      if (error) {
        toast.error(error.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f4f7f8] px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-md">
        {/* Page heading */}
        <div className="text-center">
          <h1
            className={`${cormorant.className} text-[34px] leading-tight font-semibold tracking-tight text-neutral-900 sm:text-[40px]`}
          >
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
            Resume your adventure with Wanderlust
          </p>
        </div>

        {/* Form card */}
        <Card className="mt-7 gap-0 rounded-lg border border-border/80 bg-white py-0 shadow-sm ring-0 sm:mt-8">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleLogin}>
              <FieldGroup className="gap-4 sm:gap-5">
                {/* Email Address */}
                <Field className="gap-1.5">
                  <FieldLabel
                    htmlFor="email"
                    className="text-[13px] font-semibold text-neutral-800"
                  >
                    Email Address
                  </FieldLabel>
                  <InputGroup className={inputShell}>
                    <InputGroupAddon className="pl-1 text-muted-foreground">
                      <Mail className="size-4" strokeWidth={1.8} />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      className={inputControl}
                    />
                  </InputGroup>
                </Field>

                {/* Password */}
                <Field className="gap-1.5">
                  <FieldLabel
                    htmlFor="password"
                    className="text-[13px] font-semibold text-neutral-800"
                  >
                    Password
                  </FieldLabel>
                  <InputGroup className={inputShell}>
                    <InputGroupAddon className="pl-1 text-muted-foreground">
                      <Lock className="size-4" strokeWidth={1.8} />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className={inputControl}
                    />
                  </InputGroup>
                </Field>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
                    <input
                      type="checkbox"
                      name="remember"
                      className="size-4 rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-cyan-600 transition-colors hover:text-cyan-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-1 h-11 w-full rounded-md bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    Or continue with
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full gap-2.5 rounded-md border-border bg-white text-[13px] font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  <GoogleIcon className="size-4" />
                  Sign In With Google
                </Button>

                {/* Bottom link to Sign Up */}
                <p className="mt-1 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-cyan-600 transition-colors hover:text-cyan-700 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
