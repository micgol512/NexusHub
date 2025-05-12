import { Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    category?: string;
    price: number;
    imageUrl: string;
    quantity: number;
    checked: boolean;
  };
  onToggle: () => void;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

export default function CartItem({
  item,
  onToggle,
  onQuantityChange,
  onDelete,
}: CartItemProps) {
  return (
    <div className="flex border rounded-lg p-4 gap-4">
      <input type="checkbox" checked={item.checked} onChange={onToggle} />

      <Image
        src={item.imageUrl || "/fallback.png"}
        alt={item.name}
        className="w-20 h-20 object-contain"
        width={80}
        height={80}
      />

      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        {item.category && (
          <div className="text-xs inline-block bg-orange-100 text-orange-600 px-2 py-1 rounded mt-1">
            {item.category}
          </div>
        )}
        <div className="text-lg font-semibold mt-2">
          ${item.price.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button onClick={onDelete}>
          <Trash2 className="text-red-500 w-5 h-5" />
        </button>

        <div className="flex items-center border rounded px-2 py-1 gap-2">
          <button
            onClick={() => onQuantityChange(Math.max(item.quantity - 1, 1))}
          >
            –
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.quantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}
