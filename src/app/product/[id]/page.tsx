import { FullProduct } from "@/components/product/ProductCard";

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
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>
      <div>
        <strong>Brand:</strong> {product.brand.name}
      </div>
      <div>
        <strong>Category:</strong> {product.category.name}
      </div>
      <div className="flex gap-2">
        {/* {product.images.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt="Product"
            className="w-24 h-24 object-cover"
            width={100}
            height={100}
          />
        ))} */}
      </div>
      <div>
        <strong>Price:</strong> ${product.discountPrice ?? product.price}
      </div>
      <div>
        <strong>Colors:</strong>{" "}
        {product.colors.map((c) => (
          <span key={c.id} className="inline-block px-2">
            {c.name}
          </span>
        ))}
      </div>
    </main>
  );
}
