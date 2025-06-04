"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SuccesPage = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push("/user/transactions");
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 text-center">
      <h1 className="text-2xl font-bold">Order successful!</h1>
      <h2>Thank you for shopping!!!</h2>
      <p className="text-lg">
        {"Redirecting to your transactions in "}
        <span className="text-4xl font-mono text-green-600">{countdown}</span>
      </p>
    </div>
  );
};

export default SuccesPage;
