"use client";

import { ThemeChanger } from "@/components/shared/ThemeChanger";

export default function UserPage() {
  const handleClick = async () => {
    const data = await fetch("/api/product?limit=15");
    console.log(await data.json());
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleClick}>SPRAWDZAM</button>
      <ThemeChanger />
    </div>
  );
}
