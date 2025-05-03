import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row ">
      <ScrollArea className="h-[300px] bg-blue-400">
        some content for filter
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </ScrollArea>
      {children}
    </div>
  );
}
