import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt_desc"
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    searchParams.get("limit") || 9
  );

  const applyFilters = (value: string, key: "sortBy" | "limit") => {
    const params = new URLSearchParams(window.location.search);

    if (key === "sortBy") {
      if (value === "createdAt_desc") {
        params.delete("sortBy");
      } else {
        params.set("sortBy", value);
      }
    }

    if (key === "limit") {
      if (value === "9") {
        params.delete("limit");
      } else {
        params.set("limit", value);
      }
    }
    params.delete("page");
    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(value, "sortBy");
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    applyFilters(value, "limit");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-5 p-4">
        <div className="flex items-center gap-2">
          <Label className="text-[16px]">Sort By:</Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
              <SelectItem value="createdAt_asc">Date: Oldest first</SelectItem>
              <SelectItem value="createdAt_desc">Date: Newest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-[16px]">Items per page:</Label>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="18">18</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
