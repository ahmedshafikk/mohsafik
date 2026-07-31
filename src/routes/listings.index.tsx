import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { listListings } from "@/lib/content";

export const Route = createFileRoute("/listings/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Dubai Ultra-Prime Villas, Penthouses & Plots" },
      {
        name: "description",
        content:
          "A curated portfolio of Dubai ultra-prime villas, penthouses, hotels and development plots represented by Mohamed Shafik.",
      },
      { property: "og:title", content: "Portfolio — Dubai Ultra-Prime Villas, Penthouses & Plots" },
      {
        property: "og:description",
        content: "Curated ultra-prime Dubai assets with engineering-led due diligence.",
      },
    ],
  }),
  component: ListingsIndex,
});

function ListingsIndex() {
  const { data, isPending, isError } = useQuery({ queryKey: ["listings"], queryFn: listListings });
  const listings = (data ?? []).filter((l) => l.status !== "draft");

  return (
    <SiteLayout>
      <PageHeader
        index="Section 02 / Portfolio"
        title="Represented assets"
        description="Villas, penthouses, hotel assets and development plots — each surveyed on site and documented before release."
      />

      <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-10">
        {isPending && <p className="label-mono text-muted-foreground">Loading portfolio…</p>}
        {isError && (
          <p className="label-mono text-muted-foreground">
            Portfolio unavailable — connect /api/listings to load assets.
          </p>
        )}
        {!isPending && !isError && listings.length === 0 && (
          <p className="label-mono text-muted-foreground">No assets currently released.</p>
        )}

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              to="/listings/$id"
              params={{ id: String(listing.id) }}
              className="group bg-background transition-colors hover:bg-secondary"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {listing.images?.[0] && (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                {listing.type && (
                  <span className="label-mono absolute left-0 top-0 border-b border-r border-brass bg-background px-3 py-2 text-primary">
                    {listing.type}
                  </span>
                )}
              </div>
              <div className="p-6 lg:p-8">
                <p className="label-mono text-brass">{listing.location}</p>
                <h2 className="mt-3 font-display text-2xl text-primary">{listing.title}</h2>
                <p className="mt-4 font-mono text-sm text-foreground/80">{listing.price}</p>
                <dl className="mt-6 flex gap-6 border-t border-border pt-4">
                  {listing.bedrooms != null && (
                    <div>
                      <dt className="label-mono text-muted-foreground">Beds</dt>
                      <dd className="mt-1 font-mono text-sm text-primary">{listing.bedrooms}</dd>
                    </div>
                  )}
                  {listing.bathrooms != null && (
                    <div>
                      <dt className="label-mono text-muted-foreground">Baths</dt>
                      <dd className="mt-1 font-mono text-sm text-primary">{listing.bathrooms}</dd>
                    </div>
                  )}
                  {listing.area && (
                    <div>
                      <dt className="label-mono text-muted-foreground">Area</dt>
                      <dd className="mt-1 font-mono text-sm text-primary">{listing.area}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}