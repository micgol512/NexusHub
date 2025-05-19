import { prisma } from "@/lib/prisma";

export const GET = async () => {
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
export const POST = async () => {
  // const session = await getServerSession(authOptions);
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  const userId = "6";
  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: {
      userId,
    },
  });
  const shippingAddress = await prisma.address.findFirst({
    where: {
      userId,
    },
  });
  return new Response(JSON.stringify({ paymentMethod, shippingAddress }));
};
