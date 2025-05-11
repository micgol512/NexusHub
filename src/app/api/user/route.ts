import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: "user1@example.com" }, { mobileNumber: "" }],
    },
  });

  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
