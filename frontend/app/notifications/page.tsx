import { BellRing, Check } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { notifications } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Notification center</h1>
      <p className="text-muted-foreground">Vacancy alerts, deadlines, admit cards, and result announcements.</p>
      <div className="mt-6 space-y-3">
        {notifications.map((item, index) => (
          <Card key={item} className="flex items-start gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary"><BellRing className="h-4 w-4" /></span>
            <div className="flex-1">
              <Badge tone={index === 0 ? "warn" : "neutral"}>{index === 0 ? "Unread" : "Read"}</Badge>
              <h2 className="mt-2 font-bold">{item}</h2>
              <p className="text-sm text-muted-foreground">Configured for in-app and email delivery.</p>
            </div>
            <button aria-label="Mark as read" className="grid h-9 w-9 place-items-center rounded-md border"><Check className="h-4 w-4" /></button>
          </Card>
        ))}
      </div>
    </main>
  );
}
