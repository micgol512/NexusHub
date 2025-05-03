"use client";

import CategorySlider from "@/components/sliders/CategorySlider";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const handleClick = async () => {
    const data = await fetch("/api/check");
    console.log(await data.json());
  };
  return (
    <div className="flex flex-col w-full h-full max-w-[1920px] bg-green-500">
      <CategorySlider />
      <Button variant={"default"} className="max-w-sm" onClick={handleClick}>
        SPRAWDZAM
      </Button>
    </div>
  );
}
