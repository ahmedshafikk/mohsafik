import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, Building2, LogOut, Plus, Pencil, Trash2, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { BlogForm, ListingForm } from "@/components/admin/AdminForms";
import { clearToken, getToken, setToken } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import {
  createBlog,
  createListing,
  deleteBlog,
  deleteListing,
  formatDate,
  listBlogs,
  listListings,
  login,
  updateBlog,
  updateListing,
  type BlogPost,
  type Listing,
} from "@/lib/content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Studio — Mohamed Shafik" },
      {
        name: "description",
        content: "Private studio for publishing Dubai ultra-prime listings and journal entries.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Studio — Mohamed Shafik" },
      { property: "og:description", content: "Private content administration." },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "listings" | "blogs";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setAuthed(Boolean(getToken()));
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  const nav: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "listings", label: "Listings", icon: Building2 },
    { id: "blogs", label: "Journal", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-e border-border bg-sidebar px-5 py-6 lg:flex">
        <div>
          <Link to="/" className="font-display text-lg text-primary">
            Mohamed Shafik<span className="text-brass">.</span>
          </Link>
          <p className="label-mono mt-2 text-brass">Studio</p>
          <nav className="mt-10 space-y-1">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`label-mono flex w-full items-center gap-3 border-s-2 px-4 py-3 text-start transition-colors ${
                  tab === item.id
                    ? "border-brass bg-secondary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-2">
          <button
            type="button"
            onClick={toggle}
            className="label-mono w-full border border-border px-4 py-3 text-muted-foreground hover:text-primary"
          >
            {theme === "dark" ? "Night mode" : "Day mode"}
          </button>
          <button
            type="button"
            onClick={() => {
              clearToken();
              window.location.reload();
            }}
            className="label-mono flex w-full items-center gap-2 border border-border px-4 py-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <div className="flex items-center gap-1 lg:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`label-mono px-3 py-2 ${tab === item.id ? "bg-brass text-accent-foreground" : "text-muted-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="label-mono hidden text-muted-foreground lg:block">
            Content studio / connected to external API
          </p>
          <div className="flex items-center gap-2">
            <Link to="/" className="label-mono border border-border px-4 py-2 text-primary hover:bg-secondary">
              View site
            </Link>
            <button
              type="button"
              onClick={() => {
                clearToken();
                window.location.reload();
              }}
              className="label-mono border border-border px-4 py-2 text-muted-foreground lg:hidden"
            >
              Exit
            </button>
          </div>
        </header>

        <main className="px-6 py-8 lg:px-10">
          {tab === "overview" && <Overview onGo={setTab} />}
          {tab === "listings" && <ListingsPanel />}
          {tab === "blogs" && <BlogsPanel />}
        </main>
      </div>
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      setToken(data.token);
      onSuccess();
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Sign in failed"),
  });

  return (
    <div className="draft-grid flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="w-full max-w-sm border border-border bg-card p-8"
      >
        <p className="label-mono text-brass">Restricted</p>
        <h1 className="display-xl mt-3 text-3xl text-primary">Studio access</h1>
        <label className="mt-8 block">
          <span className="label-mono text-muted-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-brass"
          />
        </label>
        <label className="mt-5 block">
          <span className="label-mono text-muted-foreground">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-brass"
          />
        </label>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="label-mono mt-8 w-full bg-brass py-4 text-accent-foreground transition-colors hover:bg-brass-light disabled:opacity-50"
        >
          {mutation.isPending ? "Verifying…" : "Enter"}
        </button>
        <p className="label-mono mt-4 text-muted-foreground">Authenticates against /api/login</p>
      </form>
    </div>
  );
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border border-border bg-card p-6">
      <p className="font-display text-4xl text-primary">{value}</p>
      <p className="label-mono mt-3 text-brass">{label}</p>
    </div>
  );
}

function Overview({ onGo }: { onGo: (t: Tab) => void }) {
  const blogs = useQuery({ queryKey: ["blogs"], queryFn: listBlogs });
  const listings = useQuery({ queryKey: ["listings"], queryFn: listListings });

  const stats = useMemo(() => {
    const b = blogs.data ?? [];
    const l = listings.data ?? [];
    return {
      published: b.filter((p) => p.status === "published").length,
      drafts: b.filter((p) => p.status !== "published").length,
      live: l.filter((x) => x.status === "available").length,
      total: l.length,
    };
  }, [blogs.data, listings.data]);

  return (
    <div>
      <p className="label-mono text-brass">Section 00 / Overview</p>
      <h1 className="display-xl mt-4 text-4xl text-primary md:text-5xl">Publishing desk</h1>
      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={stats.total} label="Listings on file" />
        <StatCard value={stats.live} label="Available now" />
        <StatCard value={stats.published} label="Published entries" />
        <StatCard value={stats.drafts} label="Journal drafts" />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onGo("listings")}
          className="label-mono flex items-center gap-2 bg-brass px-6 py-4 text-accent-foreground hover:bg-brass-light"
        >
          <Plus className="size-4" /> New listing
        </button>
        <button
          type="button"
          onClick={() => onGo("blogs")}
          className="label-mono flex items-center gap-2 border border-border px-6 py-4 text-primary hover:bg-secondary"
        >
          <Plus className="size-4" /> New journal entry
        </button>
      </div>
    </div>
  );
}

