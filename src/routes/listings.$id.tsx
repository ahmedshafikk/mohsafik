import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { getListing } from "@/lib/content";

export const Route = createFileRoute("/listings/$id")({
  head: () => ({
    meta: [
      { title: "Asset Detail — Mohamed Shafik Prime Portfolio" },
      {
        name: "description",
        content: "Full specification, gallery and advisory notes for a represented Dubai ultra-prime asset.",
      },
      { property: "og:title", content: "Asset Detail — Mohamed Shafik Prime Portfolio" },
      {
        property: "og:description",
        content: "Full specification and advisory notes for a represented Dubai ultra-prime asset.",
      },
    ],
  }),
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = Route.useParams();
  const [active, setActive] = useState(0);
  const { data: listing, isPending, isError } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListing(id),
  });

  if (isPending || isError || !listing) {
    return (
      <SiteLayout>
        <PageHeader
          index="Portfolio"
          title={isPending ? "Loading…" : "Asset unavailable"}
          description={isPending ? undefined : "Connect /api/listings/:id to load this asset."}
        />
      </SiteLayout>
    );
  }

  const images = listing.images ?? [];
  const specs = [
    ["Type", listing.type],
    ["Location", listing.location],
    ["Bedrooms", listing.bedrooms?.toString()],
    ["Bathrooms", listing.bathrooms?.toString()],
    ["Built area", listing.area],
    ["Reference", listing.reference],
    ["Status", listing.status],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[88rem] px-6 py-12 lg:px-10">
          <Link to="/listings" className="label-mono text-brass">
            ← Portfolio
          </Link>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-muted-foreground">{listing.location}</p>
              <h1 className="display-xl mt-3 text-4xl text-primary md:text-6xl">{listing.title}</h1>
            </div>
            <p className="font-mono text-xl text-primary">{listing.price}</p>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="border-b border-border">
          <img
            src={images[active]}
            alt={listing.title}
            className="h-[420px] w-full object-cover md:h-[640px]"
          />
          {images.length > 1 && (
            <div className="mx-auto flex max-w-[88rem] gap-px overflow-x-auto bg-border px-6 py-px lg:px-10">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-20 w-28 shrink-0 border-2 ${i === active ? "border-brass" : "border-transparent"}`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mx-auto grid max-w-[88rem] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="label-mono text-brass">Description</p>
          <div className="mt-6 space-y-5 whitespace-pre-line text-base leading-relaxed text-foreground/80">
            {listing.description}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-border">
            <p className="label-mono border-b border-border bg-secondary px-6 py-4 text-primary">
              Specification
            </p>
            <dl className="divide-y divide-border">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-6 py-4">
                  <dt className="label-mono text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-sm text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a
            href={`https://wa.me/971527242994?text=${encodeURIComponent(`Hello, I'd like to request the full dossier for: ${listing.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono mt-6 block bg-brass px-6 py-5 text-center text-accent-foreground transition-colors hover:bg-brass-light"
          >
            Request full dossier
          </a>
          {listing.brochureUrl && (
            <a
              href={listing.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono mt-3 block border border-border px-6 py-5 text-center text-primary transition-colors hover:bg-secondary"
            >
              Download brochure
            </a>
          )}
          {listing.link && (
            <a
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono mt-3 block border border-border px-6 py-5 text-center text-primary transition-colors hover:bg-secondary"
            >
              External listing / tour
            </a>
          )}
        </aside>
      </section>
    </SiteLayout>
  );
}