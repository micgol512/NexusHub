"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = async () => {
    const data = await fetch("/api/check");
    console.log(await data.json());
  };
  return (
    <div>
      <Button variant={"ghost"} onClick={handleClick}>
        SPRAWDZAM
      </Button>
    </div>
  );
}
