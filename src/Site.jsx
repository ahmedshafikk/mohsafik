import React, { useState, useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Tokens — white & gold (light) / black & gold (dark)                */
/* ------------------------------------------------------------------ */
const THEMES = {
  light: {
    bg: "#FFFFFF",
    bgSoft: "rgba(10,10,10,0.03)",
    grid: "#F0EDE4",
    ink: "#0A0A0A",
    ink60: "rgba(10,10,10,.62)",
    ink30: "rgba(10,10,10,.28)",
    hair: "rgba(10,10,10,.14)",
    band: "#0A0A0A",
    deep: "#000000",
    onDark: "#FFFFFF",
    hairDark: "rgba(255,255,255,.18)",
    brass: "#AD8A2E",
    navBg: "rgba(255,255,255,.86)",
  },
  dark: {
    bg: "#0A0A0A",
    bgSoft: "rgba(255,255,255,0.03)",
    grid: "#161616",
    ink: "#F5F4EF",
    ink60: "rgba(245,244,239,.6)",
    ink30: "rgba(245,244,239,.26)",
    hair: "rgba(245,244,239,.14)",
    band: "#000000",
    deep: "#000000",
    onDark: "#F5F4EF",
    hairDark: "rgba(245,244,239,.18)",
    brass: "#D4AF37",
    navBg: "rgba(10,10,10,.86)",
  },
};

/* ------------------------------------------------------------------ */
/*  Copy — English / Arabic                                            */
/* ------------------------------------------------------------------ */
const COPY = {
  en: {
    dir: "ltr",
    nav: [["record", "Record"], ["mandate", "Mandate"], ["process", "Process"]],
    bookCta: "Book a consultation",
    themeToggle: { light: "Dusk", dark: "Day" },
    langToggle: "عربي",
    heroTag: "Dubai, U.A.E. · RERA BRN [add number]",
    heroLines: ["Property is", "structural", "before it is"],
    heroAccent: "beautiful.",
    heroBody:
      "I read a building the way I was trained to — load, tolerance, lifespan — then I read the market. Ultra-prime villas, penthouses, hotels and development land for investors who buy on evidence, not brochures.",
    heroBtn1: "Book a free consultation",
    heroBtn2: "See the record",
    elevation: {
      penthouse: "PENTHOUSE",
      crown: "SIGNATURE CROWN",
      villa: "VILLA",
      prime: "ULTRA-PRIME",
      plot: "PLOT",
      capital: "CAPITAL GROWTH",
      yieldBase: "YIELD BASE",
      hold: "HOLD PERIOD",
      tag: "ELEV. 01 — ASSET CLASSES",
    },
    statsHead: "The record, measured.",
    statsFig: "Fig. 02 — Verified to date",
    stats: [
      { value: 4, unit: "yrs", label: <>Continuous practice<br />in the Dubai market</> },
      { value: 300, unit: "M+", label: <>AED transacted<br />across the portfolio</> },
      { value: 140, unit: "+", label: <>Investors advised<br />secondary &amp; off-plan</> },
      { value: 62, unit: "%", label: <>Business from repeat<br />clients &amp; referral</> },
    ],
    profileTag: "MOHAMED SHAFIK",
    profileKicker: "Behind the numbers",
    profileHead: "The advisor, not just the record.",
    profileBody:
      "Mohamed Shafik advises investors across Dubai's ultra-prime market — villas, penthouses, hospitality assets and development land. Four years of continuous practice, AED 300M+ transacted, and a client base built almost entirely on repeat business and referral.",
    mandateTag: "Scope of mandate",
    mandateHead: "Four asset classes. No general practice.",
    mandateBody:
      "Breadth is how advisors get average. I work where the transaction is complex enough that the advice actually changes the outcome.",
    mandate: [
      ["A / VILLAS", "Ultra-luxury villas", "Waterfront and gated communities. Assessed on build quality, service-charge exposure and true resale depth — not the render."],
      ["B / PENTHOUSES", "Signature penthouses", "Single-floor and duplex crowns. Scarce, illiquid, frequently mispriced in both directions. Timing is the whole trade."],
      ["C / HOSPITALITY", "Hotels & commercial", "Income-producing assets and prestige offices, underwritten on yield and covenant strength before capital appreciation."],
      ["D / LAND", "Development plots", "Prime land with a civil engineer's read on feasibility: GFA, servicing, phasing, and what the site will actually carry."],
    ],
    processTag: "Transaction sequence",
    processHead: "You will always know which stage you are in.",
    processBody: "The order matters — each stage gates the next. Nothing moves before the one before it closes.",
    steps: [
      ["01", "Brief & capacity", "Investment goal, horizon, financing structure and true budget established before a single property is shown."],
      ["02", "Shortlist & market read", "Comparables, absorption rates and developer track record. You see the case against each asset, not only the case for."],
      ["03", "Negotiation", "Price, payment plan and handover terms. Positions held quietly; leverage is rarely where the seller thinks it is."],
      ["04", "MOU & Form A/B", "Documentation prepared and executed correctly the first time. Deposit secured under proper terms."],
      ["05", "Trustee office & NOC", "Developer NOC, trustee appointment and title transfer coordinated end to end. You attend once."],
      ["06", "Handover & hold", "Snagging, leasing strategy and an annual position review. The relationship starts at handover, not before it."],
    ],
    bookTag: "Reserve a slot",
    bookHead: "Thirty minutes. No presentation deck.",
    bookBody: "A direct conversation about what you are trying to buy, what it should cost, and whether now is the moment. Free, and free of obligation.",
    booking: {
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      dow: ["MON","TUE","WED","THU","FRI","SAT","SUN"],
      slots: ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"],
      weekendNote: "Weekends closed · All times Gulf Standard Time (GMT+4)",
      available: "Available times",
      chooseDate: "Choose a date to see times",
      chooseTime: (d) => `${d} — choose a time`,
      picked: (d, s) => `${d} · ${s} GST`,
      fields: {
        name: "Full name",
        email: "Email address",
        phone: "Phone / WhatsApp",
        interestDefault: "What are you looking at?",
        interests: ["Ultra-luxury villa", "Signature penthouse", "Hotel or commercial asset", "Development plot", "Portfolio review"],
        note: "Anything I should know beforehand (optional)",
      },
      errors: {
        pick: "Pick a date and a time first.",
        name: "Add your name so I know who I am meeting.",
        email: "That email address will not reach you. Check it.",
      },
      confirm: "Confirm consultation",
      doneHead: "Consultation reserved",
      doneBody: (d, s, email) => (
        <>{d} at {s} GST.<br />A confirmation and calendar invite are on the way to {email}.</>
      ),
    },
    footer: { loc: "Mohamed Shafik · Dubai, U.A.E.", email: "Email", linkedin: "LinkedIn" },
    chat: {
      toggle: "Chat",
      welcome: "Welcome — I'm Mohamed's assistant. Ask about villas, penthouses, hotels, land, or pricing, or book a consultation below.",
      placeholder: "Ask about a villa, penthouse, or plot…",
      replies: {
        villa: "Villas are assessed on build quality, service-charge exposure and true resale depth. What budget range and area are you considering?",
        penthouse: "Penthouses are scarce and frequently mispriced in both directions. Which building or area is on your radar?",
        hospitality: "Hospitality assets are underwritten on yield and covenant strength before appreciation. What size of investment did you have in mind?",
        land: "For development plots I look at GFA, servicing and phasing feasibility before price. Do you already have a plot identified?",
        price: "Pricing depends entirely on asset class, area and structure — best handled on a short call. Want me to hold a slot for you?",
        book: "You can reserve a slot directly in the calendar below — pick a date and a time that works.",
        hi: "Hello — good to hear from you. What are you looking to buy, sell, or review?",
        thanks: "Anytime. If a question comes up later, I'm right here.",
        fallback: "Noted — I'll follow up personally. In the meantime, feel free to book a free consultation below.",
      },
    },
  },

  ar: {
    dir: "rtl",
    nav: [["record", "السجل"], ["mandate", "النطاق"], ["process", "الإجراء"]],
    bookCta: "احجز استشارة",
    themeToggle: { light: "ليل", dark: "نهار" },
    langToggle: "EN",
    heroTag: "دبي، الإمارات العربية المتحدة · رخصة RERA [أضف الرقم]",
    heroLines: ["العقار", "هيكل إنشائي", "قبل أن يكون"],
    heroAccent: "جميلاً.",
    heroBody:
      "أقرأ المبنى بالطريقة التي تدربت عليها — الحمل، التحمل، العمر الافتراضي — ثم أقرأ السوق. فلل وبنتهاوس وفنادق وأراضي تطوير فائقة الفخامة للمستثمرين الذين يشترون بناءً على الأدلة، لا الكتيبات الدعائية.",
    heroBtn1: "احجز استشارة مجانية",
    heroBtn2: "اطّلع على السجل",
    elevation: {
      penthouse: "بنتهاوس",
      crown: "تاج مميز",
      villa: "فيلا",
      prime: "فائق الفخامة",
      plot: "أرض",
      capital: "نمو رأس المال",
      yieldBase: "قاعدة العائد",
      hold: "فترة الاحتفاظ",
      tag: "رسم ٠١ — فئات الأصول",
    },
    statsHead: "السجل، بالأرقام.",
    statsFig: "الشكل ٠٢ — موثّق حتى تاريخه",
    stats: [
      { value: 4, unit: "سنة", label: <>ممارسة مستمرة<br />في سوق دبي</> },
      { value: 300, unit: "مليون+", label: <>درهم إماراتي متداول<br />عبر المحفظة</> },
      { value: 140, unit: "+", label: <>مستثمرون تمت استشارتهم<br />سوق ثانوي وعلى الخريطة</> },
      { value: 62, unit: "%", label: <>من الأعمال من عملاء<br />متكررين وإحالات</> },
    ],
    profileTag: "محمد شفيق",
    profileKicker: "خلف الأرقام",
    profileHead: "المستشار، لا الأرقام فقط.",
    profileBody:
      "يقدّم محمد شفيق الاستشارة للمستثمرين في سوق دبي فائق الفخامة — الفلل، البنتهاوس، أصول الضيافة، وأراضي التطوير. أربع سنوات من الممارسة المستمرة، أكثر من ٣٠٠ مليون درهم متداول، وقاعدة عملاء مبنية بشكل شبه كامل على التكرار والإحالة.",
    mandateTag: "نطاق التفويض",
    mandateHead: "أربع فئات أصول. لا ممارسة عامة.",
    mandateBody:
      "الاتساع هو ما يجعل المستشارين عاديين. أعمل حيث تكون الصفقة معقدة بما يكفي لأن تُحدث النصيحة فرقاً فعلياً في النتيجة.",
    mandate: [
      ["أ / الفلل", "فلل فائقة الفخامة", "مجتمعات ساحلية ومسورة. تُقيَّم بناءً على جودة البناء، أعباء رسوم الخدمة، وعمق إعادة البيع الحقيقي — لا الصورة التخيلية."],
      ["ب / البنتهاوس", "بنتهاوس مميز", "طوابق فردية ومزدوجة الارتفاع في القمة. نادرة وغير سائلة وغالباً ما يُساء تسعيرها في الاتجاهين. التوقيت هو الصفقة بأكملها."],
      ["ج / الضيافة", "فنادق وتجاري", "أصول مدرة للدخل ومكاتب مرموقة، تُقيَّم بناءً على العائد وقوة العهد قبل نمو رأس المال."],
      ["د / الأراضي", "أراضٍ للتطوير", "أراضٍ فاخرة بقراءة هندسية مدنية للجدوى: نسبة البناء، الخدمات، التدرج، وما يمكن أن يتحمله الموقع فعلياً."],
    ],
    processTag: "تسلسل الصفقة",
    processHead: "ستعرف دائماً في أي مرحلة أنت.",
    processBody: "الترتيب مهم — كل مرحلة تفتح التي تليها. لا شيء يتحرك قبل أن تُغلق المرحلة السابقة.",
    steps: [
      ["٠١", "الإحاطة والقدرة", "هدف الاستثمار، الأفق الزمني، هيكل التمويل، والميزانية الحقيقية تُحدَّد قبل عرض أي عقار."],
      ["٠٢", "القائمة المختصرة وقراءة السوق", "المقارنات، معدلات الاستيعاب، وسجل المطور. ترى الحجة ضد كل أصل، لا الحجة له فقط."],
      ["٠٣", "التفاوض", "السعر، خطة الدفع، وشروط التسليم. تُحفظ المواقف بهدوء؛ الأفضلية نادراً ما تكون حيث يظنها البائع."],
      ["٠٤", "مذكرة التفاهم والنموذج أ/ب", "تُعد الوثائق وتُنفذ بشكل صحيح من المرة الأولى. يُؤمَّن العربون بشروط سليمة."],
      ["٠٥", "مكتب الأمانة وشهادة عدم الممانعة", "التنسيق الكامل بين شهادة عدم الممانعة من المطور، تعيين الأمين، ونقل الملكية. تحضر مرة واحدة."],
      ["٠٦", "التسليم والاحتفاظ", "فحص العيوب، استراتيجية التأجير، ومراجعة سنوية للموقف. العلاقة تبدأ عند التسليم، لا قبله."],
    ],
    bookTag: "احجز موعداً",
    bookHead: "ثلاثون دقيقة. بلا عرض تقديمي.",
    bookBody: "محادثة مباشرة حول ما تحاول شراءه، وما يجب أن يكلفه، وما إذا كانت هذه هي اللحظة المناسبة. مجانية وبلا التزام.",
    booking: {
      months: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
      dow: ["إثن","ثلا","أرب","خمي","جمع","سبت","أحد"],
      slots: ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"],
      weekendNote: "عطلة نهاية الأسبوع مغلقة · جميع الأوقات بتوقيت الخليج (غرينتش+٤)",
      available: "الأوقات المتاحة",
      chooseDate: "اختر تاريخاً لرؤية الأوقات",
      chooseTime: (d) => `${d} — اختر وقتاً`,
      picked: (d, s) => `${d} · ${s} بتوقيت الخليج`,
      fields: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف / واتساب",
        interestDefault: "ما الذي تبحث عنه؟",
        interests: ["فيلا فائقة الفخامة", "بنتهاوس مميز", "فندق أو أصل تجاري", "أرض للتطوير", "مراجعة المحفظة"],
        note: "أي شيء يجب أن أعرفه مسبقاً (اختياري)",
      },
      errors: {
        pick: "اختر تاريخاً ووقتاً أولاً.",
        name: "أضف اسمك حتى أعرف من سألتقي به.",
        email: "هذا البريد الإلكتروني لن يصلك. تحقق منه.",
      },
      confirm: "تأكيد الاستشارة",
      doneHead: "تم حجز الاستشارة",
      doneBody: (d, s, email) => (
        <>{d} الساعة {s} بتوقيت الخليج.<br />تأكيد ودعوة تقويم في الطريق إلى {email}.</>
      ),
    },
    footer: { loc: "محمد شفيق · دبي، الإمارات العربية المتحدة", email: "البريد الإلكتروني", linkedin: "LinkedIn" },
    chat: {
      toggle: "دردشة",
      welcome: "مرحباً — أنا مساعد محمد. اسألني عن الفلل، البنتهاوس، الفنادق، الأراضي، أو الأسعار، أو احجز استشارة أدناه.",
      placeholder: "اسأل عن فيلا، بنتهاوس، أو أرض…",
      replies: {
        villa: "تُقيَّم الفلل بناءً على جودة البناء، أعباء رسوم الخدمة، وعمق إعادة البيع الحقيقي. ما نطاق الميزانية والمنطقة التي تفكر بها؟",
        penthouse: "البنتهاوس نادر وغالباً ما يُساء تسعيره في الاتجاهين. ما المبنى أو المنطقة التي تضعها في الحسبان؟",
        hospitality: "أصول الضيافة تُقيَّم بناءً على العائد وقوة العهد قبل نمو رأس المال. ما حجم الاستثمار الذي تفكر فيه؟",
        land: "بالنسبة لأراضي التطوير أنظر إلى نسبة البناء والخدمات وجدوى التدرج قبل السعر. هل لديك أرض محددة بالفعل؟",
        price: "التسعير يعتمد كلياً على فئة الأصل والمنطقة والهيكل — يُفضَّل مناقشته في مكالمة قصيرة. هل تريدني أن أحجز لك موعداً؟",
        book: "يمكنك حجز موعد مباشرة من التقويم أدناه — اختر تاريخاً ووقتاً يناسبك.",
        hi: "أهلاً — سعيد بتواصلك. ماذا تبحث عن شرائه أو بيعه أو مراجعته؟",
        thanks: "في أي وقت. إن راودك سؤال لاحقاً، أنا هنا.",
        fallback: "تم التسجيل — سأتابع معك شخصياً. في هذه الأثناء، لا تتردد في حجز استشارة مجانية أدناه.",
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {} }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat icons — thin line-art, matching the elevation drawing style   */
/* ------------------------------------------------------------------ */
const STAT_ICONS = {
  years: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7.5 3h9M7.5 21h9" />
      <path d="M7.5 3c0 4.3 3 5.8 4.5 7-1.5 1.2-4.5 2.7-4.5 7M16.5 3c0 4.3-3 5.8-4.5 7 1.5 1.2 4.5 2.7 4.5 7" />
      <path d="M12 10.6 9.6 9M12 13.4l2.4 1.6" opacity=".55" />
    </svg>
  ),
  money: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4.5 9 8 3.5h8L19.5 9 12 20.5z" />
      <path d="M4.5 9h15M8 3.5 9.6 9 12 20.5M16 3.5 14.4 9 12 20.5M9.6 9h4.8" opacity=".7" />
    </svg>
  ),
  people: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="7" r="3.2" />
      <circle cx="4.8" cy="9.2" r="2.1" opacity=".6" />
      <circle cx="19.2" cy="9.2" r="2.1" opacity=".6" />
      <path d="M6 20c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2" />
      <path d="M1.6 20c0-2.5 1.4-4.6 3.2-5.3M22.4 20c0-2.5-1.4-4.6-3.2-5.3" opacity=".6" />
    </svg>
  ),
  repeat: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6.2 20c-2.3-2.7-3.1-6.2-2-9.8" />
      <path d="M17.8 20c2.3-2.7 3.1-6.2 2-9.8" />
      <path d="M5.1 17.3c-.9-.2-1.8-.7-2.5-1.4M5.7 14.1c-.9-.2-1.8-.5-2.6-1.1M6.7 11c-.8 0-1.7-.3-2.5-.7M8.1 8.3c-.7.1-1.6-.1-2.3-.5" opacity=".65" />
      <path d="M18.9 17.3c.9-.2 1.8-.7 2.5-1.4M18.3 14.1c.9-.2 1.8-.5 2.6-1.1M17.3 11c.8 0 1.7-.3 2.5-.7M15.9 8.3c.7.1 1.6-.1 2.3-.5" opacity=".65" />
      <path d="M9 20.6c1-.6 2-1 3-1s2 .4 3 1" />
    </svg>
  ),
};

