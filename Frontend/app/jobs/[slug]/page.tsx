import { CalendarDays, CheckCircle2, ExternalLink, FileText, IndianRupee, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge, ButtonLink, Card } from "@/components/ui";
import { jobs } from "@/lib/data";

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap gap-2"><Badge>{job.category}</Badge><Badge tone="good">{job.score}% eligible match</Badge></div>
            <h1 className="mt-4 text-3xl font-bold">{job.title}</h1>
            <p className="mt-2 text-muted-foreground">{job.organization} · {job.type} · {job.state}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <p className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-primary" /> {job.vacancies.toLocaleString("en-IN")} vacancies</p>
              <p className="flex items-center gap-2 text-sm"><IndianRupee className="h-4 w-4 text-primary" /> {job.salary}</p>
              <p className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-primary" /> Last date {job.lastDate}</p>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Eligibility</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["Age limit: 18-32 years", "Qualification: Graduate or above", "Nationality: Indian", "Categories: General/OBC/SC/ST/EWS"].map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Selection process</h2>
            <div className="mt-5 grid gap-3">
              {["Online application", "Computer based examination", "Document verification", "Final merit list"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-md border p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-muted text-sm font-bold">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-bold">Important links</h2>
            <div className="mt-4 grid gap-3">
              <ButtonLink href="#">Apply online</ButtonLink>
              <ButtonLink href="#" variant="secondary">Official notification</ButtonLink>
              <ButtonLink href="#" variant="secondary">Official website</ButtonLink>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">Required documents</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {["Photo ID", "Education certificates", "Category certificate", "Signature and photograph"].map((item) => (
                <p key={item} className="flex items-center gap-2"><FileText className="h-4 w-4" /> {item}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">Timeline tracker</h2>
            <div className="mt-4 space-y-3 text-sm">
              {["Notification published", "Applications open", `Apply by ${job.lastDate}`, `Exam ${job.examDate ?? "to be announced"}`, "Result announcement"].map((item) => (
                <p key={item} className="flex items-center justify-between border-b pb-2 last:border-0"><span>{item}</span><ExternalLink className="h-3 w-3 text-muted-foreground" /></p>
              ))}
            </div>
          </Card>
        </aside>
      </section>
    </main>
  );
}
