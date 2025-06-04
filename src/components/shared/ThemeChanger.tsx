"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "silver", "olive", "system"];

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme) return;

    const html = document.documentElement;

    // usuń wszystkie istniejące klasy z listy motywów
    themes.forEach((t) => html.classList.remove(t));

    // dodaj nową klasę
    html.classList.add(theme);
  }, [theme]);
  return (
    <Select onValueChange={setTheme} value={theme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((t) => (
          <SelectItem key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
