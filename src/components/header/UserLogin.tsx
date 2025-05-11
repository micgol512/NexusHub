"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

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

  const userImage = session.user?.profileImage ?? "/default-avatar.png";

  return (
    <div className="flex items-center gap-4">
      <Link href="/cart">
        <ShoppingCart className="w-6 h-6" />
      </Link>
      <Link href="/user">
        <Image
          src={userImage}
          alt="User avatar"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </Link>
    </div>
  );
};

export default UserLogin;

//  <Link
//         href={`/login`}
//         className={cn(
//           buttonVariants({ variant: "default" }),
//           "h-[54px] w-[121px]"
//         )}
//       >
//         SING IN
//       </Link>
