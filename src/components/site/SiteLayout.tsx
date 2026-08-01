import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n, type TKey } from "@/lib/i18n";

const nav = [
  { to: "/", key: "nav.index" as TKey },
  { to: "/listings", key: "nav.portfolio" as TKey },
  { to: "/blog", key: "nav.journal" as TKey },
];

function Controls() {
  const { theme, toggle } = useTheme();
  const { t, toggle: toggleLang } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle color theme"
        className="label-mono flex items-center gap-2 rounded-full border border-brass px-4 py-2 text-brass transition-colors hover:bg-brass hover:text-accent-foreground"
      >
        {theme === "dark" ? <Moon className="size-3" /> : <Sun className="size-3" />}
        {theme === "dark" ? t("theme.dark") : t("theme.light")}
      </button>
      <button
        type="button"
        onClick={toggleLang}
        aria-label="Switch language"
        className="label-mono rounded-full border border-brass px-4 py-2 text-brass transition-colors hover:bg-brass hover:text-accent-foreground"
      >
        {t("lang.toggle")}
      </button>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-lg tracking-tight text-primary">
            Mohamed Shafik<span className="text-brass">.</span>
          </span>
          <span className="label-mono hidden text-muted-foreground sm:inline">{t("brand.tagline")}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="label-mono text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "label-mono text-primary" }}
            >
              {t(item.key)}
            </Link>
          ))}
          <Controls />
          <a
            href="mailto:advisory@mohamedshafik.ae"
            className="label-mono border border-brass bg-brass px-4 py-2 text-accent-foreground transition-colors hover:bg-brass-light"
          >
            {t("nav.consultation")}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Controls />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="border border-border p-2 text-primary"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
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
              {t(item.key)}
            </Link>
          ))}
          <a
            href="mailto:advisory@mohamedshafik.ae"
            className="label-mono mt-4 block bg-brass px-4 py-3 text-center text-accent-foreground"
          >
            {t("nav.consultation")}
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-petrol-deep text-limestone">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-16 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-2xl">
            Mohamed Shafik<span className="text-brass">.</span>
          </p>
          <p className="label-mono mt-3 text-brass-light">{t("brand.role")}</p>
          <p className="mt-4 max-w-xs text-sm text-limestone/70">{t("footer.blurb")}</p>
        </div>
        <div>
          <p className="label-mono text-brass-light">{t("nav.navigate")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-limestone/80 transition-colors hover:text-brass-light">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono text-brass-light">{t("nav.contact")}</p>
          <ul className="mt-4 space-y-2 text-sm text-limestone/80">
            <li>advisory@mohamedshafik.ae</li>
            <li>
              <a href="https://wa.me/971527242994" target="_blank" rel="noopener noreferrer" className="hover:text-brass transition-colors">
                +971 52 724 2994
              </a>
            </li>
            <li>DIFC, Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-limestone/10 px-6 py-6 lg:px-10">
        <p className="label-mono mx-auto max-w-[88rem] text-limestone/50">
          © {new Date().getFullYear()} Mohamed Shafik — {t("footer.rights")}
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