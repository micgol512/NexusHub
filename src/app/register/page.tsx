import { RegisterForm } from "@/components/register/RegisterForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
