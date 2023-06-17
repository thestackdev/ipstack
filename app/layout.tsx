import { Inter } from "next/font/google";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IP Stack",
  description: "IP Stack is a simple IP address lookup tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(`
          ${inter.className} min-h-screen bg-background font-sans antialiased`)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <Separator />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
