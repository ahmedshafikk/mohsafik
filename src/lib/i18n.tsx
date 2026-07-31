import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
const KEY = "ms_lang";

const dict = {
  en: {
    "nav.index": "Index",
    "nav.portfolio": "Portfolio",
    "nav.journal": "Journal",
    "nav.consultation": "Private Consultation",
    "nav.navigate": "Navigate",
    "nav.contact": "Contact",
    "brand.role": "Civil Engineer / Prime Advisory",
    "brand.tagline": "Dubai / Ultra-Prime",
    "footer.blurb":
      "Structural due diligence and discreet representation across Dubai's ultra-prime market.",
    "footer.rights": "All rights reserved",
    "hero.eyebrow": "Dubai / Ultra-Prime / Est. 2014",
    "hero.line1": "Real estate",
    "hero.line2": "read as",
    "hero.line3": "structure.",
    "hero.body":
      "A civil engineer advising private clients on Dubai's most consequential residential and development assets. Drawings, tolerances and load paths — before price.",
    "hero.cta1": "View Portfolio",
    "hero.cta2": "Request Dossier",
    "lang.toggle": "عربي",
    "theme.dark": "Night",
    "theme.light": "Day",
  },
  ar: {
    "nav.index": "الرئيسية",
    "nav.portfolio": "المحفظة",
    "nav.journal": "المدونة",
    "nav.consultation": "استشارة خاصة",
    "nav.navigate": "التنقل",
    "nav.contact": "التواصل",
    "brand.role": "مهندس مدني / استشارات عقارية راقية",
    "brand.tagline": "دبي / العقارات الفائقة",
    "footer.blurb": "تدقيق إنشائي وتمثيل سري في سوق دبي فائق الفخامة.",
    "footer.rights": "جميع الحقوق محفوظة",
    "hero.eyebrow": "دبي / العقارات الفائقة / تأسست 2014",
    "hero.line1": "العقار",
    "hero.line2": "يُقرأ",
    "hero.line3": "كمنشأ.",
    "hero.body":
      "مهندس مدني يقدّم المشورة لعملاء خاصين حول أهم الأصول السكنية والتطويرية في دبي. المخططات والتفاوتات ومسارات الأحمال — قبل السعر.",
    "hero.cta1": "استعرض المحفظة",
    "hero.cta2": "اطلب الملف",
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
