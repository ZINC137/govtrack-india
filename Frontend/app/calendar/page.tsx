import { CalendarDays } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { jobs } from "@/lib/data";

export default function CalendarPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Exam calendar</h1>
        <p className="text-muted-foreground">Registration, admit card, exam, and result milestones in one place.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day} className="font-semibold text-muted-foreground">{day}</div>)}
            {Array.from({ length: 35 }, (_, index) => (
              <div key={index} className="min-h-24 rounded-md border bg-background p-2 text-left">
                <span className="text-xs text-muted-foreground">{index + 1}</span>
                {[6, 17, 22, 28].includes(index + 1) ? <p className="mt-2 rounded-md bg-primary/10 p-1 text-xs text-primary">Exam event</p> : null}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 font-bold"><CalendarDays className="h-4 w-4" /> List view</h2>
          <div className="mt-4 space-y-3">
            {jobs.map((job) => (
              <div key={job.slug} className="rounded-md border p-3">
                <Badge>{job.category}</Badge>
                <h3 className="mt-2 font-semibold">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Apply by {job.lastDate} · Exam {job.examDate ?? "TBA"}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
