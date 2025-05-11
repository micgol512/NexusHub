"use client";
import {
  Brand,
  Category,
  Color,
  Product,
  ProductImage,
} from "@/generated/prisma";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

export type FullProduct = Product & {
  category: Category;
  brand: Brand;
  images: ProductImage[];
  colors: Color[];
};

const ProductCard = ({ product }: { product: FullProduct }) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Card
      className="w-[300px] h-[400px] m-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105"
      onClick={() => handleClick(product.id.toString())}
      //   style={{
      //     backgroundColor: product.colors[0]?.hash || undefined,
      //   }}
    >
      <CardTitle>
        {product.name} ({product.brand.name})
        {product.discountPrice && `(${product.discountPrice})`}
      </CardTitle>
      <CardContent>
        {product.description}
        {`Default Color: ${product.colors[0]?.name} / ${product.colors[0]?.hash}`}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
