import CartPageContent from "@/components/cart/CartPageContent";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <main className="p-5">
      <Suspense>
        <CartPageContent />
      </Suspense>
    </main>
  );
}
