import { AddressForm } from "@/components/user/AddressForm";
import { PaymentMethodForm } from "@/components/user/PaymentMethodForm";

export default function UserHomePage() {
  return (
    <div className="text-lg">
      Welcome in Profile Panel.
      <AddressForm />
      <PaymentMethodForm />
    </div>
  );
}
