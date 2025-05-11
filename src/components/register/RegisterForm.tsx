"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Logo } from "../shared/Logo";
import Link from "next/link";

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
    countryRegion: z.string().default("Poland").optional(),
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      countryRegion: "Poland",
    },
  });

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
    <div className="flex flex-col justify-start items-center min-h-screen bg-muted px-4">
      <Logo />
      <Card className="w-full max-w-md p-[24px]">
        <h2 className="text-xl font-semibold">Create Account</h2>
        <Separator />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full p-2 border rounded-(--radius) mt-1 ${
                  errors.email ? "border-(--error)" : "border-(--border)"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-(--error)">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Mobile Number</Label>
              <Input
                type="tel"
                placeholder="+(County code) 10 digital number"
                {...register("mobileNumber")}
                className={`w-full p-2 border rounded-(--radius) mt-1 ${
                  errors.mobileNumber ? "border-(--error)" : "border-(--border)"
                }`}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-(--error)">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password")}
                className={`w-full p-2 border rounded-(--radius) mt-1 ${
                  errors.password ? "border-(--error)" : "border-(--border)"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-(--error)">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                {...register("confirmPassword")}
                className={`w-full p-2 border rounded mt-1 ${
                  errors.confirmPassword
                    ? "border-(--error)"
                    : "border-(--border)"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-(--error)">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Country</Label>
              <Select
                defaultValue="Poland"
                onValueChange={(val) => (watch().countryRegion = val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Poland">Poland</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full justify-center items-center gap-2">
              <Checkbox
                id="terms"
                {...register("terms")}
                className="w-[24px] h-[24px]"
              />
              <Label htmlFor="terms" className="w-full flex flex-wrap">
                By creating an account, you agree to the{" "}
                <Link
                  href="/deletion"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "p-0 m-0 space-y-0 space-x-0 text-(--primary) underline"
                  )}
                >
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/deletion"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "p-0 m-0 space-y-0 space-x-0 text-(--primary) underline"
                  )}
                >
                  Privacy Notice
                </Link>
                .
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-(--error)">{errors.terms.message}</p>
            )}

            {errorMessage && (
              <p className="text-sm text-(--error)">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-sm text-(--success)">{successMessage}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
