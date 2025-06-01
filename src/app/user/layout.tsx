import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserSidebar } from "@/components/user/UserSidebar";
import { Prisma } from "@/generated/prisma";
export type UserWithOrders = Prisma.UserGetPayload<{
  include: {
    orders: {
      include: {
        orderItems: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    include: {
      orders: {
        include: {
          orderItems: {
            include: { product: true },
          },
        },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <main className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-1/3 max-w-sm">
        <UserSidebar user={user as UserWithOrders} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
