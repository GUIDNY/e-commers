import Link from "next/link";
import { LeafIcon, ShieldIcon, TruckIcon } from "./Icons";

export function Footer() {
  return (
    <footer id="shipping" className="mt-16 border-t border-camp-sand-200 bg-camp-forest-900 text-camp-sand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div className="flex gap-3">
          <TruckIcon className="h-6 w-6 shrink-0 text-camp-amber-500" />
          <div>
            <p className="font-semibold">משלוח עד הבית בישראל</p>
            <p className="mt-1 text-sm text-camp-sand-200/80">
              משלוח בינלאומי לכל הארץ, זמן אספקה משוער 12-26 ימי עסקים לפי מוצר.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ShieldIcon className="h-6 w-6 shrink-0 text-camp-amber-500" />
          <div>
            <p className="font-semibold">קנייה בטוחה</p>
            <p className="mt-1 text-sm text-camp-sand-200/80">מחירים שקופים כולל עלות משלוח, ללא עמלות נסתרות.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <LeafIcon className="h-6 w-6 shrink-0 text-camp-amber-500" />
          <div>
            <p className="font-semibold">נבחר במיוחד לחובבי טבע</p>
            <p className="mt-1 text-sm text-camp-sand-200/80">קטלוג אוצר ביד, ממוקד קמפינג, טיולים וטרקים.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-camp-sand-200/70">
        <p>
          © {new Date().getFullYear()} קמפ<span className="text-camp-amber-500">איזי</span> · חנות דמו לניהול קטלוג
          קמפינג ·{" "}
          <Link href="/products" className="underline hover:text-white">
            כל המוצרים
          </Link>
        </p>
      </div>
    </footer>
  );
}
