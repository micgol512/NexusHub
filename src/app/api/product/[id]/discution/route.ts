import { PrismaClient } from "@/generated/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const productID = Number(params.id);
  const prisma = new PrismaClient();
  const discution = await prisma.discussion.findMany({
    where: {
      productId: productID,
    },
  });
  if (discution.length === 0) {
    return new Response(JSON.stringify({ message: "Discution  not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(discution), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
