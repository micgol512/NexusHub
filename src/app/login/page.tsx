import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="p-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
