import { Activity, ArrowUpRight, CalendarDays, FileCheck2, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { Badge, ButtonLink, Card } from "@/components/ui";
import { JobCard } from "@/components/job-card";
import { jobs, notifications } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <section className="surface-grid border-b">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge tone="good">Personalized eligibility engine for Indian government careers</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-normal md:text-6xl">GovTrack India</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Discover government jobs, exam notifications, admit cards, results, and recruitment timelines matched to your profile.
            </p>
            <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border bg-card p-2 shadow-soft">
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input className="min-h-11 flex-1 bg-transparent outline-none" placeholder="Search SSC, Railways, Banking, PSU, Teaching" />
              <button className="min-h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground">Search</button>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/eligibility">Check eligibility</ButtonLink>
              <ButtonLink href="/jobs" variant="secondary">Explore jobs</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Today’s command center</h2>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["24", "Eligible jobs"],
                  ["8", "Closing soon"],
                  ["5", "Admit cards"],
                  ["3", "Results"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border bg-muted/40 p-4">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="font-semibold">Recruitment timeline</h2>
              <div className="mt-5 space-y-4">
                {["Notification", "Registration", "Admit card", "Exam", "Result"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.max(30, 100 - index * 15)}%` }} />
                    </div>
                    <span className="w-24 text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured jobs</h2>
            <p className="text-muted-foreground">High-signal vacancies from major recruitment boards.</p>
          </div>
          <ButtonLink href="/jobs" variant="secondary">View all</ButtonLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.filter((job) => job.featured).map((job) => <JobCard key={job.slug} job={job} />)}
        </div>
      </section>

      <section className="border-y bg-muted/35">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 lg:grid-cols-3">
          <Card>
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">Latest notifications</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {notifications.slice(0, 3).map((item) => <p key={item}>{item}</p>)}
            </div>
          </Card>
          <Card>
            <CalendarDays className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">Upcoming exams</h3>
            <p className="mt-4 text-sm text-muted-foreground">SSC CGL, IBPS PO, Railway Technician, and UPSC ESE are on your next 120-day calendar.</p>
          </Card>
          <Card>
            <FileCheck2 className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-bold">Results and admit cards</h3>
            <p className="mt-4 text-sm text-muted-foreground">Track result announcements, admit card windows, and document verification milestones.</p>
          </Card>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>GovTrack India supports candidates with verified links, reminders, and profile-based eligibility logic.</p>
        <div className="flex gap-4">
          <a href="/faq">FAQ</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/support" className="inline-flex items-center gap-1">Support <ArrowUpRight className="h-3 w-3" /></a>
        </div>
      </footer>
    </main>
  );
}
