import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Elevation } from "@/components/site/Elevation";
import heroImage from "@/assets/hero-villa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Shafik — Dubai Ultra-Prime Real Estate Advisory" },
      {
        name: "description",
        content:
          "Civil engineer turned prime advisor. Structural due diligence and discreet representation across Dubai's ultra-prime villas, penthouses and development plots.",
      },
      { property: "og:title", content: "Mohamed Shafik — Dubai Ultra-Prime Real Estate Advisory" },
      {
        property: "og:description",
        content: "Engineering-led advisory for Dubai's ultra-prime residential and development market.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "AED 2.1B", label: "Transacted value" },
  { value: "140+", label: "Prime mandates" },
  { value: "11 yrs", label: "Civil engineering" },
  { value: "38", label: "Off-market listings" },
];

const mandate = [
  {
    no: "01",
    title: "Structural Reading",
    body: "Every asset is assessed as a structure first — slab spans, envelope performance, service risers, remediation exposure. Engineering fact before sales narrative.",
  },
  {
    no: "02",
    title: "Market Positioning",
    body: "Comparables drawn from settled transactions, not aspirations. Pricing bands modelled per tower line, plot orientation and handover cycle.",
  },
  {
    no: "03",
    title: "Discreet Execution",
    body: "Off-market introductions, controlled disclosure and closing coordination with counsel, escrow and developer relations teams.",
  },
];

const process = [
  { no: "A", title: "Brief", body: "Objectives, hold horizon and structural tolerance defined in writing." },
  { no: "B", title: "Survey", body: "Shortlist drawn from on and off-market inventory, verified on site." },
  { no: "C", title: "Diligence", body: "Technical, title and service-charge review issued as one dossier." },
  { no: "D", title: "Close", body: "Negotiation, escrow sequencing and post-handover snag oversight." },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-6 pb-16 pt-16 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-6">
            <p className="label-mono text-brass">Dubai / Ultra-Prime / Est. 2014</p>
            <h1 className="display-xl mt-6 text-6xl text-primary md:text-8xl">
              Real estate
              <br />
              read as
              <br />
              <em className="italic text-brass">structure.</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              A civil engineer advising private clients on Dubai's most consequential residential and
              development assets. Drawings, tolerances and load paths — before price.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/listings"
                className="label-mono border border-primary bg-primary px-6 py-4 text-primary-foreground transition-colors hover:bg-petrol-light"
              >
                View Portfolio
              </Link>
              <a
                href="mailto:advisory@mohamedshafik.ae"
                className="label-mono border border-primary px-6 py-4 text-primary transition-colors hover:bg-secondary"
              >
                Request Dossier
              </a>
            </div>
            <Elevation className="mt-14 hidden h-40 w-full max-w-md text-petrol/50 lg:block" />
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <img
                src={heroImage}
                alt="Ultra-prime Dubai villa elevation at dusk with limestone fins and reflecting pool"
                width={1920}
                height={1280}
                className="h-[420px] w-full object-cover md:h-[600px]"
              />
              <div className="absolute -bottom-px left-0 border-t border-r border-brass bg-background px-5 py-3">
                <p className="label-mono text-muted-foreground">Plate 01 — Emirates Hills</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-petrol-deep text-limestone">
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-limestone/10 px-6 py-10 lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0">
              <p className="font-display text-4xl text-brass-light md:text-5xl">{s.value}</p>
              <p className="label-mono mt-3 text-limestone/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mandate */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[88rem] px-6 py-24 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display-xl max-w-xl text-4xl text-primary md:text-6xl">The mandate</h2>
            <p className="label-mono text-brass">Section 01 / Method</p>
          </div>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {mandate.map((m) => (
              <article key={m.no} className="bg-background p-8 lg:p-10">
                <p className="label-mono text-brass">{m.no}</p>
                <h3 className="mt-6 font-display text-2xl text-primary">{m.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="draft-grid border-b border-border">
        <div className="mx-auto max-w-[88rem] px-6 py-24 lg:px-10">
          <p className="label-mono text-brass">Section 02 / Sequence</p>
          <h2 className="display-xl mt-4 max-w-xl text-4xl text-primary md:text-6xl">
            Four drawings, one close
          </h2>
          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.no} className="rule-tick pl-6">
                <p className="label-mono text-brass">Step {p.no}</p>
                <h3 className="mt-4 font-display text-2xl text-primary">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="label-mono text-brass-light">Private consultation</p>
            <h2 className="display-xl mt-4 max-w-xl text-4xl md:text-5xl">
              Bring the drawing set. We'll read it together.
            </h2>
          </div>
          <a
            href="mailto:advisory@mohamedshafik.ae"
            className="label-mono w-fit border border-brass bg-brass px-8 py-4 text-accent-foreground transition-colors hover:bg-brass-light"
          >
            advisory@mohamedshafik.ae
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
