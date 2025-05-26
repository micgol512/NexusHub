import { FullProduct } from "@/components/product/ProductCard";
import ProductDetails from "@/components/product/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  if (id === undefined) return <div>Błąd</div>;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  const product: FullProduct = data[0];

  return (
    <main className="p-6 space-y-4">
      <ProductDetails product={product} />
    </main>
  );
}
