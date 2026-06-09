import { Card } from "@/components/ui";

const faqs = [
  ["How is eligibility calculated?", "GovTrack compares age, qualification, category, state, experience, nationality, and disability rules against your profile."],
  ["Are official links included?", "Each job detail page includes official website, notification PDF, and application link fields."],
  ["Can I track applications?", "Saved jobs include statuses from Interested through Selected or Rejected."]
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <div className="mt-6 space-y-4">
        {faqs.map(([q, a]) => <Card key={q}><h2 className="font-bold">{q}</h2><p className="mt-2 text-muted-foreground">{a}</p></Card>)}
      </div>
    </main>
  );
}
