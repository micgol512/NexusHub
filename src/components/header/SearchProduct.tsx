import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const SearchProduct = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    const trimmed = search.trim();

    if (trimmed) {
      router.push(`/product?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/product");
    }
  };
  useEffect(() => {
    setSearch("");
  }, [pathname]);
  return (
    <div className=" relative p-0 m-0 w-full max-w-[793px]">
      <Search
        onClick={handleSearch}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-(--foreground) h-[24px] w-[24px] hover:text-(--primary) cursor-pointer"
      />
      <Input
        placeholder="Search"
        className="pl-[60px] min-w-[120px] h-[54px] leading-[26px] text-[16px] font-[400] bg-transparent focus-visible:border-none shadow-none
        text-(--foreground) placeholder:pl-[65px]"
        onChange={handleSearchValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={search}
        type="text"
      />
    </div>
  );
};
