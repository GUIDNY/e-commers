import Image from "next/image";
import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { TentIcon, TruckIcon, ShieldIcon, LeafIcon } from "@/components/Icons";

export default async function Home() {
  const catalog = await getCatalog();
  const featured = catalog.filter((p) => p.featured);

  return (
    <div>
      <section className="relative isolate overflow-hidden text-camp-sand-50">
        <Image src="/hero-camping.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-camp-forest-900 via-camp-forest-900/65 to-camp-forest-900/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-camp-forest-900/20 via-transparent to-transparent" />

        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-36">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-camp-amber-500 backdrop-blur-sm">
            <TentIcon className="h-4 w-4" /> ציוד קמפינג נבחר, ישירות אליכם
          </span>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight drop-shadow-sm sm:text-6xl">
            כל מה שצריך <span className="text-camp-amber-500">לטיול הבא</span> שלכם
          </h1>
          <p className="mt-4 max-w-md text-camp-sand-100/90">
            מקלחות שדה, תאורת LED, כלי בישול וציוד שינה - קטלוג קמפינג אוצר ביד, במחירים הוגנים ומשלוח עד הבית
            בישראל.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/products"
              className="rounded-full bg-camp-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-camp-amber-500 active:scale-95"
            >
              לכל המוצרים
            </Link>
            <Link
              href="#featured"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 active:scale-95"
            >
              מוצרים נבחרים
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-camp-sand-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-camp-forest-700/10 text-camp-forest-700">
              <TruckIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-camp-forest-900">9-27 ימי עסקים</p>
              <p className="mt-1 text-sm text-camp-bark-800/70">זמן אספקה משוער, לפי מוצר</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-camp-forest-700/10 text-camp-forest-700">
              <ShieldIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-camp-forest-900">מחירים שקופים</p>
              <p className="mt-1 text-sm text-camp-bark-800/70">עלות המשלוח מוצגת מראש, ללא עמלות נסתרות</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-camp-forest-700/10 text-camp-forest-700">
              <LeafIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-camp-forest-900">קטלוג אוצר ביד</p>
              <p className="mt-1 text-sm text-camp-bark-800/70">כל מוצר נבחר ונבדק בעצמנו לפני שהוא עולה לאתר</p>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-camp-forest-900">מוצרים נבחרים</h2>
          <Link href="/products" className="text-sm font-semibold text-camp-forest-700 hover:underline">
            לכל המוצרים ←
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-camp-sand-100/60 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-camp-forest-900 sm:text-3xl">הסיפור שלנו</h2>
            <p className="mt-4 leading-relaxed text-camp-bark-800">
              קמפאיזי היא חנות קטנה שמרכזת עבורכם ציוד קמפינג וטיולים - כל מוצר בקטלוג נבחר ונבדק על ידינו לפני
              שהוא עולה לאתר, במקום להציף אתכם באלפי פריטים לא ברורים. המחיר שאתם רואים כולל את עלות המשלוח
              האמיתית לישראל, בלי הפתעות בקופה.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-camp-forest-900">
            <Image
              src="/story-gear.jpg"
              alt="ציוד טיולים ארוז ומוכן לדרך"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-extrabold text-camp-forest-900">כל המוצרים</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {catalog.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
