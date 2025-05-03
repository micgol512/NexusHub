import React from "react";
import { NavbarLink } from "./NavbarLink";

const NavBar = () => {
  return (
    <nav className="flex gap-12 w-full max-w-[1920px] h-[26px] ">
      <NavbarLink href="/" label="Home" />
      <NavbarLink href="/product" label="Product" />
      <NavbarLink href="/contact" label="Contact" />
      <NavbarLink href="/user" label="USER TEST" />
    </nav>
  );
};

export default NavBar;
