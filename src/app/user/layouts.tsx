import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col ">
      <ScrollArea className="h-[300px] bg-blue-400">
        some content for filter
      </ScrollArea>
      {children}
    </div>
  );
}
