import { AlertTriangle, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { jobs } from "@/lib/data";

const fields = ["DOB", "State", "District", "Gender", "Category", "Qualification", "Branch", "Experience"];

export default function EligibilityPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
      <Card>
        <h1 className="flex items-center gap-2 text-2xl font-bold"><ShieldCheck className="h-6 w-6 text-primary" /> Eligibility checker</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter profile details to classify jobs as eligible, possibly eligible, or not eligible.</p>
        <div className="mt-5 grid gap-3">
          {fields.map((field) => (
            <label key={field} className="text-sm">
              <span className="mb-1 block text-muted-foreground">{field}</span>
              <input className="min-h-10 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary/30" placeholder={field} />
            </label>
          ))}
          <button className="mt-2 min-h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Run eligibility check</button>
        </div>
      </Card>
      <section className="space-y-4">
        {jobs.map((job, index) => {
          const states = [
            { label: "Eligible", icon: CheckCircle2, tone: "good" as const },
            { label: "Possibly Eligible", icon: HelpCircle, tone: "warn" as const },
            { label: "Not Eligible", icon: AlertTriangle, tone: "neutral" as const }
          ];
          const state = states[index % states.length];
          return (
            <Card key={job.slug}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <Badge tone={state.tone}>{state.label}</Badge>
                  <h2 className="mt-3 text-xl font-bold">{job.title}</h2>
                  <p className="text-sm text-muted-foreground">{job.organization}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold"><state.icon className="h-4 w-4 text-primary" /> {job.score ?? 72}% score</div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                <p>Matched: Qualification, nationality, category</p>
                <p>Warning: Verify age relaxation in official PDF</p>
                {state.label === "Not Eligible" ? <p>Blocker: State or experience requirement does not match</p> : null}
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
