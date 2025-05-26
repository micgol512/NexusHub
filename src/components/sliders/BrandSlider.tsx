import React from "react";

import { useEffect, useState } from "react";
import { Brand } from "@/generated/prisma";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

export const BrandSlider = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch(`/api/brand`);
      const { brands } = await res.json();
      setBrands(brands);
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) {
    return;
  }

  return (
    <div className="w-full flex flex-col gap-4 p-0 bg-amber-700">
      <h2 className="text-2xl font-semibold px-4">Brand</h2>
      <ScrollArea className="flex flex-row w-full py-4 bg-amber-300">
        <div className="flex flex-row gap-2.5">
          {brands.map((brand, index) => (
            <Link
              href={`/product?brand=${brand.name}`}
              key={`brand-slider-${index}`}
              className="flex flex-col justify-center items-center gap-4 h-[190px] w-[220px] bg-(--background) border-(--border) border-1 rounded-(--radius)"
            >
              <Image
                src={brand.imageURL ?? "placeholder"}
                alt={brand.name}
                width={100}
                height={100}
                className="h-[46px] w-min"
              />
              {brand?.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default BrandSlider;
