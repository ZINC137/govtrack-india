import { LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui";

export default function AuthPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-5xl place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary"><LockKeyhole className="h-5 w-5" /></span>
          <div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground">JWT-backed authentication with email verification and reset flows.</p>
          </div>
        </div>
        <div className="grid gap-3">
          <input className="min-h-11 rounded-md border bg-background px-3 outline-none" placeholder="Email" type="email" />
          <input className="min-h-11 rounded-md border bg-background px-3 outline-none" placeholder="Password" type="password" />
          <button className="min-h-11 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">Continue</button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <a href="#">Create account</a>
          <a href="#">Reset password</a>
        </div>
      </Card>
    </main>
  );
}
