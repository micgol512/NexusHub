"use client";

import { useEffect, useState } from "react";
import CartItem, { CartItemWithProductImage } from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPageContent() {
  const [items, setItems] = useState<CartItemWithProductImage[]>([]);
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
  //REWORK reduce where selected === true
  const totalItems = items.reduce(
    (sum, i) => (i.selected ? sum + i.quantity : sum),
    0
  );

  const totalPrice = items.reduce(
    (sum, i) => (i.selected ? sum + i.quantity * i.product.price : sum),
    0
  );

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" /> Select All
        </div>

        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}
