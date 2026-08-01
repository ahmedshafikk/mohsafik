import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
const KEY = "ms_lang";

const dict = {
  en: {
    "nav.index": "Home",
    "nav.portfolio": "Properties",
    "nav.journal": "Insights",
    "nav.consultation": "Book Consultation",
    "nav.navigate": "Navigate",
    "nav.contact": "Contact",
    "brand.role": "RERA Certified Broker",
    "brand.tagline": "Dubai Luxury Real Estate",
    "footer.blurb":
      "Your trusted partner for luxury properties in Dubai. Palm Jumeirah, Emirates Hills, Downtown Dubai and beyond.",
    "footer.rights": "All rights reserved",
    "hero.eyebrow": "Dubai / Luxury Real Estate / RERA Certified",
    "hero.line1": "Find your",
    "hero.line2": "dream home",
    "hero.line3": "in Dubai.",
    "hero.body":
      "RERA-certified broker with over 10 years of experience in Dubai's luxury real estate market. Specializing in Palm Jumeirah, Emirates Hills, and prime Dubai locations.",
    "hero.cta1": "View Properties",
    "hero.cta2": "Request Consultation",
    "lang.toggle": "عربي",
    "theme.dark": "Night",
    "theme.light": "Day",
  },
  ar: {
    "nav.index": "الرئيسية",
    "nav.portfolio": "العقارات",
    "nav.journal": "المقالات",
    "nav.consultation": "حجز استشارة",
    "nav.navigate": "التنقل",
    "nav.contact": "التواصل",
    "brand.role": "وسيط معتمد من ريرا",
    "brand.tagline": "عقارات دبي الفاخرة",
    "footer.blurb": "شريكك الموثوق للعقارات الفاخرة في دبي. نخلة جميرا، تلال الإمارات، وسط دبي وأكثر.",
    "footer.rights": "جميع الحقوق محفوظة",
    "hero.eyebrow": "دبي / عقارات فاخرة / معتمد من ريرا",
    "hero.line1": "اعثر على",
    "hero.line2": "منزل أحلامك",
    "hero.line3": "في دبي.",
    "hero.body":
      "وسيط عقاري معتمد من ريرا مع أكثر من 10 سنوات من الخبرة في سوق العقارات الفاخرة في دبي. متخصص في نخلة جميرا وتلال الإمارات والمواقع الرئيسية في دبي.",
    "hero.cta1": "عرض العقارات",
    "hero.cta2": "طلب استشارة",
    "lang.toggle": "EN",
    "theme.dark": "ليل",
    "theme.light": "نهار",
  },
} satisfies Record<Lang, Record<string, string>>;

export type TKey = keyof (typeof dict)["en"];

const I18nContext = createContext<{ lang: Lang; toggle: () => void; t: (k: TKey) => string }>({
  lang: "en",
  toggle: () => {},
  t: (k) => dict.en[k],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY) as Lang | null;
    if (stored === "ar" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ar" : "en";
      window.localStorage.setItem(KEY, next);
      return next;
    });
  }, []);

  const t = useCallback((k: TKey) => dict[lang][k] ?? dict.en[k], [lang]);

  return <I18nContext.Provider value={{ lang, toggle, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
