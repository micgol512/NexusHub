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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
      <Card className="w-full max-w-md p-[24px]">
        <h2 className="text-xl font-semibold">Sign in</h2>
        <Separator />

        {formError && (
          <p className="text-sm text-center text-(--error)">{formError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium">
              Email or mobile phone number
            </label>
            <input
              id="contact"
              type="text"
              {...register("contact")}
              placeholder="Email or Mobile phone Number"
              className={`w-full p-2 border rounded mt-1 ${
                errors.contact ? "border-(--error)" : "border-gray-300"
              }`}
            />
            {errors.contact && (
              <p className="text-sm text-(--error) mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className={`w-full p-2 border rounded mt-1 pr-10 ${
                errors.password ? "border-(--error)" : "border-(--border)"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] text-gray-500"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && (
              <p className="text-sm text-(--error) mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={savePassword}
                onChange={(e) => setSavePassword(e.target.checked)}
                className="accent-orange-500"
              />
              <span>Save password</span>
            </label>
            <a href="#" className="text-gray-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-(--primary) hover:underline">
            Register
          </a>
        </p>

        <div className="text-center text-sm text-gray-500">
          Or, continue with
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="bg-white p-2 border rounded shadow hover:bg-gray-100"
          >
            <Image
              src="/github-icon.svg"
              alt="Github"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="bg-white p-2 border rounded shadow hover:bg-gray-100"
          >
            <Image
              src="/google-icon.svg"
              alt="Google"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => signIn("facebook", { callbackUrl })}
            className="bg-white p-2 border rounded shadow hover:bg-gray-100"
          >
            <Image
              src="/facebook-icon.svg"
              alt="Facebook"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => signIn("apple", { callbackUrl })}
            className="bg-white p-2 border rounded shadow hover:bg-gray-100"
          >
            <Image
              src="/apple-icon.svg"
              alt="Apple"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </button>
        </div>
      </Card>
    </div>
  );
}
