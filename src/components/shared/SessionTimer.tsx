"use client";

import { useSession } from "next-auth/react";
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
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") return <p>Sprawdzanie sesji...</p>;
  if (status === "unauthenticated") return <p>Użytkownik niezalogowany.</p>;

  return (
    <div className="text-sm text-(--foreground)">
      {timeLeft !== null ? (
        <p>
          Zalogowano jako: <strong>{session?.user.email}</strong>
          <br />
          Sesja wygaśnie za:{" "}
          <strong>
            {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </strong>
        </p>
      ) : (
        <p>Obliczanie czasu sesji...</p>
      )}
    </div>
  );
}
