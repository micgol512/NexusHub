"use client";
import FilterSide from "@/components/product/FilterSide";
import ProductFilterBar from "@/components/product/ProductFilterBar";
import CategorySlider from "@/components/sliders/CategorySlider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CategorySlider />
      <div className="flex border-t-2">
        <ScrollArea className="max-h-full w-[363px] p-10 border-r-2 ">
          <aside>
            <FilterSide />
          </aside>
        </ScrollArea>
        <main className="flex-1 flex flex-col">
          <ProductFilterBar />

          <div className="flex-1 py-6">{children}</div>
        </main>
      </div>
    </>
  );
}
