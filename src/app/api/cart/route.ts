import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json({ cart });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  if (!productId || typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Sprawdź, czy produkt istnieje
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Zapewnij, że koszyk istnieje
  const cart = await prisma.cart.upsert({
    where: { userId: session.user.id },
    update: {},
    create: {
      userId: session.user.id,
    },
  });

  // Sprawdź, czy produkt już jest w koszyku
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });

  if (existingCartItem) {
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
    });

    return NextResponse.json({ item: updatedItem });
  }

  // Dodaj nowy produkt do koszyka
  const newItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
    },
  });

  return NextResponse.json({ item: newItem }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  });

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const deletedItem = await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });

  return NextResponse.json({ deletedCount: deletedItem.count });
}
