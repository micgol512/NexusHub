// "use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Separator } from "@/components/ui/separator";
import { AddressForm } from "@/components/user/AddressForm";
import { PaymentMethodForm } from "@/components/user/PaymentMethodForm";

export default function UserProfileSettings() {
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
              <AddressForm />
            </TabsContent>
            <TabsContent value="payment">
              <PaymentMethodForm />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="theme">
          {" "}
          <p className="text-muted-foreground">Select theme: </p>
          <ThemeChanger />
        </TabsContent>
      </Tabs>
    </div>
  );
}
