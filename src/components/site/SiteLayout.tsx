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

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971527242994?text=Hello%2C%20I%27m%20interested%20in%20your%20properties"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-white shadow-lg transition-all hover:scale-110 hover:bg-brass-light hover:shadow-xl"
      aria-label="Contact on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
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