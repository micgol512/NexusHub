import React from "react";
import ProductCard, { FullProduct } from "./ProductCard";

const ProductList = ({ products }: { products: FullProduct[] }) => {
  return (
    <div className=" flex flex-row flex-wrap gap-4">
      {/* <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4"> */}
      {products?.map((product: FullProduct) => (
        <ProductCard key={`card-${product.id}`} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
