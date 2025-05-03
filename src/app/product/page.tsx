// "use client";

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
  const data = await res.json();
  const { products, total, currentPage, totalPages } = data;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produkty</h1>
      <p className="mb-4 text-sm text-gray-500">
        Znaleziono {total} produktów. Strona {currentPage} z {totalPages}
      </p>
      {products && console.log(products)}
      <PaginationPage totalPages={totalPages} />
    </section>
  );
}
