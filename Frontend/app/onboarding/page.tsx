import { Card } from "@/components/ui";

const steps = ["Personal", "Education", "Experience", "Interests", "Alerts"];

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Candidate onboarding</h1>
      <p className="text-muted-foreground">Build a profile once and let eligibility matching do the heavy lifting.</p>
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {steps.map((step, index) => <span key={step} className="min-w-32 rounded-md border bg-card px-3 py-2 text-sm font-semibold">{index + 1}. {step}</span>)}
      </div>
      <Card className="mt-6">
        <h2 className="font-bold">Profile basics</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {["DOB", "State", "District", "Gender", "Category", "Nationality", "Disability status", "Job interests"].map((field) => (
            <label key={field} className="text-sm">
              <span className="mb-1 block text-muted-foreground">{field}</span>
              <input className="min-h-10 w-full rounded-md border bg-background px-3 outline-none" />
            </label>
          ))}
        </div>
      </Card>
    </main>
  );
}
