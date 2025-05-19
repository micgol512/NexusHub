"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionTimer() {
  const { data: session, status } = useSession();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!session || !session.expires) return;

    const expirationTime = new Date(session.expires).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((expirationTime - now) / 1000);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        signOut({ callbackUrl: "/" });
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") return <p>Checking...</p>;
  if (status === "unauthenticated") return <p>User unauthenticated.</p>;

  return (
    <div className="text-sm text-(--foreground)">
      {timeLeft !== null ? (
        <p>
          Logged as: <strong>{session?.user?.email ?? "NONE"}</strong>
          <br />
          Name: {session?.user.name ?? "NONE"}
          <br />
          Auto Logout for:{" "}
          <strong>
            {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </strong>
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
