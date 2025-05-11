"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // lub zamień na własny merge klas

interface NavbarLinkProps {
  href: string;
  label: string;
}

export function NavbarLink({ href, label }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "font-semibold transition-colors text-(--foreground) hover:text-(--primary-foreground) ",
        isActive && "text-(--primary)"
      )}
    >
      {label}
    </Link>
  );
}
