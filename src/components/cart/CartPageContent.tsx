"use client";

import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import type { CartItem as PrismaCartItem, Product } from "@/generated/prisma";

// Rozszerzony typ produktu, jeśli trzymasz obrazki jako tablicę stringów
type ExtendedProduct = Product & {
  imageURLs: string[];
};

type CartItemType = PrismaCartItem & {
  product: ExtendedProduct;
};

export default function CartPageContent() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setItems(data.cart?.items || []);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleDelete = async (productId: number) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }
  };

  const handleQuantityChange = async (
    productId: number,
    quantity: number
  ): Promise<void> => {
    if (quantity < 1) return;

    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
    0
  );

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" disabled /> Select All
        </div>

        {items.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              name: item.product.name,
              category: "", // dodaj, jeśli masz relację z kategorią
              price: item.product.price,
              imageUrl: item.product.imageURLs?.[0] || "/fallback.png",
              quantity: item.quantity,
              checked: true,
            }}
            onToggle={() => {}}
            onQuantityChange={(q: number) =>
              handleQuantityChange(item.product.id, q)
            }
            onDelete={() => handleDelete(item.product.id)}
          />
        ))}
      </div>

      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}
