import { PrismaClient } from "@/generated/prisma";

export const GET = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
