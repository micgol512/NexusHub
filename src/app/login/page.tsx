import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
