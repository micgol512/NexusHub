"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShieldCheckIcon, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { FullProduct } from "./ProductCard";
import Image from "next/image";
import Link from "next/link";
import { notification } from "@/lib/notification";

type ProductDetailsProps = {
  product: FullProduct;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [mainImage, setMainImage] = useState(
    product.images[0].url || "/placeholder.png"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.hash ?? "#000000"
  );
  const [quantity, setQuantity] = useState(1);

  const subtotal = (product.price * quantity).toFixed(2);

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        selectedColor,
        quantity,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return notification(`Error: ${error.error}`, "error");
    }

    const data = await res.json();
    notification(`Dodano do koszyka: ${data}`, "success");
  };

  const handleSetImage = (url: string) => {
    setMainImage(url);
  };

  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-row gap-10 w-2/3">
        <div className="flex flex-col gap-2">
          <Card className="flex justify-center items-center w-[250px] h-[250px] p-10">
            <CardContent className="relative flex justify-center items-center w-[200px] h-[200px]">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="bg-(--border) rounded-(--radius) object-contain p-4"
              />
            </CardContent>
          </Card>

          <div className="flex gap-2 w-full">
            {product.images.map((img, index) => (
              <Card
                key={`image-product-${index}`}
                className="w-20 h-20 p-0 m-0 overflow-hidden pointer hover:scale-105"
                onClick={() => handleSetImage(img.url)}
              >
                <CardContent className="p-2 flex items-center justify-center">
                  <Image
                    src={img.url}
                    alt={`Image ${index}`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 flex gap-2 items-center">
            <Badge variant="secondary">{product.category.name}</Badge>
            <Badge>{product.brand.name}</Badge>
          </div>
          <p className="text-2xl font-semibold mt-4">${product.price}</p>
          <p className="text-muted-foreground mt-2 max-w-xl">
            {product.description}
          </p>
          <Link href="#" className="underline text-primary inline">
            View More
          </Link>

          <div className="mt-6">
            <h3 className="text-md font-semibold">Shipping</h3>
            <Card className="mt-2">
              <CardContent className="p-3">
                <div className="flex flex-row font-medium mb-1">
                  <ShieldCheckIcon className="text-(--success)" />
                  <h4>NexusHub Courier</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery:{" "}
                  {new Date(
                    Date.now() + 10 * 24 * 60 * 60 * 1000
                  ).toDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color.hash)}
                    className={`w-8 h-8 rounded-(--radius) border ${
                      selectedColor === color.hash
                        ? "ring-2  ring-(--primary)"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hash }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <div className="border rounded flex items-center overflow-hidden">
                  <Button
                    variant={"icon"}
                    className="px-2 py-1"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-4 py-1">{quantity}</span>
                  <Button
                    variant={"icon"}
                    className="px-2 py-1"
                    onClick={() =>
                      setQuantity((q) => Math.min(q + 1, product.stock))
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </span>
              </div>
            </div>

            <Separator />

            <div className="text-lg font-semibold">
              Subtotal: <span>${subtotal}</span>
            </div>

            <Button onClick={handleAddToCart} className="w-full ">
              Add to cart
              <ShoppingCart size={16} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
