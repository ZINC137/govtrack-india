import { Bell, Bookmark, CalendarClock, CheckCircle2, Clock, LucideIcon, Search } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { Badge, Card } from "@/components/ui";
import { jobs, notifications } from "@/lib/data";

export default function DashboardPage() {
  const stats: Array<[LucideIcon, string, string]> = [
    [CheckCircle2, "24", "Eligible jobs"],
    [Bookmark, "11", "Saved jobs"],
    [Clock, "8", "Deadlines"],
    [Bell, "5", "New alerts"]
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Personal dashboard</h1>
        <p className="text-muted-foreground">Eligible jobs, saved opportunities, deadlines, reminders, applications, and recent searches.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([Icon, value, label]) => (
          <Card key={String(label)}>
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-2xl font-bold">{String(value)}</p>
            <p className="text-sm text-muted-foreground">{String(label)}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="mb-4 text-xl font-bold">Recommended jobs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => <JobCard key={job.slug} job={job} />)}
          </div>
        </section>
        <aside className="space-y-4">
          <Card>
            <h2 className="flex items-center gap-2 font-bold"><CalendarClock className="h-4 w-4" /> Upcoming deadlines</h2>
            <div className="mt-4 space-y-3">
              {jobs.map((job) => <p key={job.slug} className="text-sm text-muted-foreground">{job.title}: {job.lastDate}</p>)}
            </div>
          </Card>
          <Card>
            <h2 className="flex items-center gap-2 font-bold"><Bell className="h-4 w-4" /> New notifications</h2>
            <div className="mt-4 space-y-3">
              {notifications.map((item) => <p key={item} className="text-sm text-muted-foreground">{item}</p>)}
            </div>
          </Card>
          <Card>
            <h2 className="flex items-center gap-2 font-bold"><Search className="h-4 w-4" /> Recent searches</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SSC", "Railways", "Banking", "PSU"].map((item) => <Badge key={item}>{item}</Badge>)}
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
