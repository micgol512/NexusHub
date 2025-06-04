import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const CategoryRecomendate = () => {
  const categories = [
    {
      src: "/icons/mouse.svg",
      name: "Mouse",
    },
    {
      src: "/icons/monitor.svg",
      name: "Monitor",
    },
    {
      src: "/icons/headphone.svg",
      name: "Headphone",
    },
    {
      src: "/icons/keyboard.svg",
      name: "Keyboard",
    },
    {
      src: "/icons/webcam.svg",
      name: "Webcam",
    },
  ];

  return (
    //<div className="w-full md:flex flex-col justify-between items-center p-0 m-0 bg-[var(--background)] hidden">
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex w-full justify-between gap-5 px-4 py-4">
        {categories.map(({ src, name }) => (
          <Link key={`Category-req-${name}`} href={`/product?category=${name}`}>
            <Card
              className={
                "text-xl cursor-pointer  transition-colors hover:text-(--primary-foreground) hover:scale-105"
              }
            >
              <CardContent className="flex flex-col items-center justify-center">
                <div className="relative h-[150px] w-[150px]">
                  <Image src={src} alt={name} fill />
                </div>
                {name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>{" "}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
export default CategoryRecomendate;
