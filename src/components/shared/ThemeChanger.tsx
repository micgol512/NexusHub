import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const themeChange = (value: string) => {
  console.log(value);
  if (value === "light") {
    document.documentElement.classList.remove("dark");
  } else if (value === "dark") {
    document.documentElement.classList.add("dark");
  } else if (value === "system") {
    document.documentElement.classList.remove("dark");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }
};
export const ThemeChanger = () => {
  return (
    <Select onValueChange={(value) => themeChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
