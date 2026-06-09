import { Badge, Card } from "@/components/ui";
import { jobs } from "@/lib/data";

const statuses = ["Interested", "Applied", "Exam Given", "Result Awaited", "Selected", "Rejected"];

export default function SavedJobsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Saved jobs</h1>
      <p className="text-muted-foreground">Track every saved recruitment from interest to final result.</p>
      <div className="mt-6 grid gap-4">
        {jobs.map((job, index) => (
          <Card key={job.slug} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge>{job.category}</Badge>
              <h2 className="mt-2 text-lg font-bold">{job.title}</h2>
              <p className="text-sm text-muted-foreground">{job.organization} · Deadline {job.lastDate}</p>
            </div>
            <select className="min-h-10 rounded-md border bg-background px-3 text-sm" defaultValue={statuses[index % statuses.length]}>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </Card>
        ))}
      </div>
    </main>
  );
}