function RowActions({
  onEdit,
  onDelete,
  onToggle,
  published,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  published: boolean;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onToggle}
        title={published ? "Unpublish" : "Publish"}
        className="label-mono flex items-center gap-2 border border-brass px-3 py-2 text-brass hover:bg-brass hover:text-accent-foreground"
      >
        {published ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
        {published ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        onClick={onEdit}
        title="Edit"
        className="border border-border p-2 text-primary hover:bg-secondary"
      >
        <Pencil className="size-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="border border-destructive p-2 text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

function BlogsPanel() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Partial<BlogPost> | null>(null);
  const { data, isPending, isError } = useQuery({ queryKey: ["blogs"], queryFn: listBlogs });

  const save = useMutation({
    mutationFn: (post: Partial<BlogPost>) => (post.id ? updateBlog(post.id, post) : createBlog(post)),
    onSuccess: (_d, post) => {
      toast.success(post.status === "published" ? "Entry published" : "Entry saved as draft");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Save failed"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Entry deleted");
      qc.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Delete failed"),
  });

  return (
    <div className="grid gap-10 xl:grid-cols-2">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-mono text-brass">Section 02 / Journal</p>
            <h1 className="display-xl mt-3 text-3xl text-primary">Write & publish</h1>
          </div>
          <button
            type="button"
            onClick={() => setDraft({ status: "draft" })}
            className="label-mono flex items-center gap-2 bg-brass px-5 py-3 text-accent-foreground hover:bg-brass-light"
          >
            <Plus className="size-4" /> New entry
          </button>
        </div>
        {isPending && <p className="label-mono mt-6 text-muted-foreground">Loading…</p>}
        {isError && <p className="label-mono mt-6 text-muted-foreground">Could not reach /api/blogs</p>}
        <ul className="mt-6 divide-y divide-border border border-border bg-card">
          {(data ?? []).map((post) => (
            <li key={post.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
              <div className="min-w-0">
                <p className="truncate font-display text-lg text-primary">{post.title}</p>
                <p className="label-mono mt-1 text-muted-foreground">
                  {post.status ?? "draft"} · {formatDate(post.publishedAt) || "unscheduled"}
                </p>
              </div>
              <RowActions
                published={post.status === "published"}
                onEdit={() => setDraft(post)}
                onDelete={() => remove.mutate(post.id)}
                onToggle={() =>
                  save.mutate({
                    ...post,
                    status: post.status === "published" ? "draft" : "published",
                    publishedAt: post.publishedAt ?? new Date().toISOString(),
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        {draft ? (
          <BlogForm
            value={draft}
            onChange={setDraft}
            onSubmit={() => save.mutate(draft)}
            onCancel={() => setDraft(null)}
            saving={save.isPending}
            onPublish={() =>
              save.mutate({
                ...draft,
                status: "published",
                publishedAt: draft.publishedAt ?? new Date().toISOString(),
              })
            }
          />
        ) : (
          <p className="label-mono border border-dashed border-border p-8 text-muted-foreground">
            Select an entry to edit, or create a new one.
          </p>
        )}
      </section>
    </div>
  );
}

function ListingsPanel() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Partial<Listing> | null>(null);
  const { data, isPending, isError } = useQuery({ queryKey: ["listings"], queryFn: listListings });

  const save = useMutation({
    mutationFn: (listing: Partial<Listing>) =>
      listing.id ? updateListing(listing.id, listing) : createListing(listing),
    onSuccess: (_d, listing) => {
      toast.success(listing.status === "draft" ? "Listing saved as draft" : "Listing published");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Save failed"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: () => {
      toast.success("Listing deleted");
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Delete failed"),
  });

  return (
    <div className="grid gap-10 xl:grid-cols-2">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-mono text-brass">Section 01 / Portfolio</p>
            <h1 className="display-xl mt-3 text-3xl text-primary">Listings</h1>
          </div>
          <button
            type="button"
            onClick={() => setDraft({ status: "draft", type: "Villa", images: [] })}
            className="label-mono flex items-center gap-2 bg-brass px-5 py-3 text-accent-foreground hover:bg-brass-light"
          >
            <Plus className="size-4" /> New listing
          </button>
        </div>
        {isPending && <p className="label-mono mt-6 text-muted-foreground">Loading…</p>}
        {isError && <p className="label-mono mt-6 text-muted-foreground">Could not reach /api/listings</p>}
        <ul className="mt-6 divide-y divide-border border border-border bg-card">
          {(data ?? []).map((listing) => (
            <li key={listing.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
              <div className="flex min-w-0 items-center gap-4">
                {listing.images?.[0] && (
                  <img src={listing.images[0]} alt="" className="h-14 w-20 shrink-0 object-cover" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-display text-lg text-primary">{listing.title}</p>
                  <p className="label-mono mt-1 text-muted-foreground">
                    {listing.status ?? "draft"} · {listing.location ?? "—"} · {listing.price ?? "POA"}
                  </p>
                </div>
              </div>
              <RowActions
                published={listing.status === "available"}
                onEdit={() => setDraft(listing)}
                onDelete={() => remove.mutate(listing.id)}
                onToggle={() =>
                  save.mutate({
                    ...listing,
                    status: listing.status === "available" ? "draft" : "available",
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        {draft ? (
          <ListingForm
            value={draft}
            onChange={setDraft}
            onSubmit={() => save.mutate(draft)}
            onCancel={() => setDraft(null)}
            saving={save.isPending}
            onPublish={() => save.mutate({ ...draft, status: "available" })}
          />
        ) : (
          <p className="label-mono border border-dashed border-border p-8 text-muted-foreground">
            Select a listing to edit, or create a new one.
          </p>
        )}
      </section>
    </div>
  );
}
