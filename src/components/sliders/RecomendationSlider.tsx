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
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin h-10 w-10 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between items-center py-5 m-0 bg-[var(--background)] max-w-full">
      <h2 className="text-2xl font-semibold px-4">Recomendation</h2>
      <ScrollArea className="flex flex-row w-full py-4">
        <div className="flex flex-row">
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
