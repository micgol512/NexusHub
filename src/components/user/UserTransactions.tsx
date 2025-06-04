import { Prisma } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type Props = {
  orders: Prisma.OrderGetPayload<{
    include: {
      orderItems: {
        include: {
          product: true;
        };
      };
    };
  }>[];
};

export function UserTransactions({ orders }: Props) {
  if (!orders.length) {
    return <p className="text-muted-foreground">No transactions found.</p>;
  }

  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        className="w-full border-1 px-2 rounded-(--radius)"
        defaultValue="order"
      >
        {orders.map((order) => (
          <AccordionItem key={order.id} value={`order-${order.id}`}>
            <AccordionTrigger className="hover:text-(--primary)">
              {`Order #${order.id} from ${order.createdAt.toDateString()}`}
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Status: <Badge>{order.status}</Badge>
              </p>
              <ul className="text-sm list-disc pl-4 text-muted-foreground">
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.product.name}
                    {" x "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
