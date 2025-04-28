import { PrismaClient } from "@/generated/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const productID = Number(params.id);
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    where: {
      id: productID,
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
