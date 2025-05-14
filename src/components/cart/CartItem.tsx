import type { CartItem, Product, ProductImage } from "@/generated/prisma";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

export type CartItemWithProductImage = CartItem & {
  product: Product & {
    images: ProductImage[];
  };
};

export default function CartItem({ item }: { item: CartItemWithProductImage }) {
  const [isSelected, setIsSelected] = useState(item.selected);

  const toggleSelected = async (
    productId: number,
    currentSelected: boolean
  ) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          selected: !currentSelected,
        }),
      });

      if (!res.ok) throw new Error("Failed to update selection");
      setIsSelected(!isSelected);
    } catch (err) {
      console.error("Error updating selection:", err);
    }
  };

  return (
    <div className="flex border rounded-lg p-4 gap-4">
      <Checkbox
        checked={isSelected}
        onClick={() => toggleSelected(item.product.id, item.selected)}
      />

      <Image
        src={item.product.images[0].url}
        alt={item.product.name}
        className="w-20 h-20 object-contain"
        width={80}
        height={80}
      />

      <div className="flex-1">
        <div className="font-medium">{item.product.name}</div>
        <div className="text-lg font-semibold mt-2">
          ${item.product.price.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={() => {
            console.log("handler Usówania");
          }}
        >
          <Trash2 className="text-red-500 w-5 h-5" />
        </button>

        <div className="flex items-center border rounded px-2 py-1 gap-2">
          <button
            onClick={() => {
              console.log("handler zmiany -1");
            }}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              console.log("handler zmiany +1");
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
