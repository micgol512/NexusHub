import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItemWithProductImage } from "../cart/CartItem";
import { useRouter } from "next/navigation";
import { notification } from "@/lib/notification";

export const OrderSummary = ({
  cartItems,
}: {
  cartItems: CartItemWithProductImage[];
}) => {
  const totalProductPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const productProtectionPrice = 1;
  const shippingPrice = 5;
  const insurance = 6;
  const serviceFee = 0.5;
  const total =
    totalProductPrice +
    productProtectionPrice +
    shippingPrice +
    insurance +
    serviceFee;
  const router = useRouter();

  const handlePayNow = async () => {
    try {
      await Promise.all(
        cartItems.map((item) =>
          fetch("/api/cart", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartItem: item.id,
              productId: item.productId,
              quantity: item.quantity,
              selected: true,
            }),
          })
        )
      );
      const req = await fetch("/api/order", { method: "POST" });
      if (req.ok) {
        notification("Succesfull create order.", "success");
        router.push("/order/success");
      } else {
        notification("Something went wrong...", "error");
      }
    } catch {
      notification("Error during order.", "error");
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between">
            <p className="font-medium">Apply Coupon</p>
            <Button variant="outline">Enter Code</Button>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Total Product Price (10 item)</span>
              <span>${totalProductPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Product Protection</span>
              <span>${productProtectionPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Shipping Price</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Insurance</span>
              <span>${insurance}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fees</span>
              <span>${serviceFee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Grand total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full mt-4" onClick={handlePayNow}>
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
