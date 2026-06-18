import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowButton } from "@/components/ui/GlowButton";
import { SITE } from "@/lib/constants";
import { ApiError, apiRequest } from "@/lib/api";
import { noIndexHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () =>
    noIndexHead(
      `Admin Login | ${SITE.name}`,
      "Secure admin access for inquiry management.",
      "/admin/login",
    ),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      setSubmitting(true);
      await apiRequest<{ admin: { id: number; name: string; email: string } }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      void navigate({ to: "/admin/inquiries" });
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-surface-neutral section-pad pt-36 md:pt-44">
      <div className="container-x max-w-xl">
        <SectionLabel number="01" label="Admin" />
        <div className="card-premium mt-8 rounded-3xl p-8 md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 className="font-display text-4xl tracking-tight">Admin Login</h1>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Sign in to review and manage website inquiries.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border-strong bg-surface px-5 py-4 font-body text-base outline-none transition-colors focus:border-primary"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-border-strong bg-surface px-5 py-4 font-body text-base outline-none transition-colors focus:border-primary"
                placeholder="Your secure password"
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 font-body text-sm text-destructive">
                {error}
              </div>
            )}

            <GlowButton size="lg" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </GlowButton>
          </form>
        </div>
      </div>
    </section>
  );
}
