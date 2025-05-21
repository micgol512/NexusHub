import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Category } from "@/generated/prisma";

function useSelectableFilter(initial: string[] = ["All"]) {
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (value: string) => {
    if (value === "All") {
      setSelected(["All"]);
    } else {
      let updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected.filter((v) => v !== "All"), value];

      if (updated.length === 0) updated = ["All"];
      setSelected(updated);
    }
  };

  const isChecked = (value: string) => selected.includes(value);

  const setFromParams = (params: string[] | null) => {
    if (params && params.length > 0) {
      setSelected(params);
    }
  };

  return { selected, toggle, isChecked, setFromParams };
}

export default function FilterSide() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/category`);
      const { categories }: { categories: Category[] } = await res.json();
      setCategories(categories.map((cat) => cat.name));
    };
    fetchCategories();
  }, []);

  const ratings = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"];

  const categoryFilter = useSelectableFilter();
  const ratingFilter = useSelectableFilter();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const categoriesFromParams = searchParams.getAll("category");
    const ratingsFromParams = searchParams.getAll("rating");

    if (categoriesFromParams.length) {
      categoryFilter.setFromParams(categoriesFromParams);
    }
    if (ratingsFromParams.length) {
      ratingFilter.setFromParams(ratingsFromParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(window.location.search);

    params.delete("category");
    params.delete("rating");

    if (!categoryFilter.selected.includes("All")) {
      categoryFilter.selected.forEach((cat) => {
        params.append("category", cat);
      });
    }

    if (!ratingFilter.selected.includes("All")) {
      ratingFilter.selected.forEach((rate) => {
        params.append("rating", rate);
      });
    }

    if (minPrice.trim()) {
      params.set("min", minPrice.trim());
    } else {
      params.delete("min");
    }

    if (maxPrice.trim()) {
      params.set("max", maxPrice.trim());
    } else {
      params.delete("max");
    }

    params.delete("page");
    router.push(`/product?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hiddenCategories = categories.slice(5);
  const visibleCategories = (() => {
    const base = showAllCategories
      ? [...hiddenCategories, ...categories.slice(0, 5)]
      : categories.slice(0, 5);

    const sorted = [...base].sort((a, b) => {
      const aSelected = categoryFilter.selected.includes(a);
      const bSelected = categoryFilter.selected.includes(b);
      return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
    });

    return ["All", ...sorted];
  })();
  if (categories.length === 0) {
    return <div>Loading filters...</div>;
  }
  return (
    <>
      <Accordion
        type="multiple"
        className="w-full border-none"
        defaultValue={["category", "Rating", "Price"]}
      >
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className=" text-[20px] text-(--secondary-foreground) leading-[30px] font-semibold">
            Category
          </AccordionTrigger>
          <AccordionContent className="flex flex-col items-start gap-5">
            {visibleCategories.map((cat) => (
              <div
                key={`category-${cat}`}
                className="flex items-center space-x-2 gap-3.5 "
              >
                <Checkbox
                  id={`cat-${cat}`}
                  className="h-[26px] w-[26px]"
                  onCheckedChange={() => categoryFilter.toggle(cat)}
                  checked={categoryFilter.isChecked(cat)}
                />
                <Label
                  htmlFor={`cat-${cat}`}
                  className="text-[16px] font-[500] leading-[26px] text-(--secondary-foreground)"
                >
                  {cat}
                </Label>
              </div>
            ))}
            {categories.length > 5 && !showAllCategories && (
              <Button
                variant="link"
                className="text-(--foreground) text-[16px] font-[500] leading-[26px]  p-0 m-0"
                onClick={() => setShowAllCategories(true)}
              >
                Load More <Plus />
              </Button>
            )}
            {showAllCategories && (
              <Button
                variant="link"
                className="text-(--foreground) text-[16px] font-[500] leading-[26px]  p-0 m-0"
                onClick={() => setShowAllCategories(false)}
              >
                Show Less <Minus />
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="Rating" className="border-none">
          <AccordionTrigger className=" text-[20px] text-(--secondary-foreground) leading-[30px] font-semibold">
            Rating
          </AccordionTrigger>
          <AccordionContent className="flex flex-col items-start gap-5">
            {["All", ...ratings].map((rat) => (
              <div
                key={`rating-${rat}`}
                className="flex items-center space-x-2 gap-3.5 "
              >
                <Checkbox
                  id={`rate-${rat}`}
                  className="h-[26px] w-[26px]"
                  onCheckedChange={() => ratingFilter.toggle(rat)}
                  checked={ratingFilter.isChecked(rat)}
                />
                <Label
                  htmlFor={`rate-${rat}`}
                  className="text-[16px] font-[500] leading-[26px] text-(--secondary-foreground)"
                >
                  {rat}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="Price" className="border-none">
          <AccordionTrigger className=" text-[20px] text-(--secondary-foreground) leading-[30px] font-semibold">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 space-y-4 pl-2">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="$ Min Price"
                  className="w-full"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <div className="text-sm text-muted-foreground">USD</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="$ Max Price"
                  className="w-full"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div className="text-sm text-muted-foreground">USD</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {}
      <Separator className="my-4" orientation="horizontal" />
      <Button
        onClick={applyFilters}
        variant={"outline"}
        className={
          "border-(--primary) text-(--primary) w-full hover:bg-(--primary) hover:text-(--background) hover:border-(--primary)"
        }
      >
        Apply filter
      </Button>
    </>
  );
}
