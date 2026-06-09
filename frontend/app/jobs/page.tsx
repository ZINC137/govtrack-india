import { Filter, SlidersHorizontal } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { Card } from "@/components/ui";
import { categories, jobs } from "@/lib/data";

export default function JobsPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <Card>
          <div className="flex items-center gap-2 font-semibold"><Filter className="h-4 w-4" /> Filters</div>
          <div className="mt-4 space-y-3">
            {["Qualification", "Age", "State", "Department", "Salary", "Category", "Experience", "Last date"].map((item) => (
              <label key={item} className="block text-sm">
                <span className="mb-1 block text-muted-foreground">{item}</span>
                <input className="min-h-10 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary/30" placeholder={`Any ${item.toLowerCase()}`} />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Categories</h2>
          <div className="mt-3 grid gap-2">
            {categories.map((item) => <a key={item} className="rounded-md px-2 py-2 text-sm hover:bg-muted" href={`/categories/${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>)}
          </div>
        </Card>
      </aside>
      <section>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Government jobs</h1>
            <p className="text-muted-foreground">Filter by eligibility, state, salary, department, category, and closing date.</p>
          </div>
          <button className="inline-flex min-h-10 items-center gap-2 rounded-md border bg-card px-3 text-sm font-semibold"><SlidersHorizontal className="h-4 w-4" /> Sort: Closing soon</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => <JobCard key={job.slug} job={job} />)}
        </div>
      </section>
    </main>
  );
}
