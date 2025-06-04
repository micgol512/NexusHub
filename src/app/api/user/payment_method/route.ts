import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payment = await prisma.paymentMethod.findFirst({
    where: { userId: session.user.id },
  });

  if (!payment) return NextResponse.json({});

  let parsedDetails = payment.details;
  if (typeof parsedDetails === "string") {
    try {
      parsedDetails = JSON.parse(parsedDetails);
    } catch {
      parsedDetails = {};
    }
  }

  return NextResponse.json({
    ...payment,
    details: parsedDetails,
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const existing = await prisma.paymentMethod.findFirst({
    where: { userId: session.user.id },
  });

  if (existing) {
    const updated = await prisma.paymentMethod.updateMany({
      where: { userId: session.user.id },
      data: {
        method: data.method,
        details: data.details,
      },
    });

    return NextResponse.json(updated);
  }

  const payment = await prisma.paymentMethod.create({
    data: {
      userId: session.user.id,
      method: data.method,
      details: data.details,
    },
  });

  return NextResponse.json(payment);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const updated = await prisma.paymentMethod.updateMany({
    where: { userId: session.user.id },
    data: {
      method: data.method,
      details: JSON.stringify(data.details),
    },
  });

  return NextResponse.json(updated);
}
