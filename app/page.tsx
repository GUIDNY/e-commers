import Link from "next/link";
import { getCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { TentIcon, TruckIcon, ShieldIcon, LeafIcon } from "@/components/Icons";

export default async function Home() {
  const catalog = await getCatalog();
  const featured = catalog.filter((p) => p.featured);

  return (
    <div>
      <section className="relative overflow-hidden bg-camp-forest-900 text-camp-sand-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:py-24 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-camp-amber-500">
              <TentIcon className="h-4 w-4" /> ציוד קמפינג נבחר, ישירות אליכם
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              כל מה שצריך <span className="text-camp-amber-500">לטיול הבא</span> שלכם
            </h1>
            <p className="mt-4 max-w-md text-camp-sand-100/80">
              מקלחות שדה, תאורת LED, כלי בישול וציוד שינה - קטלוג קמפינג אוצר ביד, במחירים הוגנים ומשלוח עד הבית
              בישראל.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/products"
                className="rounded-full bg-camp-amber-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-camp-amber-500"
              >
                לכל המוצרים
              </Link>
              <Link
                href="#featured"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                מוצרים נבחרים
              </Link>
            </div>
          </div>
          <div className="mx-auto grid h-56 w-56 place-items-center rounded-full bg-white/5 sm:h-72 sm:w-72">
            <TentIcon className="h-32 w-32 text-camp-amber-500 sm:h-40 sm:w-40" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-camp-sand-200 bg-white p-4">
            <TruckIcon className="h-6 w-6 text-camp-forest-700" />
            <p className="text-sm font-medium text-camp-bark-800">משלוח לכל הארץ, 12-26 ימי עסקים</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-camp-sand-200 bg-white p-4">
            <ShieldIcon className="h-6 w-6 text-camp-forest-700" />
            <p className="text-sm font-medium text-camp-bark-800">מחירים שקופים, ללא עמלות נסתרות</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-camp-sand-200 bg-white p-4">
            <LeafIcon className="h-6 w-6 text-camp-forest-700" />
            <p className="text-sm font-medium text-camp-bark-800">קטלוג אוצר ביד לחובבי טבע</p>
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
