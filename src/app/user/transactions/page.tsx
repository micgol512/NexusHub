import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserTransactions } from "@/components/user/UserTransactions";
import { Separator } from "@/components/ui/separator";

export default async function UserTransactionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

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

  if (!user) return null;

  return (
    <>
      <h2 className="text-xl font-semibold text-(--primary)">Transactions</h2>
      <Separator className="bg-(--primary) my-1" />
      <UserTransactions orders={user.orders} />
    </>
  );
}
