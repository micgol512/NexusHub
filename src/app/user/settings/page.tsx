"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Separator } from "@/components/ui/separator";

export default function UserProfileSettings() {
  const [address, setAddress] = useState({
    country: "",
    province: "",
    city: "",
    postCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    method: "CARD", // enum: CARD, PAYPAL, GOOGLEPAY, APPLEPAY
    details: {
      provider: "",
      accountNumber: "",
      expiryDate: "",
    },
  });

  const handleAddressSubmit = async () => {
    try {
      await fetch("/api/user/address", {
        method: "POST",
        body: JSON.stringify(address),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Address saved");
    } catch {
      toast.error("Failed to save address");
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      await fetch("/api/user/payment-method", {
        method: "POST",
        body: JSON.stringify({
          method: paymentMethod.method,
          details: paymentMethod.details,
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Payment method saved");
    } catch {
      toast.error("Failed to save payment method");
    }
  };

  return (
    <div className="space-y-12 max-w-xl">
      <Tabs defaultValue="theme">
        <TabsList className="bg-(--background) gap-2 justify-center">
          <h2 className="text-xl font-semibold text-(--primary)">Settings:</h2>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        <Separator className="bg-(--primary) my-1" />
        <TabsContent value="account">
          <Tabs defaultValue="address">
            <TabsList className="bg-(--background) gap-2 justify-center">
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="address">
              {" "}
              <div>
                <h2 className="text-xl font-semibold mb-4">Address</h2>
                <Label>Country</Label>
                <Input
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
                <Label>Province</Label>
                <Input
                  value={address.province}
                  onChange={(e) =>
                    setAddress({ ...address, province: e.target.value })
                  }
                />
                <Label>City</Label>
                <Input
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
                <Label>Postal Code</Label>
                <Input
                  value={address.postCode}
                  onChange={(e) =>
                    setAddress({ ...address, postCode: e.target.value })
                  }
                />
                <Button className="mt-4" onClick={handleAddressSubmit}>
                  Save Address
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="payment">
              <div>
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
                <Button className="mt-4" onClick={handlePaymentSubmit}>
                  Save Payment Method
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="theme">
          {" "}
          <p className="text-muted-foreground">Select theme: </p>
          <ThemeChanger />
        </TabsContent>
      </Tabs>

      {/* address */}

      {/* payment */}
    </div>
  );
}

//  <div>
// <Tabs defaultValue="theme">
//   <TabsList className="bg-(--background) gap-2 justify-center">
//     <h2 className="text-xl font-semibold text-(--primary)">Settings:</h2>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="theme">Theme</TabsTrigger>
//   </TabsList>
//   <Separator className="bg-(--primary) my-1" />
//   <TabsContent value="account">Page in progress...</TabsContent>
//   <TabsContent value="theme">
//     {" "}
//     <p className="text-muted-foreground">Select theme: </p>
//     <ThemeChanger />
//   </TabsContent>
// </Tabs>
//     </div>
