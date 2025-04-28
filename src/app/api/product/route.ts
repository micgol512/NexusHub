import { PrismaClient } from "@/generated/prisma";

export const GET = async () => {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
