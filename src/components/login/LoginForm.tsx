"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Logo } from "../shared/Logo";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  contact: z
    .string()
    .min(1, "Please enter a valid email address or phone number."),
  password: z.string().min(1, "Please enter your password."),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [formError, setFormError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("database-login", {
      redirect: false,
      contact: data.contact,
      password: data.password,
      callbackUrl,
    });

    if (res?.error) {
      setFormError("Invalid login credentials.");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-muted px-4">
      <Logo />
      <Card className="w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Sign in</h2>
        <Separator className="my-4" />

        {formError && (
          <p className="text-sm text-center text-destructive">{formError}</p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or mobile phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email or Mobile phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        variant="icon"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={savePassword}
                  onCheckedChange={(val) => setSavePassword(!!val)}
                />
                Save password
              </label>
              <Link href="#" className="text-muted-foreground hover:underline">
                Forgot your password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Or, continue with
        </div>

        <div className="flex justify-center gap-3 mt-2">
          <Button
            onClick={() => signIn("github", { callbackUrl })}
            variant={"outline"}
            className="p-2"
          >
            <Image
              src="/icons/github-icon.svg"
              alt="GitHub"
              width={24}
              height={24}
            />
          </Button>
          <Button
            onClick={() => signIn("google", { callbackUrl })}
            variant={"outline"}
            className="p-2"
          >
            <Image
              src="/icons/google-icon.svg"
              alt="Google"
              width={24}
              height={24}
            />
          </Button>
          <Button
            onClick={() => signIn("facebook", { callbackUrl })}
            variant={"outline"}
            className="p-2"
          >
            <Image
              src="/icons/facebook-icon.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </Button>
          <Button
            onClick={() => signIn("apple", { callbackUrl })}
            variant={"outline"}
            className="p-2"
          >
            <Image
              src="/icons/apple-icon.svg"
              alt="Apple"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </Card>
    </div>
  );
}
