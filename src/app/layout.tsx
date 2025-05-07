import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "NexusHub",
  description: "Furutistic platform for customers and sellers",
  icons: {
    icon: "/favicon.ico", // lub .png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className="min-h-screen flex flex-col bg-(--background) text-(--foreground) items-center justify-center gap-0">
          <Header />
          <main className="w-full max-w-[1920px] flex flex-col flex-1 px-10 py-0 ">
            <ScrollArea className="h-full">{children}</ScrollArea>
          </main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
