"use client";

// import { ThemeChanger } from "../shared/ThemeChanger";
import { Separator } from "../ui/separator";
import { SearchProduct } from "./SearchProduct";
import { Logo } from "../shared/Logo";
import UserLogin from "./UserLogin";
import NavBar from "./NavBar";

export const Header = () => {
  return (
    <header className="flex text-nowrap justify-center items-center px-10 py-8 bg-(--background) w-full max-h-[224px]">
      <div className="flex flex-col gap-[40px] w-full max-w-[1920px] ">
        <div className="flex flex-row justify-between align-middle gap-4 m-0 p-0">
          <Logo />
          <SearchProduct />
          <UserLogin />
          {/* albo dane urzytkownika*/}
          {/* <ThemeChanger /> */}
        </div>
        <NavBar />
        <Separator />
      </div>
    </header>
  );
};
