import { Activity, FileUp, LineChart, LucideIcon, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui";

export default function AdminPage() {
  const stats: Array<[LucideIcon, string, string]> = [
    [Users, "18.4K", "Users"],
    [Shield, "143", "Active jobs"],
    [FileUp, "62", "PDF uploads"],
    [LineChart, "31%", "Search growth"]
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
          <p className="text-muted-foreground">Manage jobs, PDFs, notifications, states, users, analytics, and audit logs.</p>
        </div>
        <button className="min-h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Create job</button>
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
        <Card>
          <h2 className="font-bold">Create or edit recruitment</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["Job title", "Organization", "Department", "Vacancies", "Salary range", "Last date", "Minimum age", "Maximum age", "Qualifications", "State restrictions"].map((field) => (
              <label key={field} className="text-sm">
                <span className="mb-1 block text-muted-foreground">{field}</span>
                <input className="min-h-10 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 font-bold"><Activity className="h-4 w-4" /> Audit logs</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>admin@govtrack.in created SSC CGL notification</p>
            <p>editor@govtrack.in uploaded BEL PDF</p>
            <p>system sent deadline reminders</p>
            <p>admin@govtrack.in updated category taxonomy</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
