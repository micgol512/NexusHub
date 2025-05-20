import { Product } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const total = await prisma.product.count();
  const usedIds = new Set<number>();
  const items: Product[] = [];

  while (items.length < 5) {
    const randomID = Math.ceil(Math.random() * total);
    if (usedIds.has(randomID)) continue;

    const product = await prisma.product.findUnique({
      where: { id: randomID },
      include: {
        images: true,
        brand: true,
        category: true,
        colors: true,
        rating: true,
      },
    });
    if (product) {
      items.push(product);
      usedIds.add(randomID);
    }
  }

  return NextResponse.json({ items });
}
