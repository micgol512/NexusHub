import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const address = await prisma.address.findFirst({
    where: { userId: session.user.id },
  });

  return NextResponse.json(address || {});
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const existing = await prisma.address.findFirst({
    where: { userId: session.user.id },
  });

  if (existing) {
    return NextResponse.json(
      { message: "Address already exists." },
      { status: 409 }
    );
  }

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      country: data.country,
      province: data.province,
      city: data.city,
      postCode: data.postCode,
    },
  });

  return NextResponse.json(address);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const updated = await prisma.address.updateMany({
    where: { userId: session.user.id },
    data: {
      country: data.country,
      province: data.province,
      city: data.city,
      postCode: data.postCode,
    },
  });

  return NextResponse.json(updated);
}
