interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand: { name: string };
  category: { name: string };
  images: { id: number; url: string }[];
  colors: { id: number; name: string }[];
}

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await fetch(`http://localhost:3000/api/product/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  const product: Product = data[0];

  return (
    <div className="p-6 space-y-4">
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
    </div>
  );
}
