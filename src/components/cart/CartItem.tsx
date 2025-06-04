import type { CartItem, Product, ProductImage } from "@/generated/prisma";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { notification } from "@/lib/notification";

export type CartItemWithProductImage = CartItem & {
  product: Product & {
    images: ProductImage[];
  };
};

export default function CartItem({
  item,
  checked,
  onToggleSelected,
  onDelete,
  onQuantityChange,
}: {
  item: CartItemWithProductImage;
  checked: boolean;
  onToggleSelected: () => void;
  onDelete: () => void;
  onQuantityChange: (newQuantity: number) => void;
}) {
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          color: item.color,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      notification("Deleted from cart", "warning");
      onDelete();
    } catch {
      notification("Some issues from deleteing.", "error");
    }
  };
  const handleIncrease = () => {
    onQuantityChange(item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className="flex border rounded-lg p-4 gap-4">
      <Checkbox checked={checked} onCheckedChange={onToggleSelected} />

      <Image
        src={item.product.images[0].url}
        alt={item.product.name}
        className="w-20 h-20 object-contain"
        width={80}
        height={80}
      />

      <div className="flex-1">
        <div className="font-medium">{item.product.name}</div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">
            ${item.product.price.toFixed(2)}
          </div>
          {"Color: "}
          <div
            style={{ backgroundColor: item.color }}
            className={`border-1 border-(--foreground) rounded-full h-[24px] w-[24px]`}
          ></div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <Button variant={"icon"} onClick={handleDelete}>
          <Trash2 className="text-red-500 w-5 h-5" />
        </Button>

        <div className="flex items-center border rounded px-2 py-1 gap-2">
          <Button variant={"icon"} onClick={handleDecrease}>
            -
          </Button>
          <span>{item.quantity}</span>
          <Button variant={"icon"} onClick={handleIncrease}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
