import { RegisterForm } from "@/components/register/RegisterForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="p-5">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
