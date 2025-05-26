import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const [brands, total] = await Promise.all([
    prisma.brand.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    prisma.brand.count(),
  ]);

  return new Response(JSON.stringify({ brands, total }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
