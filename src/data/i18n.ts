/**
 * Arabic (UAE / Gulf) and Urdu (Pakistan) overview pages: /ar/ and /ur/.
 * The rest of the site is English. Numbers are real and match site.ts.
 */
import type { Choice, QuoteText } from "./quote";
import type { Faq } from "./pages";

export type Locale = "ar" | "ur";

export type LocaleContent = {
  locale: Locale;
  path: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; lead: string; cta: string; whatsapp: string; hours: string };
  stats: { value: string; label: string }[];
  services: { title: string; muted: string; more: string; items: { slug: string; name: string; text: string }[] };
  results: {
    eyebrow: string;
    title: string;
    muted: string;
    lead: string;
    via: (agency: string) => string;
    items: { slug: string; text: string; period: string; results: { value: string; label: string }[] }[];
  };
  why: { eyebrow: string; title: string; muted: string; items: { title: string; text: string }[] };
  process: { eyebrow: string; title: string; muted: string; steps: { title: string; text: string }[] };
  faq: { title: string; items: Faq[] };
  final: { eyebrow: string; title: string; muted: string; lead: string; english: string };
  form: { title: string; text: QuoteText; types: Choice[] };
};

export const ar: LocaleContent = {
  locale: "ar",
  path: "/ar/",
  meta: {
    title: "مطوّر ووردبريس وخبير SEO مستقل | عمير صادق",
    description:
      "مطوّر ووردبريس وخبير تحسين محركات البحث، أكثر من 100 موقع. متاجر ووكومرس، إضافات مخصصة، Next.js وSEO لعملاء في الإمارات والخليج. عرض سعر خلال 24 ساعة.",
  },
  hero: {
    eyebrow: "متاح لمشاريع جديدة",
    h1: "مطوّر ووردبريس وخبير SEO يبني مواقع تتصدّر نتائج البحث",
    lead: "أنا عمير صادق، مطوّر ووردبريس ومتخصص في تحسين محركات البحث، وبنيتُ أكثر من 100 موقع. أصمّم مواقع ومتاجر سريعة وسهلة الإدارة، مع SEO مدمج من اليوم الأول، لعملاء في الإمارات والمملكة المتحدة والولايات المتحدة وأستراليا.",
    cta: "احصل على عرض سعر خلال 24 ساعة",
    whatsapp: "راسلني على واتساب",
    hours: "متاح يوميًا من 8 صباحًا حتى 1 بعد منتصف الليل بتوقيت الإمارات",
  },
  stats: [
    { value: "+100", label: "موقع تم تسليمه" },
    { value: "24 ساعة", label: "لعرض سعر ثابت" },
    { value: "17 ساعة", label: "متاح يوميًا" },
    { value: "578", label: "نقرة من Google · مستشفى دكتورز" },
  ],
  services: {
    title: "ماذا أقدّم لك؟",
    muted: "خدمات واضحة بنتائج حقيقية.",
    more: "التفاصيل (بالإنجليزية)",
    items: [
      { slug: "wordpress-development", name: "تطوير ووردبريس", text: "قوالب وإضافات مخصصة، Gutenberg وElementor، وإعادة تصميم المواقع مع SEO مدمج." },
      { slug: "seo-services", name: "خدمات SEO", text: "تحسين تقني وداخلي يساعد Google على فهم موقعك وترتيبه، مع متابعة النتائج في Search Console." },
      { slug: "woocommerce-development", name: "متاجر ووكومرس", text: "متاجر إلكترونية سهلة الإدارة، مع بوابات دفع وشحن وصفحات منتجات سريعة." },
      { slug: "wordpress-speed-optimization", name: "تسريع ووردبريس", text: "تحسين Core Web Vitals والتخزين المؤقت والصور، لموقع أسرع ومبيعات أعلى." },
      { slug: "nextjs-react-development", name: "تطوير Next.js وReact", text: "مواقع وتطبيقات ويب سريعة وصديقة لمحركات البحث." },
      { slug: "flutter-app-development", name: "تطبيقات Flutter", text: "تطبيقات أندرويد وiOS من كود واحد، مرتبطة بموقعك أو بواجهة API." },
    ],
  },
  results: {
    eyebrow: "النتائج",
    title: "أرقام حقيقية من Search Console،",
    muted: "لا وعود.",
    lead: "هذه الأرقام مأخوذة مباشرة من حسابات Google Search Console لعملائي، مع التواريخ التي تغطيها.",
    via: (agency) => `عبر وكالة ${agency}`,
    items: [
      {
        slug: "doctors-hospital-gujrat",
        text: "موقع مستشفى على ووردبريس، مع SEO تقني ومحلي لعمليات البحث عن الرعاية الصحية.",
        period: "6 أكتوبر – 7 نوفمبر 2026",
        results: [
          { value: "578", label: "نقرة" },
          { value: "17K", label: "ظهور" },
          { value: "6.6", label: "متوسط الترتيب" },
        ],
      },
      {
        slug: "jankowski-import-auto",
        text: "موقع ووردبريس وSEO مستمر لورشة صيانة سيارات ألمانية وأوروبية في الولايات المتحدة.",
        period: "آخر 28 يومًا مقارنة بالـ28 السابقة (حتى 7 نوفمبر 2026)",
        results: [
          { value: "+137%", label: "نقرات (30 ← 71)" },
          { value: "+238%", label: "ظهور" },
          { value: "13.6 ← 9.6", label: "متوسط الترتيب" },
        ],
      },
      {
        slug: "palbreedhub",
        text: "حاسبة تربية للعبة Palworld مبنية بـ Next.js وجاهزة لمحركات البحث منذ الإطلاق.",
        period: "29 أكتوبر – 7 نوفمبر 2026",
        results: [
          { value: "1.6K", label: "ظهور" },
          { value: "9", label: "نقرات" },
        ],
      },
    ],
  },
  why: {
    eyebrow: "لماذا أنا",
    title: "لماذا تعمل معي؟",
    muted: "",
    items: [
      { title: "مطوّر واحد من البداية للنهاية", text: "تتحدث مباشرة مع من يكتب الكود، بدون وسطاء أو مدير حساب." },
      { title: "SEO مدمج في كل موقع", text: "بنية نظيفة، Schema، خرائط موقع وإعداد Search Console ضمن كل مشروع." },
      { title: "سعر ثابت بالدولار", text: "تعرف التكلفة الكاملة قبل البدء، بدون فواتير مفاجئة." },
      { title: "ساعات تناسب الخليج", text: "متاح من 8 صباحًا حتى 1 بعد منتصف الليل بتوقيت الإمارات، طوال يوم العمل لديك." },
    ],
  },
  process: {
    eyebrow: "طريقة العمل",
    title: "خمس خطوات واضحة،",
    muted: "بدون مفاجآت.",
    steps: [
      { title: "فهم الهدف", text: "نتحدث عن احتياجات الموقع وجمهوره وما يعنيه النجاح بالنسبة لك." },
      { title: "تخطيط البنية", text: "نحدد الصفحات والمحتوى وأساسيات SEO قبل التصميم." },
      { title: "التصميم والتطوير", text: "أبني على المنصة المناسبة مع التركيز على السرعة والظهور في البحث." },
      { title: "المراجعة والتحسين", text: "نختبر معًا على أجهزة حقيقية وأراجع كل التفاصيل التقنية قبل الإطلاق." },
      { title: "الإطلاق والنمو", text: "الإطلاق، ربط Search Console، متابعة الأداء والتحسين المستمر." },
    ],
  },
  faq: {
    title: "أسئلة شائعة",
    items: [
      { q: "كم تكلفة موقع ووردبريس؟", a: "يعتمد السعر على عدد الصفحات والميزات والتصميم. أرسل تفاصيل مشروعك وستحصل على سعر ثابت بالدولار خلال 24 ساعة." },
      { q: "هل تعمل مع عملاء في الإمارات والخليج؟", a: "نعم، أعمل عن بُعد مع عملاء حول العالم، وساعات عملي تغطي يوم العمل الكامل في الإمارات." },
      { q: "هل يمكنني إدارة الموقع بنفسي؟", a: "نعم. أبني كل موقع بحيث يمكنك تعديل الصفحات والمنتجات من لوحة تحكم ووردبريس، وأشرح لك طريقة الاستخدام." },
      { q: "هل يمكنك بناء موقع باللغة العربية؟", a: "نعم، يمكنني بناء مواقع ووردبريس تدعم العربية والكتابة من اليمين إلى اليسار، ومواقع ثنائية اللغة عربي/إنجليزي." },
      { q: "بأي لغة نتواصل؟", a: "أتواصل بالإنجليزية عبر البريد الإلكتروني أو واتساب أو مكالمات الفيديو. ويمكنك كتابة طلبك بالعربية في النموذج." },
    ],
  },
  final: {
    eyebrow: "لنبدأ",
    title: "جاهز لبدء",
    muted: "مشروعك؟",
    lead: "أرسل التفاصيل وسأرد خلال 24 ساعة بسعر ثابت وجدول زمني واضح.",
    english: "تصفّح الموقع الكامل بالإنجليزية",
  },
  form: {
    title: "احصل على عرض سعر خلال 24 ساعة",
    types: [
      { value: "New WordPress website", label: "موقع ووردبريس جديد" },
      { value: "Redesign of an existing site", label: "إعادة تصميم موقع حالي" },
      { value: "WooCommerce store", label: "متجر ووكومرس" },
      { value: "Custom plugin or feature", label: "إضافة أو ميزة مخصصة" },
      { value: "Fix or speed up my site", label: "إصلاح أو تسريع موقعي" },
      { value: "SEO services", label: "خدمات SEO" },
      { value: "Something else", label: "شيء آخر" },
    ],
    text: {
      sub: "سعر ثابت بالدولار، جدول زمني وتفاصيل ما يشمله العمل. مجاني وبدون التزام.",
      name: "الاسم *",
      email: "البريد الإلكتروني *",
      type: "ماذا تحتاج؟",
      budget: "الميزانية (دولار)",
      phone: "واتساب / الهاتف (اختياري)",
      site: "موقعك الحالي (اختياري)",
      details: "تفاصيل المشروع *",
      detailsPlaceholder: "الصفحات، الميزات، الموعد النهائي، وأي شيء مهم.",
      send: "أرسل الطلب",
      sending: "جارٍ الإرسال…",
      whatsapp: "واتساب بدلاً من ذلك",
      note: "أرد خلال 24 ساعة. بياناتك تصلني أنا فقط.",
      thanks: "شكرًا{first}! وصل طلبك.",
      sep: " ",
      thanksText: "وصل طلبك إلى بريدي. سأرد عليك خلال 24 ساعة بعرض سعر والخطوات التالية.",
      whatsappDone: "راسلني على واتساب",
      again: "إرسال طلب آخر",
      budgets: [
        { value: "Under $500", label: "أقل من 500$" },
        { value: "$500 – $1,500", label: "500$ – 1,500$" },
        { value: "$1,500 – $5,000", label: "1,500$ – 5,000$" },
        { value: "$5,000+", label: "أكثر من 5,000$" },
        { value: "Not sure yet", label: "غير متأكد بعد" },
      ],
    },
  },
};

