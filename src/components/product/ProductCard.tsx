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
import { Star } from "lucide-react";

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

  return (
    <Card
      className=" relative w-[300px] h-[400px] m-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105"
      onClick={() => handleClick(product.id.toString())}
      //   style={{
      //     backgroundColor: product.colors[0]?.hash || undefined,
      //   }}
    >
      {/* <CardTitle>
        {product.name} ({product.brand.name})
        {product.discountPrice && `(${product.discountPrice})`}
      </CardTitle> */}
      <CardContent className="flex flex-col gap-[18px]">
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
        <div>
          <Star color="var(--primary)" fill="var(--primary)" />{" "}
          <p>{product.rating.fiveStar}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
