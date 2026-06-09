import { Card } from "@/components/ui";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Contact support</h1>
      <Card className="mt-6">
        <div className="grid gap-3">
          <input className="min-h-11 rounded-md border bg-background px-3 outline-none" placeholder="Email" />
          <input className="min-h-11 rounded-md border bg-background px-3 outline-none" placeholder="Subject" />
          <textarea className="min-h-32 rounded-md border bg-background p-3 outline-none" placeholder="Message" />
          <button className="min-h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Send</button>
        </div>
      </Card>
    </main>
  );
}
