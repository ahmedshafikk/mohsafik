import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Elevation } from "@/components/site/Elevation";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Shafik — Dubai Ultra-Prime Real Estate Advisory" },
      {
        name: "description",
        content:
          "RERA-certified broker with 10+ years in Dubai's ultra-prime market. Specializing in Palm Jumeirah, Emirates Hills, and Downtown Dubai luxury properties.",
      },
      { property: "og:title", content: "Mohamed Shafik — Dubai Ultra-Prime Real Estate Advisory" },
      {
        property: "og:description",
        content: "Expert advisory for Dubai's ultra-prime residential and development market.",
      },
    ],
  }),
  component: Index,
});

// Stats with numeric values for animation
const stats = [
  { value: 850, prefix: "AED ", suffix: "M+", label: "Transaction volume", decimals: 0 },
  { value: 200, prefix: "", suffix: "+", label: "Properties sold", decimals: 0 },
  { value: 10, prefix: "", suffix: "+ yrs", label: "Market experience", decimals: 0 },
  { value: 45, prefix: "", suffix: "", label: "Off-market listings", decimals: 0 },
];

const mandate = [
  {
    no: "01",
    title: "Market Intelligence",
    body: "Deep knowledge of Palm Jumeirah, Emirates Hills, Dubai Hills, and Downtown Dubai. Real-time pricing data and off-market opportunities unavailable elsewhere.",
  },
  {
    no: "02",
    title: "Client-First Approach",
    body: "Whether buying your dream villa or maximizing sale value, every decision is guided by your goals. Transparent communication at every stage.",
  },
  {
    no: "03",
    title: "End-to-End Service",
    body: "From property search to key handover — negotiations, legal coordination, mortgage assistance, and post-sale support all handled seamlessly.",
  },
];

const process = [
  { no: "A", title: "Consultation", body: "Understanding your requirements, budget, and timeline in detail." },
  { no: "B", title: "Curated Selection", body: "Handpicked properties matching your criteria, including exclusive off-market listings." },
  { no: "C", title: "Due Diligence", body: "Comprehensive property verification, title deed checks, and market valuation." },
  { no: "D", title: "Seamless Closing", body: "Expert negotiation, paperwork handling, and smooth ownership transfer." },
];

// Animated counter component
function AnimatedStat({ value, prefix = "", suffix = "", label, decimals = 0, delay = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = value * easeOut;

        setCount(Number(current.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, value, decimals, delay]);

  return (
    <div ref={ref} className="border-b border-limestone/10 px-6 py-10 lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0">
      <p className="font-display text-4xl text-brass-light md:text-5xl">
        {prefix}{count}{suffix}
      </p>
      <p className="label-mono mt-3 text-limestone/60">{label}</p>
    </div>
  );
}

function Index() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-6 pb-16 pt-16 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-6">
            <p className="label-mono text-brass">{t("hero.eyebrow")}</p>
            <h1 className="display-xl mt-6 text-6xl text-primary md:text-8xl">
              {t("hero.line1")}
              <br />
              {t("hero.line2")}
              <br />
              <em className="italic text-brass">{t("hero.line3")}</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">{t("hero.body")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/listings"
                className="label-mono border border-brass bg-brass px-6 py-4 text-accent-foreground transition-colors hover:bg-brass-light"
              >
                {t("hero.cta1")}
              </Link>
              <a
                href="https://wa.me/971527242994?text=Hello%2C%20I%27d%20like%20to%20request%20a%20full%20dossier"
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono border border-border px-6 py-4 text-primary transition-colors hover:bg-secondary"
              >
                {t("hero.cta2")}
              </a>
            </div>
            <Elevation className="mt-14 hidden h-40 w-full max-w-md text-brass/40 lg:block" />
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-brass/60 p-1">
              <img
                src="/mohamed-shafik-portrait.png"
                alt="Mohamed Shafik, RERA-certified luxury real estate broker in Dubai"
                width={1200}
                height={1500}
                className="h-[420px] w-full object-cover object-top grayscale md:h-[600px]"
              />
              <div className="absolute bottom-1 right-1 border-t border-l border-brass bg-background px-5 py-3">
                <p className="label-mono text-muted-foreground">Mohamed Shafik</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-petrol-deep text-limestone">
        <div className="mx-auto grid max-w-[88rem] grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <AnimatedStat
              key={s.label}
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
              decimals={s.decimals}
              delay={i * 150}
            />
          ))}
        </div>
      </section>

      {/* Mandate */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[88rem] px-6 py-24 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display-xl max-w-xl text-4xl text-primary md:text-6xl">Why work with me</h2>
            <p className="label-mono text-brass">Section 01 / Expertise</p>
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
          <p className="label-mono text-brass">Section 02 / Process</p>
          <h2 className="display-xl mt-4 max-w-xl text-4xl text-primary md:text-6xl">
            How we work together
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
            <p className="label-mono text-brass-light">Free consultation</p>
            <h2 className="display-xl mt-4 max-w-xl text-4xl md:text-5xl">
              Ready to find your perfect property in Dubai?
            </h2>
          </div>
          <a
            href="https://wa.me/971527242994?text=Hello%2C%20I%27d%20like%20to%20schedule%20a%20free%20consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono w-fit border border-brass bg-brass px-8 py-4 text-accent-foreground transition-colors hover:bg-brass-light"
          >
            Book a consultation
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
