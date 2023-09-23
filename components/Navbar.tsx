import { ThemeToggle } from "@/app/theme-toggle";
import { cn } from "@/lib/utils";
import { Github, Terminal } from "lucide-react";
import Link from "next/link";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center w-full justify-between p-2 space-x-4 mx-auto max-w-[1200px] lg:space-x-6",
        className
      )}
      {...props}
    >
      <span className="flex gap-2 justify-center items-center">
        <Terminal className="w-6 h-6" />
        <h1 className="text-xl font-semibold tracking-tight transition-colors">
          IP Stack
        </h1>
      </span>
      <div className="flex items-center justify-center gap-2">
        <Link href="https://github.com/thestackdev/ipstack" target="_blank">
          <Github className="w-6 h-6" />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
