"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { notification } from "@/lib/notification";

type PaymentMethodDetails = {
  provider: string;
  accountNumber: string;
  expiryDate: string;
};

type PaymentMethod = {
  method: string;
  details: PaymentMethodDetails;
};

export function PaymentMethodForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    method: "CARD",
    details: {
      provider: "",
      accountNumber: "",
      expiryDate: "",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      const res = await fetch("/api/user/payment_method");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setPaymentMethod({
            method: data.method || "CARD",
            details: {
              provider: data.details?.provider || "",
              accountNumber: data.details?.accountNumber || "",
              expiryDate: data.details?.expiryDate || "",
            },
          });
        }
      }
    };
    fetchPayment();
  }, []);

  const handlePaymentSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/payment_method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentMethod),
      });
      if (res.ok) {
        notification("Successfull update Payment Method.", "success");
      }
    } catch {
      notification("Some problem witch update card", "error");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <Label>Type</Label>
      <select
        className="w-full border px-2 py-2 rounded-md"
        value={paymentMethod.method}
        onChange={(e) =>
          setPaymentMethod({
            ...paymentMethod,
            method: e.target.value,
          })
        }
      >
        <option value="CARD">Card</option>
        <option value="PAYPAL">PayPal</option>
        <option value="GOOGLEPAY">Google Pay</option>
        <option value="APPLEPAY">Apple Pay</option>
      </select>

      <Label className="mt-2">Provider</Label>
      <Input
        value={paymentMethod.details.provider}
        onChange={(e) =>
          setPaymentMethod({
            ...paymentMethod,
            details: {
              ...paymentMethod.details,
              provider: e.target.value,
            },
          })
        }
      />
      <Label>Account/Card Number</Label>
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
      <Label>Expiry Date</Label>
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
      <Button className="mt-4" onClick={handlePaymentSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Payment Method"}
      </Button>
    </div>
  );
}
