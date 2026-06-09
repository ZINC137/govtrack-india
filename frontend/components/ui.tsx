import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border bg-card text-foreground hover:bg-muted"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-lg border bg-card p-5 shadow-soft", className)}>{children}</div>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold",
        tone === "good" && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        tone === "warn" && "bg-amber-500/12 text-amber-700 dark:text-amber-300",
        tone === "neutral" && "bg-muted text-muted-foreground"
      )}
    >
      {children}
    </span>
  );
}
