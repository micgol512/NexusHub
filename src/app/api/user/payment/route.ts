import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const methods = await prisma.paymentMethod.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(methods);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { country, province, city, postCode } = await req.json();

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      country,
      province,
      city,
      postCode,
    },
  });

  return NextResponse.json(address);
}
