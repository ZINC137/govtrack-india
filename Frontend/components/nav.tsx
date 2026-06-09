"use client";

import Link from "next/link";
import { Bell, BriefcaseBusiness, CalendarDays, LayoutDashboard, Moon, Search, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/eligibility", label: "Eligibility", icon: ShieldCheck },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
];

export function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">GT</span>
          <span>GovTrack India</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden min-w-64 items-center gap-2 rounded-md border bg-card px-3 py-2 lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search jobs, exams, departments" />
        </div>
        <Link href="/notifications" aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-md border bg-card">
          <Bell className="h-4 w-4" />
        </Link>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="grid h-10 w-10 place-items-center rounded-md border bg-card"
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </button>
      </div>
    </header>
  );
}
