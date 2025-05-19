"use client";
import SessionTimer from "@/components/shared/SessionTimer";
import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Button } from "@/components/ui/button";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
      <div className="flex justify-center gap-3 mt-2">
        <Image
          src="/icons/github-icon.svg"
          alt="GitHub"
          width={24}
          height={24}
        />

        <Image
          src="/icons/google-icon.svg"
          alt="Google"
          width={24}
          height={24}
        />

        <Image
          src="/icons/facebook-icon.svg"
          alt="Facebook"
          width={24}
          height={24}
        />

        <Image src="/icons/apple-icon.svg" alt="Apple" width={24} height={24} />
      </div>
    </main>
  );
}
