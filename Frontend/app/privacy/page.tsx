import { Card } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Privacy policy</h1>
      <Card className="mt-6 space-y-3 text-muted-foreground">
        <p>GovTrack India stores profile information to provide eligibility matching, saved jobs, reminders, and recommendations.</p>
        <p>Users can update notification preferences, export data, and request account deletion from profile privacy settings.</p>
        <p>Production deployments should configure encrypted transport, secure cookies, database backups, and provider-specific email retention policies.</p>
      </Card>
    </main>
  );
}
