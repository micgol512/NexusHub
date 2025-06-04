import OrderPageContent from "@/components/order/OrderPageContent";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <main className="p-5">
      <Suspense>
        <OrderPageContent />
      </Suspense>
    </main>
  );
}
