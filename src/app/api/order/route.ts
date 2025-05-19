import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Order, OrderItem } from "@/generated/prisma";

export async function GET() {
  //   const session = await getServerSession(authOptions);
  //   if (!session?.user?.id) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const session = { user: { id: "cmau5a5zn0000ux1gbpm45a8v" } };
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}

export async function POST() {
  //   const session = await getServerSession(authOptions);
  //   if (!session?.user?.id) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const session = { user: { id: "cmau5a5zn0000ux1gbpm45a8v" } };
  const userId = session.user.id;

  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: {
      userId,
    },
  });
  if (!paymentMethod)
    return NextResponse.json(
      { error: "No payment method selected" },
      { status: 400 }
    );

  const shippingAddress = await prisma.address.findFirst({
    where: {
      userId,
    },
  });
  if (!shippingAddress)
    return NextResponse.json({ error: "No addres selected" }, { status: 400 });

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { where: { selected: true }, include: { product: true } },
    },
  });
  // const cartitems = await prisma.cartItem.findMany({
  //   where: {
  //     cartId: cart?.id,
  //     selected: true,
  //   },
  // });

  return NextResponse.json({ cart });
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "No selected items" }, { status: 400 });
  }

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      paymentMethodId: paymentMethod.id,
      shippingAddressId: shippingAddress.id,
      totalPrice,
      orderItems: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.product.price,
        })),
      },
    },
  });

  await prisma.transaction.create({
    data: {
      userId,
      orderId: order.id,
      status: "PENDING",
    },
  });

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      selected: true,
    },
  });

  return NextResponse.json({ orderId: order.id });
}
