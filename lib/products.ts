import { Product } from "./types";

/**
 * Curated starter catalog for the camping store.
 *
 * Cost prices (costUsd) are research-based CJdropshipping-range estimates
 * (priceSource: "estimated"). Once the CJ_API credentials are configured and
 * this app runs somewhere with outbound network access to CJdropshipping,
 * `/api/products` will replace these with live supplier prices from CJ and
 * flip priceSource to "cj-live" automatically - see lib/cj.ts.
 */
export const products: Product[] = [
  {
    slug: "portable-electric-camping-shower",
    nameHe: 'מקלחת קמפינג נטענת ניידת חשמלית 5000mAh עמידה למים',
    nameEn:
      "Outdoor Camping Shower Portable Electric Shower Gadgets Waterproof 5000mAh Rechargeable Battery Powered For Hiking Traveling",
    descriptionHe:
      "משאבת מקלחת ניידת וחשמלית לקמפינג וטיולים - מתחברת לכל דלי או מיכל מים ויוצרת זרם מקלחת נוח. סוללה נטענת 5000mAh בטעינת USB, עמידה למים, קלה לנשיאה. מושלמת לטיולי שטח, קמפינג, רחיצת כלבים ושטיפת רכב.",
    category: "shower-hygiene",
    costUsd: 14.9,
    shippingUsd: 12,
    etaDays: [14, 24],
    priceSource: "estimated",
    icon: "shower",
    imageUrl: "https://images.unsplash.com/photo-1588127727253-e5f2faf4f541?w=800&q=80&auto=format&fit=crop",
    featured: true,
    specsHe: [
      "סוללת ליתיום 5000mAh, טעינה בכבל USB",
      "עמיד למים (IPX7)",
      "זמן פעולה: כ-70-90 דקות בטעינה מלאה",
      "משקל קל, מתאים לתרמיל גב",
    ],
  },
  {
    slug: "led-camping-lantern-rechargeable",
    nameHe: "פנס קמפינג LED נטען מתקפל לתלייה באוהל",
    nameEn: "Rechargeable Folding LED Camping Lantern Tent Light",
    descriptionHe:
      "פנס LED מתקפל וקומפקטי לאוהל, נטען ב-USB עם מספר עוצמות תאורה ווו לתלייה. תאורת חירום מעולה לקמפינג, הפסקות חשמל וטיולי לילה.",
    category: "lighting",
    costUsd: 8.5,
    shippingUsd: 6,
    etaDays: [12, 20],
    priceSource: "estimated",
    icon: "lantern",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80&auto=format&fit=crop",
    featured: true,
    specsHe: ["נטען USB-C", "3 מצבי תאורה", "מתקפל לגודל כף יד", "וו תלייה מובנה"],
  },
  {
    slug: "mini-windproof-camping-stove",
    nameHe: "כיריים גז ניידות מיני עמידות ברוח לקמפינג",
    nameEn: "Mini Portable Windproof Camping Gas Stove",
    descriptionHe:
      "כיריים גז קומפקטיות ומתקפלות לבישול בשטח, עמידות ברוח, קלות משקל וקלות להרכבה. מתאימות לגסטרו קמפינג, טרקים וחירום.",
    category: "cooking",
    costUsd: 15.9,
    shippingUsd: 9,
    etaDays: [14, 22],
    priceSource: "estimated",
    icon: "stove",
    specsHe: ["מתקפלות לגודל כיס", "עמידות ברוח", "משקל: כ-200 גרם", "כולל תיק נשיאה"],
  },
  {
    slug: "inflatable-travel-pillow",
    nameHe: "כרית טיולים מתנפחת קומפקטית",
    nameEn: "Inflatable Compact Travel & Camping Pillow",
    descriptionHe:
      "כרית מתנפחת קלת משקל ואולטרה-קומפקטית לתרמיל, מתאימה לקמפינג, טיסות וטיולי שטח. מתקפלת לגודל כף יד.",
    category: "sleep-comfort",
    costUsd: 6.5,
    shippingUsd: 5,
    etaDays: [12, 20],
    priceSource: "estimated",
    icon: "pillow",
    specsHe: ["מתנפחת/מתרוקנת בשניות", "משקל: כ-80 גרם", "כולל שקית נשיאה"],
  },
  {
    slug: "solar-power-bank-20000mah",
    nameHe: "סוללת גיבוי סולארית 20000mAh לקמפינג",
    nameEn: "Solar Power Bank 20000mAh Outdoor Camping Charger",
    descriptionHe:
      "סוללת גיבוי בקיבולת גבוהה עם פאנל סולארי לטעינה בשטח, פנס LED מובנה ומספר יציאות USB. חיוני לכל טיול קמפינג ממושך.",
    category: "power",
    costUsd: 17.9,
    shippingUsd: 10,
    etaDays: [14, 24],
    priceSource: "estimated",
    icon: "power-bank",
    imageUrl: "https://images.pexels.com/photos/518530/pexels-photo-518530.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    specsHe: ["קיבולת 20000mAh", "פאנל טעינה סולארי", "פנס LED מובנה", "2 יציאות USB יציאה"],
  },
  {
    slug: "double-camping-hammock",
    nameHe: "ערסל קמפינג זוגי מבד פרשוט",
    nameEn: "Double Portable Parachute Nylon Camping Hammock",
    descriptionHe:
      "ערסל זוגי עמיד וקל משקל מבד ניילון פרשוט, כולל רצועות תלייה וקרביטנים. מתקפל לתיק נשיאה קטן - מושלם לטיולים וקמפינג.",
    category: "sleep-comfort",
    costUsd: 12.5,
    shippingUsd: 9,
    etaDays: [14, 22],
    priceSource: "estimated",
    icon: "hammock",
    imageUrl: "https://images.pexels.com/photos/33933884/pexels-photo-33933884.jpeg?auto=compress&cs=tinysrgb&w=800",
    specsHe: ["עומס מקסימלי: עד 200 ק\"ג", "כולל רצועות וקרביטנים", "מתקפל לגודל כף יד"],
  },
  {
    slug: "usb-led-headlamp",
    nameHe: "פנס ראש LED נטען USB עמיד למים",
    nameEn: "USB Rechargeable Waterproof LED Headlamp",
    descriptionHe:
      "פנס ראש קל וחזק, נטען ב-USB, עמיד למים ומושלם לטיולי לילה, ריצה, קמפינג ועבודה בשטח. רצועה מתכווננת ונוחה.",
    category: "lighting",
    costUsd: 7.2,
    shippingUsd: 5,
    etaDays: [12, 20],
    priceSource: "estimated",
    icon: "headlamp",
    imageUrl: "https://images.unsplash.com/photo-1449710146567-1e282fa41f2f?w=800&q=80&auto=format&fit=crop",
    specsHe: ["נטען USB", "עמיד למים IPX5", "מספר מצבי תאורה", "משקל קל במיוחד"],
  },
  {
    slug: "folding-camping-chair",
    nameHe: "כיסא קמפינג מתקפל וקומפקטי",
    nameEn: "Compact Folding Camping Chair",
    descriptionHe:
      "כיסא קמפינג נוח, יציב וקל לנשיאה, מתקפל לתיק קומפקטי עם רצועת נשיאה. מתאים לפסטיבלים, חופים וטיולי שטח.",
    category: "furniture",
    costUsd: 21.9,
    shippingUsd: 16,
    etaDays: [16, 26],
    priceSource: "estimated",
    icon: "chair",
    imageUrl: "https://images.pexels.com/photos/11441859/pexels-photo-11441859.jpeg?auto=compress&cs=tinysrgb&w=800",
    specsHe: ["עומס מקסימלי: עד 120 ק\"ג", "מתקפל לתיק נשיאה", "מסגרת אלומיניום קלה"],
  },
  {
    slug: "portable-water-filter-straw",
    nameHe: "קש סינון מים ניידת להישרדות וטיולים",
    nameEn: "Portable Survival Water Filter Straw",
    descriptionHe:
      "קש סינון מים ניידת המסננת חיידקים וזיהומים ישירות ממקור מים טבעי - ציוד חיוני לכל תיק חירום או טיול שטח.",
    category: "tools-safety",
    costUsd: 8.9,
    shippingUsd: 6,
    etaDays: [12, 20],
    priceSource: "estimated",
    icon: "water-filter",
    specsHe: ["מסננת עד 99.9% מחיידקים", "אורך חיים: כ-1500 ליטר", "קלה ואולטרה-קומפקטית"],
  },
  {
    slug: "ultralight-inflatable-sleeping-pad",
    nameHe: "מזרן שינה מתנפח אולטרה-קליל לקמפינג",
    nameEn: "Ultralight Inflatable Camping Sleeping Pad",
    descriptionHe:
      "מזרון שינה מתנפח ונוח, מבודד קור, קליל במיוחד ומתקפל לגודל בקבוק שתייה. מושלם לקמפינג וטרקים ארוכים.",
    category: "sleep-comfort",
    costUsd: 19.9,
    shippingUsd: 12,
    etaDays: [16, 25],
    priceSource: "estimated",
    icon: "sleeping-pad",
    specsHe: ["בידוד תרמי", "מתנפח ידנית תוך דקות", "מתקפל לגודל קומפקטי"],
  },
  {
    slug: "led-mosquito-camping-lantern",
    nameHe: "פנס קמפינג עם קוטל יתושים LED",
    nameEn: "LED Camping Lantern with Mosquito Killer",
    descriptionHe:
      "פנס קמפינג נטען המשלב תאורת LED וקוטל יתושים אלקטרוני - שומר על האוהל מואר ונקי מחרקים לאורך כל הלילה.",
    category: "lighting",
    costUsd: 10.5,
    shippingUsd: 7,
    etaDays: [14, 22],
    priceSource: "estimated",
    icon: "bug-lantern",
    imageUrl: "https://images.unsplash.com/photo-1523365154888-8a758819b722?w=800&q=80&auto=format&fit=crop",
    specsHe: ["קוטל יתושים אלקטרוני מובנה", "נטען USB", "וו תלייה לאוהל"],
  },
  {
    slug: "folding-portable-bbq-grill",
    nameHe: "מנגל פחמים מתקפל וניידת לקמפינג",
    nameEn: "Folding Portable Charcoal BBQ Grill",
    descriptionHe:
      "מנגל פחמים קומפקטי ומתקפל מנירוסטה, קל להרכבה ולפירוק - אידיאלי לטיולי שטח, חופים וקמפינג משפחתי.",
    category: "cooking",
    costUsd: 16.9,
    shippingUsd: 14,
    etaDays: [16, 26],
    priceSource: "estimated",
    icon: "grill",
    imageUrl: "https://images.pexels.com/photos/7893772/pexels-photo-7893772.jpeg?auto=compress&cs=tinysrgb&w=800",
    specsHe: ["גוף נירוסטה עמיד", "מתקפל תוך שניות", "כולל תיק נשיאה"],
  },
  {
    slug: "portable-cookware-mess-kit",
    nameHe: "סט כלי בישול ניידים לקמפינג",
    nameEn: "Portable Camping Cookware Mess Kit",
    descriptionHe:
      "סט סירים וכלי אכילה קומפקטי מאלומיניום קל משקל, כולל תיק נשיאה - כל מה שצריך לבישול בשטח.",
    category: "cooking",
    costUsd: 13.9,
    shippingUsd: 9,
    etaDays: [14, 22],
    priceSource: "estimated",
    icon: "cookware",
    imageUrl: "https://images.pexels.com/photos/31423668/pexels-photo-31423668.jpeg?auto=compress&cs=tinysrgb&w=800",
    specsHe: ["אלומיניום אנודייז קל משקל", "כולל סיר, מחבת וכלי אכילה", "מתקפל לגודל קומפקטי"],
  },
  {
    slug: "multi-tool-survival-knife",
    nameHe: "כלי רב-תכליתי להישרדות וקמפינג",
    nameEn: "Multi-Tool Survival Camping Knife",
    descriptionHe:
      "כלי רב-תכליתי קומפקטי הכולל סכין, פותחן, מברג ועוד - ציוד בסיס לכל תיק קמפינג או תיק חירום.",
    category: "tools-safety",
    costUsd: 7.9,
    shippingUsd: 6,
    etaDays: [12, 20],
    priceSource: "estimated",
    icon: "multi-tool",
    imageUrl: "https://images.pexels.com/photos/2599276/pexels-photo-2599276.jpeg?auto=compress&cs=tinysrgb&w=800",
    specsHe: ["פלדת נירוסטה", "מספר כלים במכשיר אחד", "כולל נרתיק נשיאה"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
