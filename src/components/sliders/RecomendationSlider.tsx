"use client";

import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import ProductCard, { FullProduct } from "../product/ProductCard";

export const RecomendationSlider = () => {
  const [products, setProducts] = useState<FullProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const res = await fetch("/api/recomendation");
        if (!res.ok) throw new Error("Failed to fetch recomendations");
        const data = await res.json();
        setProducts(data.items);
      } catch (error) {
        console.error("Error fetching recomendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-10 w-10 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4 px-4">Recomendation</h2>
      <ScrollArea className="w-full whitespace-nowrap px-4">
        <div className="flex flex-row w-max space-x gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default RecomendationSlider;
