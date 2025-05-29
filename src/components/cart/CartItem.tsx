import type { CartItem, Product, ProductImage } from "@/generated/prisma";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

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
}: {
  item: CartItemWithProductImage;
  checked: boolean;
  onToggleSelected: () => void;
  onDelete: () => void;
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
      console.log("USUNIETO z koszyka");
      onDelete();
    } catch (err) {
      console.error("Błąd przy usuwaniu z koszyka:", err);
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
          <button onClick={() => console.log("handler -1")}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => console.log("handler +1")}>+</button>
        </div>
      </div>
    </div>
  );
}
