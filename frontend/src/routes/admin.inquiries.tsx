import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Archive, LogOut, Search } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ApiError, apiRequest } from "@/lib/api";
import { SITE } from "@/lib/constants";
import { noIndexHead } from "@/lib/seo";

type InquiryStatus = "new" | "read" | "replied" | "archived";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  company: string | null;
  country: string | null;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export const Route = createFileRoute("/admin/inquiries")({
  component: AdminInquiriesPage,
  head: () =>
    noIndexHead(
      `Admin Inquiries | ${SITE.name}`,
      "Manage contact inquiries and responses.",
      "/admin/inquiries",
    ),
});

function AdminInquiriesPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("");
  const [items, setItems] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | InquiryStatus>("");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    void bootstrap();
  }, []);

  useEffect(() => {
    if (!loading) {
      void fetchInquiries(1);
    }
  }, [status]);

  async function bootstrap() {
    try {
      const auth = await apiRequest<{ admin: { name: string } }>("/api/admin/me");
      setAdminName(auth.data.admin.name);
      await fetchInquiries(1);
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) {
        void navigate({ to: "/admin/login" });
        return;
      }
      setError(cause instanceof Error ? cause.message : "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchInquiries(page = 1) {
    try {
      setError(null);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.limit),
      });

      if (search.trim()) params.set("search", search.trim());
      if (status) params.set("status", status);

      const response = await apiRequest<{ items: Inquiry[]; pagination: Pagination }>(
        `/api/admin/inquiries?${params.toString()}`,
      );

      setItems(response.data.items);
      setPagination(response.data.pagination);

      if (selected) {
        const nextSelected =
          response.data.items.find((item) => item.id === selected.id) ?? response.data.items[0] ?? null;
        setSelected(nextSelected);
      } else {
        setSelected(response.data.items[0] ?? null);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load inquiries.");
    }
  }

  async function openInquiry(id: number) {
    try {
      const response = await apiRequest<Inquiry>(`/api/admin/inquiries/${id}`);
      setSelected(response.data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to open inquiry.");
    }
  }

  async function updateStatus(nextStatus: InquiryStatus) {
    if (!selected) return;

    try {
      await apiRequest<null>(`/api/admin/inquiries/${selected.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      await fetchInquiries(pagination.page);
      await openInquiry(selected.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update inquiry status.");
    }
  }

  async function archiveInquiry() {
    if (!selected) return;

    try {
      await apiRequest<null>(`/api/admin/inquiries/${selected.id}`, {
        method: "DELETE",
      });
      setSelected(null);
      await fetchInquiries(pagination.page);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to archive inquiry.");
    }
  }

  async function logout() {
    try {
      await apiRequest<null>("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      void navigate({ to: "/admin/login" });
    }
  }

  if (loading) {
    return (
      <section className="section-surface-neutral section-pad pt-36 md:pt-44">
        <div className="container-x">
          <div className="font-body text-muted-foreground">Loading admin dashboard...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-surface-neutral section-pad pt-36 md:pt-44">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel number="01" label="Admin Inquiries" />
            <h1 className="mt-5 font-display text-5xl tracking-tight">Inquiry Dashboard</h1>
            <p className="mt-3 font-body text-muted-foreground">
              Signed in as {adminName || "Admin"}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border-strong px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 font-body text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void fetchInquiries(1);
                }
              }}
              className="w-full rounded-2xl border border-border-strong bg-surface px-12 py-4 font-body text-base outline-none transition-colors focus:border-primary"
              placeholder="Search by name, email, subject, or message"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "" | InquiryStatus)}
            className="rounded-2xl border border-border-strong bg-surface px-5 py-4 font-body text-base outline-none transition-colors focus:border-primary"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          <GlowButton size="md" onClick={() => void fetchInquiries(1)}>
            Search
          </GlowButton>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="card-premium rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {pagination.total} total inquiries
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Page {pagination.page}
              </div>
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border-strong px-5 py-6 font-body text-sm text-muted-foreground">
                  No inquiries found for the current filters.
                </div>
              ) : (
                items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => void openInquiry(item.id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${
                      selected?.id === item.id
                        ? "border-primary bg-primary/10"
                        : "border-border-strong hover:border-foreground/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-display text-2xl tracking-tight">{item.name}</div>
                        <div className="mt-1 font-body text-sm text-muted-foreground">{item.email}</div>
                      </div>
                      <span className="rounded-full border border-border-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 line-clamp-2 font-body text-sm text-muted-foreground">
                      {item.subject || "No subject"} - {item.message}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="card-premium rounded-3xl p-6">
            {selected ? (
              <>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-3xl tracking-tight">{selected.name}</div>
                    <div className="mt-2 font-body text-sm text-muted-foreground">{selected.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void archiveInquiry()}
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                  >
                    <Archive size={14} />
                    Archive
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Detail label="Phone" value={selected.phone || "Not provided"} />
                  <Detail label="Country" value={selected.country || "Not provided"} />
                  <Detail label="Budget" value={selected.budget || "Not provided"} />
                  <Detail label="Subject" value={selected.subject || "Not provided"} />
                </div>

                <div className="mt-6">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Message
                  </div>
                  <div className="rounded-2xl border border-border-strong bg-surface px-5 py-4 font-body text-sm leading-7 text-foreground">
                    {selected.message}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Update status
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "read", "replied", "archived"] as InquiryStatus[]).map((nextStatus) => (
                      <button
                        key={nextStatus}
                        type="button"
                        onClick={() => void updateStatus(nextStatus)}
                        className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                          selected.status === nextStatus
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border-strong text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {nextStatus}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border-strong px-5 py-6 font-body text-sm text-muted-foreground">
                Select an inquiry to view its full details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-strong bg-surface px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-body text-sm text-foreground">{value}</div>
    </div>
  );
}
