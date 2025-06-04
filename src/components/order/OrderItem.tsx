"use client";

import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CartItemWithProductImage } from "../cart/CartItem";

const OrderItem = ({
  item,
  onQuantityChange,
}: {
  item: CartItemWithProductImage;
  onQuantityChange: (id: number, newQuantity: number) => void;
}) => {
  const handleDecrease = () => {
    const newQty = Math.max(1, item.quantity - 1);
    onQuantityChange(item.id, newQty);
  };

  const handleIncrease = () => {
    const newQty = Math.min(item.quantity + 1, item.product.stock);
    onQuantityChange(item.id, newQty);
  };

  return (
    <div key={item.id} className="flex gap-4 p-4 border rounded-xl">
      <Image
        src={item.product.images[0].url}
        alt={item.product.name}
        width={80}
        height={80}
        className="rounded-md"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="font-medium">{item.product.name}</p>
            <div
              style={{ backgroundColor: item.color }}
              className={`border border-foreground rounded-full h-[24px] w-[24px]`}
            />
          </div>
          <p className="text-sm font-semibold">${item.product.price}</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <Textarea placeholder="Write Note" className="w-full max-w-sm" />
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDecrease}>
              -
            </Button>
            <span>{item.quantity}</span>
            <Button variant="outline" onClick={handleIncrease}>
              +
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Checkbox id={`protection-${item.product.id}`} />
          <Label htmlFor={`protection-${item.product.id}`}>
            Product Protection
          </Label>
          <span className="text-xs text-gray-500">$1</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
