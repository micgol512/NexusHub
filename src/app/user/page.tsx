"use client";
import SessionTimer from "@/components/shared/SessionTimer";
import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Button } from "@/components/ui/button";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className=" flex  gap-5 p-5">
      <SessionTimer />
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
      <ThemeChanger />
    </main>
  );
}
