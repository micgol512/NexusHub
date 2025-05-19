"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserLogin = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  if (!session)
    return (
      <Button
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-[54px] w-[121px]"
        )}
        onClick={() => signIn()}
      >
        SIGN IN
      </Button>
    );

  const userImage = session.user?.image ?? "";

  return (
    <div className="flex items-center gap-4">
      <Link href="/cart">
        <ShoppingCart className="w-6 h-6" />
      </Link>
      <Link href="/user">
        <Avatar>
          <AvatarImage src={userImage} />
          <AvatarFallback>
            {(session?.user?.name ? session?.user?.name : session?.user?.email)
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};

export default UserLogin;
