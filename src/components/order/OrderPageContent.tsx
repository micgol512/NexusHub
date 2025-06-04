"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/generated/prisma";
import { CartItemWithProductImage } from "../cart/CartItem";
import OrderSummary from "./OrderSummary";
import OrderItem from "./OrderItem";
import Image from "next/image";
import { ShieldCheckIcon } from "lucide-react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItemWithProductImage[]>([]);

  // const [address, setAddress] = useState<Address>();

  // const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      const items: CartItemWithProductImage[] = data.cart.items || [];
      setCartItems(items.filter((item: CartItem) => item.selected === true));
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Order</h2>
          {cartItems.map((item) => (
            <OrderItem
              key={`order-item-${item.id}`}
              item={item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border p-4 rounded-xl">
            <span className="flex gap-2">
              <ShieldCheckIcon color={`var(--success)`} />
              NexusHub Courier
            </span>
            <Button variant="link">Change Shipping</Button>
          </div>
          <div className="flex justify-between items-center border p-4 rounded-xl">
            <span className="flex gap-2">
              <Image
                src="/icons/apple-icon.svg"
                alt="Apple"
                width={24}
                height={24}
              />
              Apple Pay
            </span>
            <Button variant="link">Change Payment Method</Button>
          </div>
        </div>
      </div>
      <OrderSummary cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;
