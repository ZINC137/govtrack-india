import { Card } from "@/components/ui";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Terms</h1>
      <Card className="mt-6 space-y-3 text-muted-foreground">
        <p>GovTrack India is a tracking and recommendation platform. Candidates must verify all recruitment details on official notifications before applying.</p>
        <p>Eligibility explanations are generated from stored rules and may require manual verification for relaxations, reservations, and special conditions.</p>
      </Card>
    </main>
  );
}
