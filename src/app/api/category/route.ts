import { PrismaClient } from "@/generated/prisma";

export const GET = async () => {
  const prisma = new PrismaClient();
  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    prisma.category.count(),
  ]);

  return new Response(JSON.stringify({ categories, total }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// return new Response(
//   JSON.stringify({
//     products,
//     total,
//     currentPage: page,
//     totalPages: Math.ceil(total / limit),
//   }),
//   {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );
