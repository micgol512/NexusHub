"use client";

import BrandSlider from "@/components/sliders/BrandSlider";
import CategoryRecomendate from "@/components/sliders/CategoryRecomendate";
import CategorySlider from "@/components/sliders/CategorySlider";
import RecomendationSlider from "@/components/sliders/RecomendationSlider";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-[100px] max-w-[1920px] m-0 px-10">
      <CategorySlider />
      <CategoryRecomendate />
      <RecomendationSlider />
      <BrandSlider />
    </div>
  );
}
