import { Bookmark, CalendarClock, IndianRupee, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Job } from "@/lib/data";
import { Badge, Card } from "@/components/ui";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge>{job.category}</Badge>
            {job.score ? <Badge tone="good">{job.score}% match</Badge> : null}
          </div>
          <Link href={`/jobs/${job.slug}`} className="text-lg font-bold hover:text-primary">
            {job.title}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{job.organization}</p>
        </div>
        <button aria-label="Save job" className="grid h-9 w-9 shrink-0 place-items-center rounded-md border hover:bg-muted">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {job.vacancies.toLocaleString("en-IN")} vacancies</span>
        <span className="flex items-center gap-2"><IndianRupee className="h-4 w-4" /> {job.salary}</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.state}</span>
        <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Apply by {job.lastDate}</span>
      </div>
    </Card>
  );
}
