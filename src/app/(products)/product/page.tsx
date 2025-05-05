// "use client";

import ProductCard, { FullProduct } from "@/components/product/ProductCard";
import PaginationPage from "@/components/shared/PaginationPage";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function ProductPage({ searchParams }: Props) {
  const params = new URLSearchParams();

  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => v && params.append(key, v));
    } else if (value !== undefined) {
      params.append(key, value);
    }
  }

  const res = await fetch(
    `http://localhost:3000/api/product?${params.toString()}`,
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
    <section className="p-6">
      {" "}
      {/* Albo użycie grida by zawsze były 3 karty w wierszu */}
      <h1 className="text-2xl font-bold mb-4">Produkty</h1>
      <p className="mb-4 text-sm text-gray-500">
        Znaleziono {total} produktów. Strona {currentPage} z {totalPages}
      </p>
      {/* <ProductList/> 
      i poniższy kod tam ma być wyświetlanie listy produktów więc moze tam 
      przenieść całe fetchowanie danych??? albo tu przekazywać całą liste */}
      <div className=" flex flex-row flex-wrap gap-4">
        {products?.map((product: FullProduct) => (
          <ProductCard key={`card-${product.id}`} product={product} />
        ))}
      </div>
      <PaginationPage totalPages={totalPages} />
    </section>
  );
}
