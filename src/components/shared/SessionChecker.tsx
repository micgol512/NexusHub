"use client";

import { notification } from "@/lib/notification";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionChecker() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.expires) return;

    const expirationTime = new Date(session.expires).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((expirationTime - now) / 1000);

      if (diff <= 0) {
        clearInterval(interval);

        notification("Logged out.", "warning");
        signOut({ callbackUrl: "/" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return null;
}
