import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "@/components/context/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "CyberTech",
  description: "Furutistic platform for customers and sellers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme"
      >
        <body className="min-h-screen flex flex-col bg-(--background) text-(--foreground) items-center justify-center gap-0">
          <SessionProvider>
            <Header />
            <Toaster />
            <main className="w-full max-w-[1920px] flex flex-col flex-1 justify-start p-0 py-0 ">
              {children}
            </main>
            <Footer />
          </SessionProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </ThemeProvider>
    </html>
  );
}
