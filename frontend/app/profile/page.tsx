import { Card } from "@/components/ui";

const sections = {
  "Personal details": ["Full name", "DOB", "Gender", "Category", "Nationality", "Disability status"],
  Education: ["Qualification", "Degree type", "Branch", "Passing year"],
  Experience: ["Total experience", "Sector", "Current role"],
  Preferences: ["Job interests", "Preferred states", "Salary preference"],
  "Notification settings": ["Email alerts", "Deadline reminders", "Admit card alerts", "Result alerts"],
  Privacy: ["Profile visibility", "Data export", "Delete account"]
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">User profile</h1>
      <p className="text-muted-foreground">Profile data powers eligibility, recommendations, and deadline alerts.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Object.entries(sections).map(([title, fields]) => (
          <Card key={title}>
            <h2 className="font-bold">{title}</h2>
            <div className="mt-4 grid gap-3">
              {fields.map((field) => (
                <label key={field} className="text-sm">
                  <span className="mb-1 block text-muted-foreground">{field}</span>
                  <input className="min-h-10 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
