import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BlogForm, ListingForm } from "@/components/admin/AdminForms";
import { clearToken, getToken, setToken } from "@/lib/api";
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
      { title: "Admin — Mohamed Shafik" },
      { name: "description", content: "Private content administration for journal entries and listings." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Mohamed Shafik" },
      { property: "og:description", content: "Private content administration." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(Boolean(getToken()));
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:px-10">
        <Link to="/" className="font-display text-lg text-primary">
          Mohamed Shafik <span className="label-mono text-brass">/ Admin</span>
        </Link>
        {authed && (
          <button
            type="button"
            onClick={() => {
              clearToken();
              setAuthed(false);
            }}
            className="label-mono border border-border px-4 py-2 text-primary hover:bg-secondary"
          >
            Sign out
          </button>
        )}
      </header>
      {authed ? <Dashboard /> : <LoginScreen onSuccess={() => setAuthed(true)} />}
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
    <div className="draft-grid flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="w-full max-w-sm border border-border bg-background p-8"
      >
        <p className="label-mono text-brass">Restricted</p>
        <h1 className="display-xl mt-3 text-3xl text-primary">Sign in</h1>
        <label className="mt-8 block">
          <span className="label-mono text-muted-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-brass"
          />
        </label>
        <label className="mt-5 block">
          <span className="label-mono text-muted-foreground">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-brass"
          />
        </label>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="label-mono mt-8 w-full bg-primary py-4 text-primary-foreground transition-colors hover:bg-petrol-light disabled:opacity-50"
        >
          {mutation.isPending ? "Verifying…" : "Enter"}
        </button>
        <p className="label-mono mt-4 text-muted-foreground">Authenticates against /api/login</p>
      </form>
    </div>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<"blogs" | "listings">("blogs");

  return (
    <div className="mx-auto max-w-[88rem] px-6 py-10 lg:px-10">
      <div className="flex gap-px bg-border">
        {(["blogs", "listings"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`label-mono px-6 py-3 ${tab === t ? "bg-primary text-primary-foreground" : "bg-background text-primary"}`}
          >
            {t === "blogs" ? "Journal" : "Listings"}
          </button>
        ))}
      </div>
      <div className="mt-8">{tab === "blogs" ? <BlogsPanel /> : <ListingsPanel />}</div>
    </div>
  );
}

function BlogsPanel() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Partial<BlogPost> | null>(null);
  const { data, isPending, isError } = useQuery({ queryKey: ["blogs"], queryFn: listBlogs });

  const save = useMutation({
    mutationFn: (post: Partial<BlogPost>) =>
      post.id ? updateBlog(post.id, post) : createBlog(post),
    onSuccess: () => {
      toast.success("Entry saved");
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
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-primary">Journal entries</h2>
          <button
            type="button"
            onClick={() => setDraft({ status: "draft" })}
            className="label-mono border border-primary px-4 py-2 text-primary hover:bg-secondary"
          >
            New entry
          </button>
        </div>
        {isPending && <p className="label-mono mt-6 text-muted-foreground">Loading…</p>}
        {isError && <p className="label-mono mt-6 text-muted-foreground">Could not reach /api/blogs</p>}
        <ul className="mt-6 divide-y divide-border border border-border">
          {(data ?? []).map((post) => (
            <li key={post.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-display text-lg text-primary">{post.title}</p>
                <p className="label-mono text-muted-foreground">
                  {post.status ?? "draft"} · {formatDate(post.publishedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDraft(post)}
                  className="label-mono border border-border px-3 py-2 text-primary hover:bg-secondary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove.mutate(post.id)}
                  className="label-mono border border-destructive px-3 py-2 text-destructive"
                >
                  Delete
                </button>
              </div>
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
    onSuccess: () => {
      toast.success("Listing saved");
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
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-primary">Listings</h2>
          <button
            type="button"
            onClick={() => setDraft({ status: "draft", type: "Villa", images: [] })}
            className="label-mono border border-primary px-4 py-2 text-primary hover:bg-secondary"
          >
            New listing
          </button>
        </div>
        {isPending && <p className="label-mono mt-6 text-muted-foreground">Loading…</p>}
        {isError && <p className="label-mono mt-6 text-muted-foreground">Could not reach /api/listings</p>}
        <ul className="mt-6 divide-y divide-border border border-border">
          {(data ?? []).map((listing) => (
            <li key={listing.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-display text-lg text-primary">{listing.title}</p>
                <p className="label-mono text-muted-foreground">
                  {listing.status ?? "draft"} · {listing.location} · {listing.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDraft(listing)}
                  className="label-mono border border-border px-3 py-2 text-primary hover:bg-secondary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove.mutate(listing.id)}
                  className="label-mono border border-destructive px-3 py-2 text-destructive"
                >
                  Delete
                </button>
              </div>
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