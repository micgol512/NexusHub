"use client";

import CategorySlider from "@/components/sliders/CategorySlider";
import RecomendationSlider from "@/components/sliders/RecomendationSlider";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-full gap-[100px] max-w-[1920px]">
      <CategorySlider />
      <RecomendationSlider />
    </div>
  );
}
