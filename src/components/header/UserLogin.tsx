import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const UserLogin = () => {
  return (
    <Link
      href={`/login`}
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-[54px] w-[121px]"
      )}
    >
      SING IN
    </Link>
  );
};

export default UserLogin;
