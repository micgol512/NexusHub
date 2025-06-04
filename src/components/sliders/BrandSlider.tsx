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
    return null;
  }

  return (
    // <div className="w-full flex flex-col gap-4 p-0 max-w-[1840px]">
    <div className="w-full flex flex-col justify-between items-center py-5 m-0 bg-[var(--background)] max-w-full">
      <h2 className="text-2xl font-semibold px-4 self-start">Brand</h2>
      <ScrollArea className="flex flex-row w-full py-4">
        <div className="flex flex-row gap-2.5">
          {brands.map((brand) => (
            <Link
              href={`/product?brand=${brand.name}`}
              key={`brand-slider-${brand.id}`}
              className="flex flex-col justify-center items-center gap-4 h-[190px] w-[220px] bg-(--background) border-(--border) border-1 rounded-(--radius)"
            >
              <Image
                src={brand.imageURL || "/placeholder.png"}
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
