import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { formatDate, getBlog } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Journal Entry — Mohamed Shafik" },
      { name: "description", content: "An entry from the Mohamed Shafik Dubai prime advisory journal." },
      { property: "og:title", content: "Journal Entry — Mohamed Shafik" },
      {
        property: "og:description",
        content: "An entry from the Mohamed Shafik Dubai prime advisory journal.",
      },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data: post, isPending, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlog(slug),
  });

  if (isPending || isError || !post) {
    return (
      <SiteLayout>
        <PageHeader
          index="Journal"
          title={isPending ? "Loading…" : "Entry unavailable"}
          description={isPending ? undefined : "Connect /api/blogs/:slug to load this entry."}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article>
        <header className="draft-grid border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <Link to="/blog" className="label-mono text-brass">
              ← Journal
            </Link>
            <h1 className="display-xl mt-6 text-4xl text-primary md:text-6xl">{post.title}</h1>
            <p className="label-mono mt-6 text-muted-foreground">{formatDate(post.publishedAt)}</p>
          </div>
        </header>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-[380px] w-full border-b border-border object-cover md:h-[560px]"
          />
        )}

        <div className="mx-auto max-w-3xl px-6 py-16">
          {post.excerpt && (
            <p className="border-l border-brass pl-6 font-display text-xl leading-relaxed text-primary">
              {post.excerpt}
            </p>
          )}
          <div
            className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80 [&_a]:text-brass [&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-primary [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-primary [&_img]:w-full [&_li]:ml-5 [&_li]:list-disc"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />
        </div>
      </article>
    </SiteLayout>
  );
}