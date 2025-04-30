import { PrismaClient } from "@/generated/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const productID = Number((await params).id);
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    where: { id: productID },
    include: {
      discussions: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },

      images: true,
      brand: true,
      category: true,
      colors: true,
      rating: true,
      faqs: true,
      reviews: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  if (products.length === 0) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
