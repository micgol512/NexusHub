"use client";

import { useEffect, useState } from "react";
import CartItem, { CartItemWithProductImage } from "./CartItem";
import CartSummary from "./CartSummary";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function CartPageContent() {
  const [items, setItems] = useState<CartItemWithProductImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    try {
      const res = await Promise.all(
        items.map((item) =>
          fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: item.product.id,
              selected: selectedIds.includes(item.product.id),
            }),
          })
        )
      );

      if (res.every((r) => r.ok)) {
        router.push("/order");
      } else {
        alert("Some issues with update cart...");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error during checkout.");
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
  if (items.length === 0)
    return (
      <div>
        {" Cart empty. Go to "}
        <Link
          href={"/product"}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "p-0 m-0"
          )}
        >
          Products Page
        </Link>
        {" to add something."}
      </div>
    );
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
