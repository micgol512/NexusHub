"use client";
import {
  Brand,
  Category,
  Color,
  Product,
  ProductImage,
  RatingCount,
} from "@/generated/prisma";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";

export type FullProduct = Product & {
  category: Category;
  brand: Brand;
  images: ProductImage[];
  colors: Color[];
  rating: RatingCount;
};

const ProductCard = ({ product }: { product: FullProduct }) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/product/${id}`);
  };
  const handleAddToCart = async (productId: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity: 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add to Cart");
      }

      console.log("Add to cart!");
    } catch (error) {
      console.error("Error with adding to cart:", error);
    }
  };

  return (
    <Card
      className="w-[300px] h-[532px] m-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105"
      onClick={() => handleClick(product.id.toString())}
      //   style={{
      //     backgroundColor: product.colors[0]?.hash || undefined,
      //   }}
    >
      {/* <CardTitle>
        {product.name} ({product.brand.name})
        {product.discountPrice && `(${product.discountPrice})`}
      </CardTitle> */}
      <CardContent className="relative flex flex-col gap-[18px]">
        <Image
          src={`${product.images[0].url}`}
          width={100}
          height={100}
          alt={product.name}
          className="max-h-[204px] bg-(--muted) rounded-(--radius) self-center"
        />
        <div className="w-min bg-(--category-bg) text-(--category-fg) px-[10px] py-[4px] rounded-(--radius)">
          {product.category.name}
        </div>

        <p>{product.name}</p>
        <div className="flex items-center gap-[10px]">
          <strong className="text-[600] text-[28px]">
            {"$ "}
            {product.discountPrice ?? product.price}
          </strong>
          <p className={cn(product.discountPrice ? "line-through" : "")}>
            {"$ "}
            {product.price}
          </p>
        </div>
        <div className="flex flex-row ">
          <Star color="var(--primary)" fill="var(--primary)" />{" "}
          <p>
            {product.rating?.fiveStar ? "Są oceny i obliczenia" : "(5)"}
            {"/5.0"}
          </p>
          <Separator orientation="vertical" className="my-2" />
          <p>
            {product.sold}
            {" sold"}
          </p>
        </div>
        <div>ProgresBar</div>
        <div>info sztuk sprzedanych z ilości</div>
        <Button
          variant={"ghost"}
          className="absolute left-[10px] top-[10px]"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id);
          }}
        >
          <ShoppingCart size={48} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