const STAT_META = ["years", "money", "people", "repeat"];

/* ------------------------------------------------------------------ */
/*  Counting statistic with animated gold gauge                       */
/* ------------------------------------------------------------------ */
function Stat({ value, unit, label, decimals = 0, t, iconType, index }) {
  const [ref, shown] = useReveal(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  const Icon = STAT_ICONS[iconType];

  return (
    <div ref={ref} className="ms-stat" style={{ "--brass": t.brass }}>
      <span className="ms-corner ms-corner-tl" />
      <span className="ms-corner ms-corner-tr" />
      <span className="ms-corner ms-corner-bl" />
      <span className="ms-corner ms-corner-br" />
      <div className="ms-stat-head">
        <span className="ms-card-n" style={{ color: t.ink30 }}>0{index}</span>
        <div className="ms-ring">
          <span className="ms-ring-icon" style={{ color: t.brass }}>{Icon && <Icon />}</span>
        </div>
      </div>
      <div className="ms-val ms-val-gold">
        {n.toFixed(decimals)}
        <sup>{unit}</sup>
      </div>
      <span className="ms-val-rule" />
      <div className="ms-lbl">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero elevation drawing                                             */
/* ------------------------------------------------------------------ */
function Elevation({ t, c }) {
  const [ref, shown] = useReveal(0.25);
  const stroke = (i) => ({
    stroke: t.ink,
    strokeWidth: 1,
    strokeDasharray: 1400,
    strokeDashoffset: shown ? 0 : 1400,
    transition: `stroke-dashoffset 2.2s cubic-bezier(.22,1,.36,1) ${i * 320}ms`,
  });
  const brassStroke = (i) => ({ ...stroke(i), stroke: t.brass });

  return (
    <div
      ref={ref}
      className="ms-plate"
      style={{
        borderColor: t.hair,
        backgroundColor: t.bgSoft,
        backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`,
      }}
    >
      <svg viewBox="0 0 420 380" fill="none" aria-label="Technical elevation of a tower, penthouse crown and villa">
        <path d="M60 340 L60 90 L110 60 L160 90 L160 340 Z" style={stroke(0)} />
        <path d="M60 130 H160 M60 170 H160 M60 210 H160 M60 250 H160 M60 290 H160 M110 60 V340" style={stroke(1)} />
        <path d="M75 90 L110 72 L145 90" style={stroke(2)} />
        <path d="M215 340 L215 235 L265 200 L315 235 L315 340 Z" style={stroke(1)} />
        <path d="M240 340 V285 H290 V340 M215 235 L265 200 L315 235" style={stroke(2)} />
        <path d="M200 340 H370 M370 340 V255" style={{ ...stroke(2), strokeDasharray: "4 4", strokeDashoffset: 0, opacity: shown ? 1 : 0, transition: "opacity .9s ease 900ms" }} />
        <path d="M40 60 V340 M34 60 H46 M34 340 H46" style={brassStroke(3)} />
        <path d="M60 362 H160 M60 356 V368 M160 356 V368" style={brassStroke(3)} />
        <path d="M215 362 H315 M215 356 V368 M315 356 V368" style={brassStroke(3)} />
        <g
          fill={t.ink}
          fontFamily="Karla, sans-serif"
          fontSize="8.5"
          letterSpacing="1"
          style={{ opacity: shown ? 1 : 0, transition: "opacity .9s ease 1400ms" }}
        >
          <text x="176" y="80" fill={t.brass}>{c.penthouse}</text>
          <text x="176" y="94">{c.crown}</text>
          <text x="330" y="212" fill={t.brass}>{c.villa}</text>
          <text x="330" y="226">{c.prime}</text>
          <text x="330" y="290">{c.plot}</text>
          <text x="14" y="200" transform="rotate(-90 14 200)">{c.capital}</text>
          <text x="72" y="380">{c.yieldBase}</text>
          <text x="227" y="380">{c.hold}</text>
        </g>
      </svg>
      <span className="ms-plate-tag" style={{ background: t.bg, borderColor: t.hair, color: t.ink60 }}>
        {c.tag}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking                                                            */
/* ------------------------------------------------------------------ */
function Booking({ t, c }) {
  const today = useRef((() => { const d = new Date(); d.setHours(0,0,0,0); return d; })()).current;
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", note: "" });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const fmt = (d) => `${d.getDate()} ${c.months[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;

  const cells = useCallback(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7;
    const total = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const out = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= total; d++) out.push(new Date(view.getFullYear(), view.getMonth(), d));
    return out;
  }, [view]);

  const atFirstMonth =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const confirm = () => {
    if (!date || !slot) return setErr(c.errors.pick);
    if (!form.name.trim()) return setErr(c.errors.name);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setErr(c.errors.email);
    setErr("");
    setDone(true);
  };

  return (
    <div className="ms-booker" style={{ borderColor: t.hairDark, background: "rgba(128,128,128,.04)" }}>
      {/* calendar */}
      <div className="ms-cal" style={{ borderColor: t.hairDark }}>
        <div className="ms-cal-top">
          <button
            className="ms-navbtn"
            style={{ borderColor: t.hairDark, color: t.onDark }}
            disabled={atFirstMonth}
            aria-label="Previous month"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          >←</button>
          <div className="ms-month" key={`${view.getMonth()}-${view.getFullYear()}`}>
            {c.months[view.getMonth()]} {view.getFullYear()}
          </div>
          <button
            className="ms-navbtn"
            style={{ borderColor: t.hairDark, color: t.onDark }}
            aria-label="Next month"
            onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          >→</button>
        </div>

        <div className="ms-dow">
          {c.dow.map((d) => <span key={d}>{d}</span>)}
        </div>

        <div className="ms-days" key={view.getTime()}>
          {cells().map((d, i) =>
            d === null ? (
              <div key={`e${i}`} />
            ) : (
              (() => {
                const weekend = d.getDay() === 0 || d.getDay() === 6;
                const disabled = d < today || weekend;
                const selected = date && d.getTime() === date.getTime();
                return (
                  <button
                    key={d.getTime()}
                    className="ms-day"
                    disabled={disabled}
                    aria-label={fmt(d)}
                    onClick={() => { setDate(d); setSlot(null); }}
                    style={{
                      color: selected ? "#fff" : disabled ? t.ink30 : t.onDark,
                      background: selected ? t.brass : "transparent",
                      borderColor: selected ? t.brass : "transparent",
                      animation: `msPop .35s cubic-bezier(.22,1,.36,1) ${Math.min(i, 24) * 12}ms both`,
                    }}
                  >
                    {d.getDate()}
                  </button>
                );
              })()
            )
          )}
        </div>

        <p className="ms-anno" style={{ color: "rgba(150,150,150,.6)", marginTop: 18 }}>
          {c.weekendNote}
        </p>
      </div>

      {/* panel */}
      <div className="ms-panel">
        {done ? (
          <div className="ms-done">
            <div className="ms-chk" style={{ borderColor: t.brass, color: t.brass }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12.5 L9.5 18 L20 6.5" style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "msDraw .6s ease .2s forwards" }} />
              </svg>
            </div>
            <h3 className="ms-done-h">{c.doneHead}</h3>
            <p style={{ color: "rgba(150,150,150,.85)" }}>
              {c.doneBody(fmt(date), slot, form.email)}
            </p>
          </div>
        ) : (
          <>
            <span className="ms-anno" style={{ color: "rgba(150,150,150,.75)" }}>{c.available}</span>
            <div className="ms-slots">
              {c.slots.map((s) => (
                <button
                  key={s}
                  className="ms-slot"
                  disabled={!date}
                  onClick={() => setSlot(s)}
                  style={{
                    borderColor: slot === s ? t.brass : t.hairDark,
                    background: slot === s ? t.brass : "transparent",
                    color: slot === s ? "#fff" : t.onDark,
                    opacity: date ? 1 : 0.35,
                  }}
                >{s}</button>
              ))}
            </div>

            <div className="ms-picked" style={{ color: t.brass }}>
              {date ? (slot ? c.picked(fmt(date), slot) : c.chooseTime(fmt(date))) : c.chooseDate}
            </div>

            <div className="ms-fields">
              <input value={form.name} onChange={set("name")} placeholder={c.fields.name} autoComplete="name" style={{ borderColor: t.hairDark, color: t.onDark }} />
              <input value={form.email} onChange={set("email")} type="email" placeholder={c.fields.email} autoComplete="email" style={{ borderColor: t.hairDark, color: t.onDark }} />
              <input value={form.phone} onChange={set("phone")} type="tel" placeholder={c.fields.phone} autoComplete="tel" style={{ borderColor: t.hairDark, color: t.onDark }} />
              <select value={form.interest} onChange={set("interest")} style={{ borderColor: t.hairDark, color: form.interest ? t.onDark : "rgba(150,150,150,.65)" }}>
                <option value="">{c.fields.interestDefault}</option>
                {c.fields.interests.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
              <textarea value={form.note} onChange={set("note")} placeholder={c.fields.note} style={{ borderColor: t.hairDark, color: t.onDark }} />
            </div>

            <div className="ms-err">{err}</div>
            <button className="ms-btn ms-submit" onClick={confirm} style={{ background: t.brass, borderColor: t.brass }}>
              {c.confirm}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat widget                                                        */
/* ------------------------------------------------------------------ */
function ChatWidget({ t, c }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: c.welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const prevWelcome = useRef(c.welcome);

  useEffect(() => {
    if (prevWelcome.current !== c.welcome) {
      setMessages([{ from: "bot", text: c.welcome }]);
      prevWelcome.current = c.welcome;
    }
  }, [c.welcome]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  const reply = (msg) => {
    const m = msg.toLowerCase();
    const r = c.replies;
    if (/villa|فيلا|فلل/.test(m)) return r.villa;
    if (/penthouse|بنتهاوس/.test(m)) return r.penthouse;
    if (/hotel|commercial|فندق|تجاري|ضيافة/.test(m)) return r.hospitality;
    if (/land|plot|أرض|أراضي/.test(m)) return r.land;
    if (/price|cost|budget|much|سعر|تكلفة|ميزانية/.test(m)) return r.price;
    if (/book|consult|meeting|call|schedule|حجز|موعد|استشارة/.test(m)) return r.book;
    if (/^(hi|hello|hey)\b|مرحبا|أهلا|السلام/.test(m)) return r.hi;
    if (/thank|شكرا|شكراً/.test(m)) return r.thanks;
    return r.fallback;
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((ms) => [...ms, { from: "me", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((ms) => [...ms, { from: "bot", text: reply(text) }]);
      setTyping(false);
    }, 650 + Math.random() * 500);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); send(); }
  };

  return (
    <div className="ms-chat">
      {open && (
        <div className="ms-chat-panel" style={{ background: t.deep, borderColor: t.hairDark }}>
          <div className="ms-chat-head" style={{ borderColor: t.hairDark }}>
            <span className="ms-mark" style={{ fontSize: 15, color: t.onDark }}>
              Mohamed Shafik<span style={{ color: t.brass }}>.</span>
            </span>
            <button className="ms-chat-close" onClick={() => setOpen(false)} aria-label="Close chat" style={{ color: t.onDark }}>×</button>
          </div>
          <div className="ms-chat-body" ref={listRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ms-msg ${msg.from === "me" ? "ms-msg-me" : "ms-msg-bot"}`}
                style={msg.from === "me" ? { background: t.brass, color: "#fff" } : { background: "rgba(150,150,150,.14)", color: t.onDark }}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="ms-msg ms-msg-bot ms-msg-typing" style={{ background: "rgba(150,150,150,.14)" }}>
                <span /><span /><span />
              </div>
            )}
          </div>
          <div className="ms-chat-input-row" style={{ borderColor: t.hairDark }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={c.placeholder}
              style={{ color: t.onDark }}
            />
            <button onClick={send} aria-label="Send message" style={{ color: t.brass }}>→</button>
          </div>
        </div>
      )}
      <button
        className="ms-chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{ background: t.brass, color: "#fff" }}
      >
        {open ? "×" : c.toggle}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Site() {
  const [mode, setMode] = useState("dark");
  const [lang, setLang] = useState("en");
  const t = THEMES[mode];
  const c = COPY[lang];
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const id = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(id); }, []);

  const stagger = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .9s cubic-bezier(.22,1,.36,1) ${i * 110}ms, transform .9s cubic-bezier(.22,1,.36,1) ${i * 110}ms`,
  });

  return (
    <div style={{ background: t.bg, color: t.ink, transition: "background .5s ease, color .5s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Tajawal:wght@300;400;500;700;800&display=swap');
        .ms-root *{box-sizing:border-box;margin:0;padding:0}
        .ms-root{font-family:"Karla",system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
        .ms-root[dir="rtl"]{direction:rtl}
        .ms-root[dir="rtl"] *{font-family:"Tajawal","Karla",sans-serif;letter-spacing:normal!important}
        .ms-root[dir="rtl"] .ms-plate-tag{right:auto;left:-1px}
        .ms-root[dir="rtl"] .ms-chat{right:auto;left:24px}
        .ms-root[dir="rtl"] .ms-chat-panel{right:auto;left:0}
        .ms-wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .ms-anno{font-family:"Karla",sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;display:block}
        .ms-h1{font-family:"Karla",sans-serif;font-weight:400;font-size:clamp(40px,5.4vw,68px);line-height:1.04;letter-spacing:-.015em}
        .ms-h2{font-family:"Karla",sans-serif;font-weight:400;font-size:clamp(28px,3.6vw,44px);line-height:1.12;letter-spacing:-.01em}
        .ms-btn{font-family:"Karla",sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:15px 26px;border:1px solid;cursor:pointer;background:none;text-decoration:none;display:inline-block;transition:all .25s ease}
        .ms-btn:hover{transform:translateY(-2px)}

        .ms-nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(10px);border-bottom:1px solid}
        .ms-nav-in{display:flex;align-items:center;justify-content:space-between;height:64px}
        .ms-mark{font-family:"Karla",sans-serif;font-size:19px}
        .ms-links{display:flex;gap:22px;align-items:center}
        .ms-links a,.ms-links button.ms-link{font-family:"Karla",sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;background:none;border:none;cursor:pointer;transition:color .2s}
        .ms-toggle-btn{font-family:"Karla",sans-serif;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;border:1px solid;padding:7px 15px;background:none;cursor:pointer;transition:all .25s ease;border-radius:999px}
        .ms-toggle-btn:hover{transform:translateY(-1px)}
        @media(max-width:820px){.ms-links a:not(.ms-nav-cta){display:none}}

        .ms-hero{padding:76px 0 88px}
        .ms-hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
        @media(max-width:900px){.ms-hero-grid{grid-template-columns:1fr;gap:44px}}
        .ms-plate{position:relative;border:1px solid;padding:22px;background-size:26px 26px}
        .ms-plate-tag{position:absolute;bottom:-1px;right:-1px;font-family:"Karla",sans-serif;font-size:9.5px;letter-spacing:.14em;border:1px solid;padding:6px 10px}

        .ms-survey{padding:72px 0}
        .ms-survey-head{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:26px;border-bottom:1px solid}
        .ms-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0 8px}
        .ms-stat{position:relative;padding:32px 30px 22px 14px;transition:transform .35s cubic-bezier(.22,1,.36,1)}
        .ms-stat:hover{transform:translateY(-5px)}
        .ms-corner{position:absolute;background:var(--brass);opacity:.85}
        .ms-corner-tl,.ms-corner-tr{top:0}
        .ms-corner-bl,.ms-corner-br{bottom:0}
        .ms-corner-tl,.ms-corner-bl{left:0}
        .ms-corner-tr,.ms-corner-br{right:0}
        .ms-corner-tl,.ms-corner-tr,.ms-corner-bl,.ms-corner-br{width:9px;height:1.5px}
        .ms-corner-tl::after,.ms-corner-tr::after,.ms-corner-bl::after,.ms-corner-br::after{content:"";position:absolute;background:var(--brass);width:1.5px;height:9px}
        .ms-corner-tl::after{top:0;left:0}
        .ms-corner-tr::after{top:0;right:0}
        .ms-corner-bl::after{bottom:0;left:0}
        .ms-corner-br::after{bottom:0;right:0}
        .ms-stat-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
        .ms-ring{position:relative;width:56px;height:56px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:filter .35s ease}
        .ms-stat:hover .ms-ring{filter:drop-shadow(0 0 10px ${t.brass}99)}
        .ms-ring-icon{display:flex}
        .ms-val{font-family:"Karla",sans-serif;font-size:clamp(38px,4.6vw,56px);line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
        .ms-val sup{font-size:.42em;vertical-align:super;font-family:"Karla",sans-serif}
        .ms-val-gold{background:linear-gradient(100deg,var(--brass) 0%,#fff6d8 28%,var(--brass) 56%,var(--brass) 100%);background-size:250% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:msShimmer 6s ease-in-out infinite}
        .ms-val-gold sup{color:var(--brass);-webkit-text-fill-color:var(--brass)}
        .ms-val-rule{display:block;width:34px;height:1.5px;background:var(--brass);margin-top:14px;opacity:.8}
        .ms-lbl{font-family:"Karla",sans-serif;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;margin-top:14px;line-height:1.7;color:rgba(150,150,150,.85)}
        @media(max-width:900px){.ms-stats{grid-template-columns:1fr 1fr}}

        .ms-section{padding:96px 0}
        .ms-sec-head{margin-bottom:48px;max-width:56ch}

        .ms-profile-grid{display:grid;grid-template-columns:.82fr 1.18fr;gap:60px;align-items:center}
        @media(max-width:900px){.ms-profile-grid{grid-template-columns:1fr;gap:36px}}
        .ms-portrait{position:relative;border:1px solid;overflow:hidden;aspect-ratio:4/5;max-width:380px}
        .ms-portrait img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center;filter:grayscale(1) contrast(1.08) brightness(1.03)}
        .ms-portrait-tint{position:absolute;inset:0;background:linear-gradient(150deg,var(--brass) 0%,transparent 55%);mix-blend-mode:overlay;opacity:.5;pointer-events:none}
        .ms-cards{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid}
        .ms-card{padding:34px 26px 34px 0;border-right:1px solid}
        .ms-card:last-child{border-right:0;padding-right:0}
        .ms-card h3{font-family:"Karla",sans-serif;font-weight:400;font-size:22px;margin:18px 0 12px;line-height:1.2}
        .ms-card p{font-size:14.5px;font-weight:300;line-height:1.7}
        .ms-card-n{font-family:"Karla",sans-serif;font-size:10.5px;letter-spacing:.14em;transition:color .3s}
        @media(max-width:900px){.ms-cards{grid-template-columns:1fr 1fr}.ms-card{padding-right:26px}.ms-card:nth-child(2n){border-right:0}}
        @media(max-width:560px){.ms-cards{grid-template-columns:1fr}.ms-card{border-right:0;padding-right:0}}

        .ms-step{display:grid;grid-template-columns:80px 1fr 1.3fr;gap:28px;padding:30px 0;border-top:1px solid;align-items:baseline;transition:padding-left .35s ease}
        .ms-step:hover{padding-left:12px}
        .ms-step .n{font-family:"Karla",sans-serif;font-size:11px;letter-spacing:.14em}
        .ms-step h4{font-family:"Karla",sans-serif;font-weight:400;font-size:21px}
        .ms-step p{font-size:14.5px;font-weight:300}
        @media(max-width:760px){.ms-step{grid-template-columns:1fr;gap:10px}}

        .ms-booker{display:grid;grid-template-columns:1.1fr .9fr;border:1px solid}
        .ms-cal{padding:32px;border-right:1px solid}
        @media(max-width:880px){.ms-booker{grid-template-columns:1fr}.ms-cal{border-right:0;border-bottom:1px solid}}
        .ms-cal-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
        .ms-month{font-family:"Karla",sans-serif;font-size:22px;animation:msFade .5s ease}
        .ms-navbtn{background:none;border:1px solid;width:32px;height:32px;cursor:pointer;font-family:"Karla",sans-serif;font-size:13px;display:inline-flex;align-items:center;justify-content:center;transition:.2s}
        .ms-navbtn:disabled{opacity:.28;cursor:not-allowed}
        .ms-dow{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:8px}
        .ms-dow span{font-family:"Karla",sans-serif;font-size:9.5px;letter-spacing:.1em;text-align:center;color:rgba(150,150,150,.65);padding:6px 0}
        .ms-days{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
        .ms-day{aspect-ratio:1;border:1px solid transparent;font-family:"Karla",sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .16s,background .16s}
        .ms-day:disabled{cursor:not-allowed}
        .ms-panel{padding:32px;display:flex;flex-direction:column}
        .ms-slots{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0 20px}
        .ms-slot{border:1px solid;padding:11px;font-family:"Karla",sans-serif;font-size:11.5px;letter-spacing:.06em;cursor:pointer;transition:.16s}
        .ms-slot:disabled{cursor:not-allowed}
        .ms-picked{font-family:"Karla",sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;min-height:17px}
        .ms-fields{display:grid;gap:12px;margin-top:16px}
        .ms-fields input,.ms-fields select,.ms-fields textarea{width:100%;background:rgba(150,150,150,.06);border:1px solid;padding:12px 14px;font-family:"Karla",sans-serif;font-size:14px;border-radius:0}
        .ms-fields textarea{resize:vertical;min-height:70px}
        .ms-fields input::placeholder,.ms-fields textarea::placeholder{color:rgba(150,150,150,.55)}
        .ms-err{font-family:"Karla",sans-serif;font-size:10.5px;letter-spacing:.08em;color:#B23B3B;margin-top:10px;min-height:15px}
        .ms-submit{margin-top:14px;width:100%;color:#fff}
        .ms-done{text-align:center;padding:40px 10px;margin:auto;animation:msFade .6s ease}
        .ms-chk{width:52px;height:52px;border:1px solid;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px}
        .ms-done-h{font-family:"Karla",sans-serif;font-size:26px;font-weight:400;margin-bottom:12px}

        .ms-foot{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-family:"Karla",sans-serif;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}
        .ms-foot a{text-decoration:none;color:inherit}

        button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid ${t.brass};outline-offset:2px}

        .ms-chat{position:fixed;right:24px;bottom:24px;z-index:80;font-family:"Karla",sans-serif}
        .ms-chat-toggle{min-width:58px;height:58px;padding:0 20px;border-radius:999px;border:none;cursor:pointer;font-family:"Karla",sans-serif;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 10px 30px rgba(0,0,0,.28);transition:transform .25s ease}
        .ms-chat-toggle:hover{transform:translateY(-2px)}
        .ms-chat-panel{position:absolute;right:0;bottom:74px;width:340px;max-width:calc(100vw - 32px);height:440px;max-height:calc(100vh - 140px);display:flex;flex-direction:column;border:1px solid;box-shadow:0 24px 60px rgba(0,0,0,.35);animation:msFade .25s ease}
        .ms-chat-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid;flex-shrink:0}
        .ms-chat-close{background:none;border:none;font-size:20px;line-height:1;cursor:pointer}
        .ms-chat-body{flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:10px}
        .ms-msg{max-width:82%;padding:10px 14px;font-size:13.5px;font-weight:300;line-height:1.55}
        .ms-msg-me{align-self:flex-end}
        .ms-msg-bot{align-self:flex-start}
        .ms-msg-typing{display:flex;gap:4px;align-items:center;padding:13px 14px}
        .ms-msg-typing span{width:5px;height:5px;border-radius:50%;background:rgba(150,150,150,.7);animation:msTyping 1s infinite ease-in-out}
        .ms-msg-typing span:nth-child(2){animation-delay:.15s}
        .ms-msg-typing span:nth-child(3){animation-delay:.3s}
        .ms-chat-input-row{display:flex;align-items:center;border-top:1px solid;padding:6px 8px 6px 16px;gap:8px;flex-shrink:0}
        .ms-chat-input-row input{flex:1;background:none;border:none;font-family:"Karla",sans-serif;font-size:13.5px;outline:none;padding:10px 0}
        .ms-chat-input-row input::placeholder{color:rgba(150,150,150,.6)}
        .ms-chat-input-row button{background:none;border:none;font-size:19px;cursor:pointer;width:40px;height:40px}
        @media(max-width:480px){.ms-chat-panel{width:calc(100vw - 32px)}}

        @keyframes msFade{from{opacity:0}to{opacity:1}}
        @keyframes msShimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes msPop{from{opacity:0;transform:scale(.86)}to{opacity:1;transform:scale(1)}}
        @keyframes msDraw{to{stroke-dashoffset:0}}
        @keyframes msTyping{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-3px);opacity:1}}
        @media(prefers-reduced-motion:reduce){.ms-root *{animation:none!important;transition:none!important}}
      `}</style>

      <div className="ms-root" dir={c.dir} lang={lang}>
        {/* NAV */}
        <nav className="ms-nav" style={{ background: t.navBg, borderColor: t.hair }}>
          <div className="ms-wrap ms-nav-in">
            <div className="ms-mark">Mohamed Shafik<span style={{ color: t.brass }}>.</span></div>
            <div className="ms-links">
              {c.nav.map(([id, label]) => (
                <a key={id} href={`#${id}`} style={{ color: t.ink60 }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = t.brass)}
                   onMouseLeave={(e) => (e.currentTarget.style.color = t.ink60)}>{label}</a>
              ))}
              <button
                className="ms-toggle-btn"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                aria-label="Toggle light and dark mode"
                style={{ borderColor: t.brass, color: t.brass }}
              >
                {mode === "light" ? c.themeToggle.light : c.themeToggle.dark}
              </button>
              <button
                className="ms-toggle-btn"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                aria-label="Toggle Arabic and English"
                style={{ borderColor: t.brass, color: t.brass }}
              >
                {c.langToggle}
              </button>
              <a href="#book" className="ms-btn ms-nav-cta" style={{ borderColor: t.ink, color: t.ink, padding: "9px 16px" }}>
                {c.bookCta}
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header className="ms-hero">
          <div className="ms-wrap ms-hero-grid">
            <div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 26, ...stagger(0) }}>
                <span style={{ width: 44, height: 1, background: t.brass }} />
                <span className="ms-anno" style={{ color: t.ink60 }}>{c.heroTag}</span>
              </div>
              <h1 className="ms-h1">
                {c.heroLines.map((line, i) => (
                  <span key={line} style={{ display: "block", ...stagger(i + 1) }}>{line}</span>
                ))}
                <span style={{ display: "block", fontStyle: lang === "ar" ? "normal" : "italic", color: t.brass, ...stagger(4) }}>{c.heroAccent}</span>
              </h1>
              <p style={{ marginTop: 26, maxWidth: "44ch", fontSize: 17, fontWeight: 300, color: t.ink60, lineHeight: 1.72, ...stagger(5) }}>
                {c.heroBody}
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 38, flexWrap: "wrap", ...stagger(6) }}>
                <a href="#book" className="ms-btn" style={{ background: t.brass, borderColor: t.brass, color: "#fff" }}>{c.heroBtn1}</a>
                <a href="#record" className="ms-btn" style={{ borderColor: t.ink, color: t.ink }}>{c.heroBtn2}</a>
              </div>
            </div>
            <Elevation t={t} c={c.elevation} />
          </div>
        </header>

        {/* STATS */}
        <div id="record" className="ms-survey" style={{ background: t.band, color: t.onDark }}>
          <div className="ms-wrap">
            <Reveal className="ms-survey-head" style={{ borderColor: t.hairDark }}>
              <h2 className="ms-h2">{c.statsHead}</h2>
              <span className="ms-anno" style={{ color: "rgba(150,150,150,.85)" }}>{c.statsFig}</span>
            </Reveal>
            <div className="ms-stats">
              {c.stats.map((s, i) => (
                <Stat
                  key={i}
                  t={t}
                  index={i + 1}
                  value={s.value}
                  unit={s.unit}
                  label={s.label}
                  iconType={STAT_META[i]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <section id="profile" className="ms-section">
          <div className="ms-wrap ms-profile-grid">
            <Reveal className="ms-portrait" style={{ borderColor: t.hair, "--brass": t.brass }}>
              <img src="/portrait.png" alt="Mohamed Shafik" />
              <span className="ms-portrait-tint" />
              <span className="ms-corner ms-corner-tl" />
              <span className="ms-corner ms-corner-tr" />
              <span className="ms-corner ms-corner-bl" />
              <span className="ms-corner ms-corner-br" />
              <span className="ms-plate-tag" style={{ background: t.bg, borderColor: t.hair, color: t.ink60 }}>
                {c.profileTag}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <span className="ms-anno" style={{ color: t.brass }}>{c.profileKicker}</span>
              <h2 className="ms-h2" style={{ marginTop: 18 }}>{c.profileHead}</h2>
              <p style={{ marginTop: 20, color: t.ink60, fontWeight: 300, maxWidth: "50ch" }}>
                {c.profileBody}
              </p>
            </Reveal>
          </div>
        </section>

        {/* MANDATE */}
        <section id="mandate" className="ms-section">
          <div className="ms-wrap">
            <Reveal className="ms-sec-head">
              <span className="ms-anno" style={{ color: t.brass }}>{c.mandateTag}</span>
              <h2 className="ms-h2" style={{ marginTop: 18 }}>{c.mandateHead}</h2>
              <p style={{ marginTop: 20, color: t.ink60, fontWeight: 300, maxWidth: "48ch" }}>
                {c.mandateBody}
              </p>
            </Reveal>
            <div className="ms-cards" style={{ borderColor: t.hair }}>
              {c.mandate.map(([n, h, p], i) => (
                <Reveal key={n} delay={i * 90} className="ms-card" style={{ borderColor: t.hair }}>
                  <div className="ms-card-n" style={{ color: t.ink30 }}
                       onMouseEnter={(e) => (e.currentTarget.style.color = t.brass)}
                       onMouseLeave={(e) => (e.currentTarget.style.color = t.ink30)}>{n}</div>
                  <h3>{h}</h3>
                  <p style={{ color: t.ink60 }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="ms-section" style={{ background: t.bgSoft, borderTop: `1px solid ${t.hair}`, borderBottom: `1px solid ${t.hair}` }}>
          <div className="ms-wrap">
            <Reveal className="ms-sec-head">
              <span className="ms-anno" style={{ color: t.brass }}>{c.processTag}</span>
              <h2 className="ms-h2" style={{ marginTop: 18 }}>{c.processHead}</h2>
              <p style={{ marginTop: 20, color: t.ink60, fontWeight: 300, maxWidth: "48ch" }}>
                {c.processBody}
              </p>
            </Reveal>
            <div>
              {c.steps.map(([n, h, p], i) => (
                <Reveal key={n} delay={i * 70} className="ms-step" style={{ borderColor: i === 0 ? "transparent" : t.hair }}>
                  <span className="n" style={{ color: t.brass }}>{n}</span>
                  <h4>{h}</h4>
                  <p style={{ color: t.ink60 }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="book" className="ms-section" style={{ background: t.deep, color: t.onDark }}>
          <div className="ms-wrap">
            <Reveal className="ms-sec-head">
              <span className="ms-anno" style={{ color: t.brass }}>{c.bookTag}</span>
              <h2 className="ms-h2" style={{ marginTop: 18 }}>{c.bookHead}</h2>
              <p style={{ marginTop: 20, color: "rgba(150,150,150,.85)", fontWeight: 300, maxWidth: "48ch" }}>
                {c.bookBody}
              </p>
            </Reveal>
            <Reveal delay={120}><Booking t={t} c={c.booking} /></Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: t.deep, color: "rgba(150,150,150,.85)", borderTop: `1px solid ${t.hairDark}`, padding: "40px 0" }}>
          <div className="ms-wrap ms-foot">
            <span>{c.footer.loc}</span>
            <a href="tel:+971503671688">+971 50 367 1688</a>
            <span>
              <a href="mailto:mohamedahmedshafiq14261@gmail.com">{c.footer.email}</a> ·{" "}
              <a href="https://www.linkedin.com/in/mohamedshafik-582906189" target="_blank" rel="noopener noreferrer">{c.footer.linkedin}</a>
            </span>
          </div>
        </footer>

        <ChatWidget t={t} c={c.chat} />
      </div>
    </div>
  );
}
