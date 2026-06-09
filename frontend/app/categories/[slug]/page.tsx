import { JobCard } from "@/components/job-card";
import { jobs } from "@/lib/data";

function titleFromSlug(slug: string) {
  return slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  const matched = jobs.filter((job) => job.category.toLowerCase() === title.toLowerCase() || job.type.toLowerCase() === title.toLowerCase());

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">{title} jobs</h1>
      <p className="text-muted-foreground">Dedicated recruitment category with filtered opportunities and timelines.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(matched.length ? matched : jobs).map((job) => <JobCard key={job.slug} job={job} />)}
      </div>
    </main>
  );
}
