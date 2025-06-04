"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Address = {
  country: string;
  province: string;
  city: string;
  postCode: string;
};

export function AddressForm() {
  const [address, setAddress] = useState<Address>({
    country: "",
    province: "",
    city: "",
    postCode: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetch("/api/user/address");
      if (res.ok) {
        const data = await res.json();
        if (data) setAddress(data);
      }
    };
    fetchAddress();
  }, []);

  const handleAddressSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/user/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    if (res.status === 409) {
      await fetch("/api/user/address", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <h2 className="text-xl font-semibold mb-4">Address</h2>
      <Label htmlFor="in-country">Country</Label>
      <Input
        id="in-country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
      />
      <Label>Province</Label>
      <Input
        value={address.province}
        onChange={(e) => setAddress({ ...address, province: e.target.value })}
      />
      <Label>City</Label>
      <Input
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />
      <Label>Postal Code</Label>
      <Input
        value={address.postCode}
        onChange={(e) => setAddress({ ...address, postCode: e.target.value })}
      />
      <Button className="mt-4" onClick={handleAddressSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Address"}
      </Button>
    </div>
  );
}
