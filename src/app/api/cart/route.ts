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

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const cart = await prisma.cart.upsert({
    where: { userId: session.user.id },
    update: {},
    create: {
      userId: session.user.id,
    },
  });

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

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: { productId: number; quantity?: number; selected?: boolean } =
    await req.json();
  const { productId, quantity, selected } = body;

  if (!productId || (quantity !== undefined && quantity < 1)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true },
    });

    if (!user?.cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: user.cart.id,
        productId,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: quantity ?? cartItem.quantity,
        selected: selected ?? cartItem.selected,
      },
    });

    return NextResponse.json({ updatedItem });
  } catch (error) {
    console.error("[CART_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
