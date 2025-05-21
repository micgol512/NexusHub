import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // const userId = "6";
  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  const shippingAddress = await prisma.address.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  return new NextResponse(JSON.stringify({ paymentMethod, shippingAddress }));
};
