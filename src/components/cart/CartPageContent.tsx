"use client";

import { useEffect, useState } from "react";
import CartItem, { CartItemWithProductImage } from "./CartItem";
import CartSummary from "./CartSummary";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
// import { useRouter } from "next/navigation";

export default function CartPageContent() {
  const [items, setItems] = useState<CartItemWithProductImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        const fetchedItems = data.cart?.items || [];
        setItems(fetchedItems);

        const initiallySelected = fetchedItems
          .filter((item: CartItemWithProductImage) => item.selected)
          .map((item: CartItemWithProductImage) => item.product.id);

        setSelectedIds(initiallySelected);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleToggleSelected = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.product.id));
    }
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      console.log("Cart:", await res.json());
    } else {
      alert("Failed to checkout.");
    }
  };

  const totalItems = items.reduce(
    (sum, i) => (selectedIds.includes(i.product.id) ? sum + i.quantity : sum),
    0
  );

  const totalPrice = items.reduce(
    (sum, i) =>
      selectedIds.includes(i.product.id)
        ? sum + i.quantity * i.product.price
        : sum,
    0
  );

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Checkbox
            id="check_all"
            checked={selectedIds.length === items.length}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="check_all">Select All</Label>
        </div>

        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            checked={selectedIds.includes(item.product.id)}
            onToggleSelected={() => handleToggleSelected(item.product.id)}
          />
        ))}
      </div>

      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
