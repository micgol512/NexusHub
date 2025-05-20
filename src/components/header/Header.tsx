"use client";

import { Separator } from "../ui/separator";
import { SearchProduct } from "./SearchProduct";
import { Logo } from "../shared/Logo";
import UserLogin from "./UserLogin";
import NavBar from "./NavBar";
import PathShow from "../shared/PathShow";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex text-nowrap justify-center items-center px-10 py-8 bg-(--background) w-full max-h-[224px] m-0">
      <div className="flex flex-col gap-[20px] w-full max-w-[1920px] ">
        <div className="flex flex-row justify-between align-middle gap-4 m-0 p-0">
          <Link href={"/"}>
            <Logo />
          </Link>
          <SearchProduct />
          <UserLogin />
        </div>
        <NavBar />
        <div>
          <Separator className="mb-2" />
          <PathShow />{" "}
          <div className="hidden w-full h-[30px] rounded-(--radius) pl-[24px] border-2 border-(--success)">
            {/* To new component and context for notification or use Toast from shadcn */}
          </div>
        </div>
      </div>
    </header>
  );
};
