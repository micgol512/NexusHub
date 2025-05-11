"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Logo } from "../shared/Logo";

const FormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    mobileNumber: z
      .string()
      .regex(/^\+\d{10,15}$/, "Please enter your phone number."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must include 1 upper case letter.")
      .regex(/[a-z]/, "Must include 1 lower case letter.")
      .regex(/[0-9]/, "Must include 1 number."),
    confirmPassword: z.string(),
    countryRegion: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and privacy notice.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password is different.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof FormSchema>;

export function RegisterForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      countryRegion: "Poland",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormValues) => {
    setErrorMessage("");
    setSuccessMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setErrorMessage(result.error || "Something went wrong.");
    } else {
      setSuccessMessage("Account created successfully!");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center bg-(--background)">
      <Logo />
      <Card className="w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Create Account</h2>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+48123456789" type="tel" {...field} />
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="icon"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-[12px] h-full"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="icon"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-[12px] h-full"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Poland">Poland</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-[24px] w-[24px]"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal leading-5 ">
                      By creating an account, you agree to the
                      <Link href="/deletion" className="underline text-primary">
                        Conditions of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline text-primary">
                        Privacy Notice
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-sm text-(--error)">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-sm text-(--success)">{successMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
