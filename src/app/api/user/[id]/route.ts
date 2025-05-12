import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const idFromPath = pathParts[pathParts.length - 1];
  const userID = idFromPath;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: session.user.email }, { id: userID }],
    },
  });

  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
