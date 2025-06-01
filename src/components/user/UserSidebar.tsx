"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { UserWithOrders } from "@/app/user/layout";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface Props {
  user: UserWithOrders;
}

export function UserSidebar({ user }: Props) {
  return (
    <Card>
      <div className="flex items-center gap-4 px-4">
        <Avatar>
          <AvatarFallback>
            {(user?.name ? user?.name : user?.email)
              ?.slice(0, 2)
              .toUpperCase() || "NN"}
          </AvatarFallback>
        </Avatar>
        <div>
          {user?.name && <p className="text-lg font-semibold">{user.name}</p>}
          {user?.email && (
            <p className="text-sm text-muted-foreground">{user.email}</p>
          )}
        </div>
      </div>
      <Separator />
      <CardContent className="flex flex-col items-start">
        <Link
          href="/user/settings"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Settings
        </Link>
        <Link
          href="/user/transactions"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Transactions
        </Link>
      </CardContent>
      <Separator />
      <Button
        className="w-11/12 self-center"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </Button>
    </Card>
  );
}
