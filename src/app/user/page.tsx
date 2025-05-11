"use client";

import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function UserPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={() => signOut()}>Logout</Button>
      <ThemeChanger />
    </div>
  );
}
