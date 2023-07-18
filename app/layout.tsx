import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

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
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
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