export const ur: LocaleContent = {
  locale: "ur",
  path: "/ur/",
  meta: {
    title: "فری لانس ورڈپریس ڈویلپر اور SEO ایکسپرٹ | عمیر صادق",
    description:
      "عمیر صادق، گجرات پاکستان سے ورڈپریس ڈویلپر اور SEO ایکسپرٹ۔ 100 سے زیادہ ویب سائٹس، ووکامرس اسٹورز، کسٹم پلگ انز اور SEO۔ 24 گھنٹوں میں فکسڈ قیمت۔",
  },
  hero: {
    eyebrow: "نئے پراجیکٹس کے لیے دستیاب",
    h1: "ورڈپریس ڈویلپر اور SEO ایکسپرٹ، جو ایسی ویب سائٹس بناتا ہے جو گوگل پر اوپر آئیں",
    lead: "میں عمیر صادق ہوں، گجرات (پاکستان) سے ورڈپریس ڈویلپر اور SEO اسپیشلسٹ۔ اب تک 100 سے زیادہ ویب سائٹس بنا چکا ہوں۔ تیز اور آسانی سے چلنے والی ویب سائٹس اور آن لائن اسٹورز، جن میں SEO پہلے دن سے شامل ہوتا ہے۔ پاکستان کے کاروباروں کے ساتھ ساتھ امریکہ، برطانیہ، امارات اور آسٹریلیا کے کلائنٹس کے لیے کام کرتا ہوں۔",
    cta: "24 گھنٹوں میں قیمت معلوم کریں",
    whatsapp: "واٹس ایپ پر بات کریں",
    hours: "روزانہ صبح 9 بجے سے رات 2 بجے تک دستیاب",
  },
  stats: [
    { value: "+100", label: "ویب سائٹس مکمل" },
    { value: "24 گھنٹے", label: "میں فکسڈ قیمت" },
    { value: "17 گھنٹے", label: "روزانہ دستیاب" },
    { value: "578", label: "گوگل کلکس · ڈاکٹرز ہسپتال" },
  ],
  services: {
    title: "میں آپ کے لیے کیا کر سکتا ہوں؟",
    muted: "",
    more: "تفصیل (انگریزی میں)",
    items: [
      { slug: "wordpress-development", name: "ورڈپریس ڈویلپمنٹ", text: "کسٹم تھیمز اور پلگ انز، گوٹنبرگ اور ایلیمنٹر، اور پرانی سائٹس کا نیا ڈیزائن، SEO کے ساتھ۔" },
      { slug: "seo-services", name: "SEO سروسز", text: "ٹیکنیکل اور آن پیج SEO تاکہ گوگل آپ کی سائٹ کو سمجھے اور اوپر لائے، سرچ کنسول میں نتائج کے ساتھ۔" },
      { slug: "woocommerce-development", name: "ووکامرس آن لائن اسٹور", text: "آسانی سے چلنے والے آن لائن اسٹورز، پیمنٹ، ڈیلیوری اور تیز پروڈکٹ پیجز کے ساتھ۔" },
      { slug: "wordpress-speed-optimization", name: "ورڈپریس اسپیڈ", text: "Core Web Vitals، کیشنگ اور تصاویر کی بہتری، تاکہ سائٹ تیز چلے اور زیادہ آرڈرز آئیں۔" },
      { slug: "nextjs-react-development", name: "Next.js اور React", text: "تیز اور SEO فرینڈلی ویب سائٹس اور ویب ایپس۔" },
      { slug: "flutter-app-development", name: "Flutter موبائل ایپس", text: "ایک ہی کوڈ سے اینڈرائیڈ اور iOS ایپس، آپ کی ویب سائٹ یا API سے جڑی ہوئی۔" },
    ],
  },
  results: {
    eyebrow: "نتائج",
    title: "سرچ کنسول کے اصل نمبرز،",
    muted: "وعدے نہیں۔",
    lead: "یہ نمبرز میرے کلائنٹس کے اپنے گوگل سرچ کنسول سے لیے گئے ہیں، تاریخوں کے ساتھ۔",
    via: (agency) => `بذریعہ ${agency}`,
    items: [
      {
        slug: "doctors-hospital-gujrat",
        text: "گجرات کے ایک ہسپتال کی ورڈپریس ویب سائٹ، ٹیکنیکل اور لوکل SEO کے ساتھ۔",
        period: "6 اکتوبر – 7 نومبر 2026",
        results: [
          { value: "578", label: "کلکس" },
          { value: "17K", label: "امپریشنز" },
          { value: "6.6", label: "اوسط پوزیشن" },
        ],
      },
      {
        slug: "jankowski-import-auto",
        text: "امریکہ میں جرمن اور یورپی گاڑیوں کی ورکشاپ کے لیے ورڈپریس سائٹ اور مسلسل SEO۔",
        period: "پچھلے 28 دن بمقابلہ اس سے پہلے کے 28 دن (7 نومبر 2026 تک)",
        results: [
          { value: "+137%", label: "کلکس (30 ← 71)" },
          { value: "+238%", label: "امپریشنز" },
          { value: "13.6 ← 9.6", label: "اوسط پوزیشن" },
        ],
      },
      {
        slug: "palbreedhub",
        text: "Palworld بریڈنگ کیلکولیٹر، Next.js میں بنا اور شروع سے SEO کے لیے تیار۔",
        period: "29 اکتوبر – 7 نومبر 2026",
        results: [
          { value: "1.6K", label: "امپریشنز" },
          { value: "9", label: "کلکس" },
        ],
      },
    ],
  },
  why: {
    eyebrow: "میں کیوں",
    title: "میرے ساتھ کام کیوں کریں؟",
    muted: "",
    items: [
      { title: "شروع سے آخر تک ایک ہی ڈویلپر", text: "آپ براہ راست اسی شخص سے بات کرتے ہیں جو کوڈ لکھتا ہے، بیچ میں کوئی نہیں۔" },
      { title: "ہر سائٹ میں SEO شامل", text: "صاف اسٹرکچر، سکیما، سائٹ میپ اور سرچ کنسول سیٹ اپ ہر پراجیکٹ کا حصہ ہیں۔" },
      { title: "فکسڈ قیمت، کوئی سرپرائز نہیں", text: "کام شروع ہونے سے پہلے پوری قیمت معلوم ہوتی ہے، بعد میں کوئی اضافی بل نہیں۔" },
      { title: "اردو میں بات چیت", text: "واٹس ایپ، فون یا ویڈیو کال، جیسے آپ کو آسان لگے۔ گجرات میں آمنے سامنے ملاقات بھی ممکن ہے۔" },
    ],
  },
  process: {
    eyebrow: "کام کا طریقہ",
    title: "پانچ آسان مراحل،",
    muted: "کوئی سرپرائز نہیں۔",
    steps: [
      { title: "مقصد سمجھنا", text: "ہم بات کرتے ہیں کہ سائٹ کو کیا کرنا ہے، کس کے لیے ہے اور کامیابی کیسی دکھتی ہے۔" },
      { title: "پلاننگ", text: "ڈیزائن سے پہلے پیجز، مواد اور SEO کی بنیاد طے ہوتی ہے۔" },
      { title: "ڈیزائن اور ڈویلپمنٹ", text: "صحیح پلیٹ فارم پر، رفتار اور سرچ کو مدنظر رکھ کر کام ہوتا ہے۔" },
      { title: "ریویو", text: "اصل موبائل اور کمپیوٹر پر مل کر ٹیسٹ کرتے ہیں، لانچ سے پہلے ہر تفصیل چیک ہوتی ہے۔" },
      { title: "لانچ اور ترقی", text: "سائٹ لائیو، سرچ کنسول میں سبمٹ، اور لانچ کے بعد بھی بہتری جاری۔" },
    ],
  },
  faq: {
    title: "اکثر پوچھے جانے والے سوالات",
    items: [
      { q: "ورڈپریس ویب سائٹ بنوانے کا خرچہ کتنا ہے؟", a: "یہ پیجز، فیچرز اور ڈیزائن پر منحصر ہے۔ اپنے پراجیکٹ کی تفصیل بھیجیں، 24 گھنٹوں میں فکسڈ قیمت بتا دوں گا۔" },
      { q: "کیا آپ پاکستان کے کاروباروں کے لیے کام کرتے ہیں؟", a: "جی ہاں۔ پاکستان کے کاروباروں کے ساتھ بھی کام کرتا ہوں اور باہر کے کلائنٹس کے ساتھ بھی۔ گجرات کے ڈاکٹرز ہسپتال کی ویب سائٹ اس کی ایک مثال ہے۔" },
      { q: "کیا میں خود ویب سائٹ چلا سکوں گا؟", a: "جی ہاں۔ ہر سائٹ ایسے بنتی ہے کہ آپ ورڈپریس ڈیش بورڈ سے پیجز اور پروڈکٹس خود بدل سکیں، اور میں آپ کو طریقہ بھی سکھاتا ہوں۔" },
      { q: "ویب سائٹ کتنے دن میں بنتی ہے؟", a: "5 سے 10 پیجز کی عام بزنس سائٹ عموماً 2 سے 4 ہفتے میں بنتی ہے۔ صحیح ٹائم لائن قیمت کے ساتھ بتا دیتا ہوں۔" },
      { q: "رابطہ کیسے کریں؟", a: "نیچے دیا گیا فارم بھریں یا واٹس ایپ پر +92 324 4604162 پر میسج کریں۔ صبح 9 بجے سے رات 2 بجے تک جواب دیتا ہوں۔" },
    ],
  },
  final: {
    eyebrow: "آئیں بات کریں",
    title: "اپنا پراجیکٹ شروع کرنے کے لیے",
    muted: "تیار ہیں؟",
    lead: "تفصیل بھیجیں، 24 گھنٹوں میں فکسڈ قیمت اور ٹائم لائن کے ساتھ جواب دوں گا۔",
    english: "پوری ویب سائٹ انگریزی میں دیکھیں",
  },
  form: {
    title: "24 گھنٹوں میں قیمت معلوم کریں",
    types: [
      { value: "New WordPress website", label: "نئی ورڈپریس ویب سائٹ" },
      { value: "Redesign of an existing site", label: "پرانی سائٹ کا نیا ڈیزائن" },
      { value: "WooCommerce store", label: "ووکامرس آن لائن اسٹور" },
      { value: "Custom plugin or feature", label: "کسٹم پلگ ان یا فیچر" },
      { value: "Fix or speed up my site", label: "سائٹ ٹھیک یا تیز کروانی ہے" },
      { value: "SEO services", label: "SEO سروسز" },
      { value: "Something else", label: "کچھ اور" },
    ],
    text: {
      sub: "فکسڈ قیمت، ٹائم لائن اور کام کی مکمل تفصیل۔ بالکل مفت، کوئی پابندی نہیں۔",
      name: "آپ کا نام *",
      email: "ای میل *",
      type: "آپ کو کیا چاہیے؟",
      budget: "بجٹ",
      phone: "واٹس ایپ / فون (اختیاری)",
      site: "موجودہ ویب سائٹ (اختیاری)",
      details: "پراجیکٹ کی تفصیل *",
      detailsPlaceholder: "پیجز، فیچرز، ڈیڈ لائن، جو بھی ضروری ہو۔",
      send: "درخواست بھیجیں",
      sending: "بھیجا جا رہا ہے…",
      whatsapp: "یا واٹس ایپ کریں",
      note: "24 گھنٹوں میں جواب دیتا ہوں۔ آپ کی معلومات صرف مجھ تک پہنچتی ہیں۔",
      thanks: "شکریہ{first}! آپ کی درخواست مل گئی۔",
      sep: " ",
      thanksText: "آپ کی درخواست میرے ان باکس میں پہنچ گئی ہے۔ 24 گھنٹوں میں قیمت اور اگلے مراحل کے ساتھ جواب دوں گا۔",
      whatsappDone: "واٹس ایپ کریں",
      again: "ایک اور بھیجیں",
      budgets: [
        { value: "Under PKR 50,000", label: "50,000 روپے سے کم" },
        { value: "PKR 50,000 – 150,000", label: "50,000 – 150,000 روپے" },
        { value: "PKR 150,000 – 500,000", label: "150,000 – 500,000 روپے" },
        { value: "PKR 500,000+", label: "500,000 روپے سے زیادہ" },
        { value: "Not sure yet", label: "ابھی معلوم نہیں" },
      ],
    },
  },
};

/** Languages for the switcher, in display order. */
export const languages = [
  { code: "en", href: "/", native: "English", english: "English", flags: ["us", "gb", "au"], regions: "US · UK · Australia" },
  { code: "ar", href: "/ar/", native: "العربية", english: "Arabic", flags: ["ae"], regions: "UAE · Gulf" },
  { code: "ur", href: "/ur/", native: "اردو", english: "Urdu", flags: ["pk"], regions: "Pakistan" },
] as const;

/** hreflang map shared by the home page and the two overview pages. */
export const hreflang = { en: "/", ar: "/ar/", ur: "/ur/", "x-default": "/" };
