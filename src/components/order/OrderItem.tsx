import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CartItemWithProductImage } from "../cart/CartItem";

const OrderItem = ({ item }: { item: CartItemWithProductImage }) => {
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
          <div>
            <p className="font-medium">{item.product.name}</p>
          </div>
          <p className="text-sm font-semibold">${item.product.price}</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <Textarea placeholder="Write Note" className="w-full max-w-sm" />
          <div className="flex items-center gap-2">
            <Button variant="outline">-</Button>
            <span>{item.quantity}</span>
            <Button variant="outline">+</Button>
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
