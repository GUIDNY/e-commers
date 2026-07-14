import type { CatalogEntry } from "@/lib/catalog";

const GENERAL_FAQ = [
  {
    q: "כמה זמן לוקח המשלוח?",
    a: "בדרך כלל בין שבוע לחודש, תלוי במוצר (הטווח המדויק מופיע למעלה בעמוד המוצר). פרטים מלאים על מקור המשלוח בתקנון.",
  },
  {
    q: "האם יש עלויות מכס נוספות?",
    a: "המחיר שמוצג באתר הוא המחיר הסופי הצפוי, אך במקרים נדירים של הזמנות בשווי גבוה במיוחד רשות המכס עשויה לגבות מס נוסף בהתאם לתקנות היבוא הרשמיות - לא בשליטתנו.",
  },
  {
    q: "מה קורה אם המוצר מגיע פגום או שונה מהותית מהתיאור?",
    a: "צרו איתנו קשר עם מספר ההזמנה ותמונה של הבעיה, ונבדוק יחד את הפתרון המתאים - החלפה או החזר כספי.",
  },
];

export function ProductFaq({ product }: { product: CatalogEntry }) {
  return (
    <div className="mt-6">
      <h2 className="mb-3 font-bold text-camp-forest-900">שאלות נפוצות</h2>
      <div className="space-y-2">
        {GENERAL_FAQ.map((item) => (
          <details key={item.q} className="group rounded-xl border border-camp-sand-200 bg-white p-4">
            <summary className="cursor-pointer list-none font-semibold text-camp-bark-800 marker:content-none">
              <span className="flex items-center justify-between">
                {item.q}
                <span className="text-camp-forest-700 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-camp-bark-800/80">{item.a}</p>
          </details>
        ))}
        {product.shipsToIsrael === false && (
          <details className="group rounded-xl border border-amber-300 bg-amber-50 p-4">
            <summary className="cursor-pointer list-none font-semibold text-camp-bark-800 marker:content-none">
              <span className="flex items-center justify-between">
                למה אי אפשר להזמין את המוצר הזה?
                <span className="text-camp-forest-700 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-camp-bark-800/80">
              הספק שלנו לא מציע כרגע משלוח לישראל עבור המוצר הספציפי הזה - השארנו אותו בקטלוג לעיון בלבד.
            </p>
          </details>
        )}
      </div>
    </div>
  );
}
