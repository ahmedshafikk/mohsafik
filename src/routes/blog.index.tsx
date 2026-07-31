import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { formatDate, listBlogs } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Mohamed Shafik Dubai Prime Advisory" },
      {
        name: "description",
        content:
          "Notes on Dubai's ultra-prime market: structural due diligence, pricing bands, handover cycles and off-market movement.",
      },
      { property: "og:title", content: "Journal — Mohamed Shafik Dubai Prime Advisory" },
      {
        property: "og:description",
        content: "Engineering-led commentary on Dubai's ultra-prime residential market.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data, isPending, isError } = useQuery({ queryKey: ["blogs"], queryFn: listBlogs });
  const posts = (data ?? []).filter((p) => p.status !== "draft");

  return (
    <SiteLayout>
      <PageHeader
        index="Section 03 / Journal"
        title="Field notes"
        description="Written from site visits, drawing reviews and closing tables across Dubai's prime districts."
      />

      <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-10">
        {isPending && <p className="label-mono text-muted-foreground">Loading entries…</p>}
        {isError && (
          <p className="label-mono text-muted-foreground">
            Journal unavailable — connect /api/blogs to load entries.
          </p>
        )}
        {!isPending && !isError && posts.length === 0 && (
          <p className="label-mono text-muted-foreground">No published entries yet.</p>
        )}

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id ?? post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group bg-background p-6 transition-colors hover:bg-secondary lg:p-8"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="mb-6 aspect-[4/3] w-full object-cover"
                />
              )}
              <p className="label-mono text-brass">{formatDate(post.publishedAt)}</p>
              <h2 className="mt-4 font-display text-2xl leading-snug text-primary">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
              <span className="label-mono mt-6 inline-block text-primary group-hover:text-brass">
                Read entry →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}