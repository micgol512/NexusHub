// "use client";

import { FullProduct } from "@/components/product/ProductCard";
import ProductList from "@/components/product/ProductList";
import PaginationPage from "@/components/shared/PaginationPage";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();

  for (const key in resolvedSearchParams) {
    const value = resolvedSearchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => v && params.append(key, v));
    } else if (value !== undefined) {
      params.append(key, value);
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?...`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Wystąpił błąd ładowania produktów.</div>;
  }
  const data: {
    products: FullProduct[];
    total: number;
    currentPage: number;
    totalPages: number;
  } = await res.json();
  const { products, total, currentPage, totalPages } = data;

  return (
    <section className="px-2">
      <h1 className="text-2xl font-bold mb-4">Produkty</h1>
      <p className="mb-4 text-sm text-gray-500">
        Znaleziono {total} produktów. Strona {currentPage} z {totalPages}
      </p>
      <ProductList products={products} />
      <PaginationPage totalPages={totalPages} />
    </section>
  );
}
