import { PrismaClient } from "@/generated/prisma";

export const GET = async () => {
  const prisma = new PrismaClient();
  //   prisma.$connect();
  const users = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: "product" } },
        { description: { contains: "product" } },
      ],
    },

    orderBy: {
      name: "asc",
    },
  });

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
