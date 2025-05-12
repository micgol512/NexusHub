import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/generated/prisma";
import Link from "next/link";
import Image from "next/image";

export const CategorySlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/category`);
      const { categories } = await res.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (categories.length === 0) {
    return;
  }

  return (
    //<div className="w-full md:flex flex-col justify-between items-center p-0 m-0 bg-[var(--background)] hidden">
    <div className="w-full flex flex-col justify-between items-center p-0 m-0 bg-[var(--background)]">
      <div className="relative w-full h-[452px] overflow-hidden ">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full"
          >
            <Card className="flex flex-row justify-around w-full h-full p-0 m-0 bg-[var(--muted)]">
              <CardContent className="flex flex-col gap-4 items-start justify-center px-[50px] max-w-[433px]">
                <CardTitle className="text-[32px] text-(--secondary-foreground) font-medium leading-[44px] space-[1%]">
                  {categories[activeIndex].name}
                </CardTitle>
                <span className="text-[16px] font-normal">
                  {categories[activeIndex].description}
                </span>
                <Link
                  href={`/product?category=${categories[activeIndex].name}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "border-[var(--primary)] text-[var(--primary)]"
                  )}
                >
                  Explore Category →
                </Link>
              </CardContent>
              <CardContent className="flex flex-col h-full w-1/2 gap-4 p-0 m-0 items-center justify-center">
                <Image
                  src={categories[activeIndex].imageURL || "placeholder"}
                  alt="Category"
                  className="object-contain scale-130 -rotate-[35deg]"
                  width={300}
                  height={300}
                />
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[44px] h-[74px] rounded-r-[var(--radius)] rounded-l-none"
          onClick={handlePrev}
        >
          {"<"}
        </Button>
        <Button
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[44px] h-[74px] rounded-l-[var(--radius)] rounded-r-none"
          onClick={handleNext}
        >
          {">"}
        </Button>
      </div>

      <div className="flex flex-row justify-center w-sm h-[12px] ">
        {categories.map((_, index) => (
          <Dot
            key={`Category-dot-${index}`}
            onClick={() => {
              if (index === activeIndex) return;
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            className={cn(
              "text-xl cursor-pointer text-(--border) transition-colors hover:text-(--primary-foreground)",
              activeIndex === index && "text-[var(--primary)]"
            )}
          />
        ))}
      </div>
    </div>
  );
};
export default CategorySlider;
