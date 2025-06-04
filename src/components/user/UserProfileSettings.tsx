"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function UserProfileSettings() {
  const [address, setAddress] = useState({
    country: "",
    province: "",
    city: "",
    postCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    method: "CARD", // enum, np. CARD, PAYPAL, itp.
    details: {
      provider: "",
      accountNumber: "",
      expiryDate: "",
    },
  });

  const handleSubmit = async () => {
    try {
      await fetch("/api/user/address", {
        method: "POST",
        body: JSON.stringify(address),
        headers: { "Content-Type": "application/json" },
      });

      await fetch("/api/user/payment-method", {
        method: "POST",
        body: JSON.stringify({
          method: paymentMethod.method,
          details: paymentMethod.details,
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Dane zapisane");
    } catch {
      toast.error("Błąd przy zapisie danych");
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h2 className="text-xl font-semibold">Address</h2>
        <Label>Country</Label>
        <Input
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
        <Label>Województwo</Label>
        <Input
          value={address.province}
          onChange={(e) => setAddress({ ...address, province: e.target.value })}
        />
        <Label>Miasto</Label>
        <Input
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <Label>Kod pocztowy</Label>
        <Input
          value={address.postCode}
          onChange={(e) => setAddress({ ...address, postCode: e.target.value })}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Metoda płatności</h2>
        <Label>Typ płatności</Label>
        <select
          className="w-full border px-2 py-2 rounded-md"
          value={paymentMethod.method}
          onChange={(e) =>
            setPaymentMethod({ ...paymentMethod, method: e.target.value })
          }
        >
          <option value="CARD">Karta</option>
          <option value="PAYPAL">PayPal</option>
          <option value="GOOGLEPAY">Google Pay</option>
          <option value="APPLEPAY">Apple Pay</option>
        </select>

        <Label>Provider</Label>
        <Input
          value={paymentMethod.details.provider}
          onChange={(e) =>
            setPaymentMethod({
              ...paymentMethod,
              details: { ...paymentMethod.details, provider: e.target.value },
            })
          }
        />
        <Label>Numer konta lub karty</Label>
        <Input
          value={paymentMethod.details.accountNumber}
          onChange={(e) =>
            setPaymentMethod({
              ...paymentMethod,
              details: {
                ...paymentMethod.details,
                accountNumber: e.target.value,
              },
            })
          }
        />
        <Label>Data ważności</Label>
        <Input
          type="month"
          value={paymentMethod.details.expiryDate}
          onChange={(e) =>
            setPaymentMethod({
              ...paymentMethod,
              details: {
                ...paymentMethod.details,
                expiryDate: e.target.value,
              },
            })
          }
        />
      </div>

      <Button onClick={handleSubmit}>Zapisz dane</Button>
    </div>
  );
}
