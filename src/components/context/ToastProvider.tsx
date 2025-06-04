"use client";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme === "light" ? "light" : "light"}
      richColors={true}
      expand={false}
      position="top-center"
      swipeDirections={["left", "right"]}
      closeButton
    />
  );
}
