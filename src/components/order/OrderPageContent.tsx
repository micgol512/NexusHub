"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/generated/prisma";
import { CartItemWithProductImage } from "../cart/CartItem";
import OrderSummary from "./OrderSummary";
import OrderItem from "./OrderItem";

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

  // const handleAddressChange = (
  //   field: keyof Address,
  //   value: string | boolean
  // ) => {
  //   setAddress((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleCheckout = async () => {
  //   await fetch("/api/order", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       address,
  //       coupon,
  //       cartItems,
  //     }),
  //   });
  // Przekieruj do strony z podsumowaniem zamówienia lub sukcesu
  // };

  // const totalProductPrice = cartItems.reduce(
  //   (sum, item) => sum + item.product.price * item.quantity,
  //   0
  // );

  // const productProtection = 1;
  // const shippingPrice = 5;
  // const shippingInsurance = 6;
  // const serviceFee = 0.5;

  // const grandTotal =
  //   totalProductPrice +
  //   productProtection +
  //   shippingPrice +
  //   shippingInsurance +
  //   serviceFee;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your Order</h2>
          {cartItems.map((item) => (
            <OrderItem key={`order-item-${item.id}`} item={item} />
          ))}
        </div>

        {/* Address section */}
        {/* <div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <div className="border rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select onValueChange={(v) => handleAddressChange("country", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indonesia">Indonesia</SelectItem>
                  <SelectItem value="Poland">Poland</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Province"
                onChange={(e) =>
                  handleAddressChange("province", e.target.value)
                }
              />
              <Input
                placeholder="City"
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
              <Input
                placeholder="Postal Code"
                onChange={(e) =>
                  handleAddressChange("postalCode", e.target.value)
                }
              />
            </div>
            <Textarea
              placeholder="Input Complete Address"
              onChange={(e) =>
                handleAddressChange("fullAddress", e.target.value)
              }
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="mainAddress"
                checked={address.isMain}
                onCheckedChange={(val) =>
                  handleAddressChange("isMain", val as boolean)
                }
              />
              <Label htmlFor="mainAddress">Make it the main address</Label>
            </div>
          </div>
        </div> */}

        {/* Shipping and Payment Method */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border p-4 rounded-xl">
            <span>NexusHub Courier</span>
            <Button variant="link">Change Shipping</Button>
          </div>
          <div className="flex justify-between items-center border p-4 rounded-xl">
            <span>Apple Pay</span>
            <Button variant="link">Change Payment Method</Button>
          </div>
        </div>
      </div>
      <OrderSummary cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;
