import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Index" },
  { to: "/listings", label: "Portfolio" },
  { to: "/blog", label: "Journal" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-lg tracking-tight text-primary">Mohamed Shafik</span>
          <span className="label-mono hidden text-muted-foreground sm:inline">Dubai / Ultra-Prime</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="label-mono text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "label-mono text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="mailto:advisory@mohamedshafik.ae"
            className="label-mono border border-primary bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-petrol-light"
          >
            Private Consultation
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="border border-border p-2 text-primary md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="label-mono block border-b border-border py-3 text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="mailto:advisory@mohamedshafik.ae"
            className="label-mono mt-4 block bg-primary px-4 py-3 text-center text-primary-foreground"
          >
            Private Consultation
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-petrol-deep text-limestone">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-16 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-2xl">Mohamed Shafik</p>
          <p className="label-mono mt-3 text-brass-light">Civil Engineer / Prime Advisory</p>
          <p className="mt-4 max-w-xs text-sm text-limestone/70">
            Structural due diligence and discreet representation across Dubai's ultra-prime market.
          </p>
        </div>
        <div>
          <p className="label-mono text-brass-light">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-limestone/80 transition-colors hover:text-brass-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono text-brass-light">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-limestone/80">
            <li>advisory@mohamedshafik.ae</li>
            <li>+971 4 000 0000</li>
            <li>DIFC, Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-limestone/10 px-6 py-6 lg:px-10">
        <p className="label-mono mx-auto max-w-[88rem] text-limestone/50">
          © {new Date().getFullYear()} Mohamed Shafik — All rights reserved
        </p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string | undefined;
}) {
  return (
    <section className="draft-grid border-b border-border">
      <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-10">
        <p className="label-mono text-brass">{index}</p>
        <h1 className="display-xl mt-4 text-5xl text-primary md:text-7xl">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-base text-muted-foreground">{description}</p>}
      </div>
    </section>
  );
}