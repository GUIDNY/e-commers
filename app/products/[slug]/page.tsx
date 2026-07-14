import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getCatalogEntry } from "@/lib/catalog";
import { TruckIcon, BoxIcon } from "@/components/Icons";
import { ProductThumb } from "@/components/ProductThumb";
import { ProductDetailActions } from "@/components/ProductDetailActions";

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getCatalogEntry(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-sm text-camp-bark-800/70">
        <Link href="/" className="hover:underline">
          בית
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:underline">
          מוצרים
        </Link>{" "}
        / <span>{product.nameHe}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid aspect-square place-items-center overflow-hidden rounded-3xl bg-camp-sand-100 text-camp-forest-700 shadow-[0_4px_20px_rgba(31,51,39,0.08)]">
          <ProductThumb imageUrl={product.imageUrl} icon={product.icon} alt={product.nameHe} iconClassName="h-40 w-40" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-camp-bark-800 sm:text-3xl">{product.nameHe}</h1>
          <p className="mt-1 text-sm text-camp-bark-800/50">{product.nameEn}</p>

          <ProductDetailActions product={product} />

          {product.shipsToIsrael !== false && (
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-camp-sand-100 p-3 text-sm text-camp-bark-800">
              <TruckIcon className="h-5 w-5 shrink-0 text-camp-forest-700" />
              <span>
                משלוח לישראל: זמן אספקה משוער {product.etaDays[0]}-{product.etaDays[1]} ימי עסקים.
              </span>
            </div>
          )}

          <p className="mt-6 leading-relaxed text-camp-bark-800">{product.descriptionHe}</p>

          <div className="mt-6 rounded-xl border border-camp-sand-200 bg-white p-4">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-camp-forest-900">
              <BoxIcon className="h-5 w-5 text-camp-amber-600" />
              מה בדיוק מגיע באריזה
            </h2>
            <ul className="space-y-2 text-sm text-camp-bark-800">
              {product.packageContentsHe.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-camp-forest-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-camp-bark-800/50">
              {product.priceSource === "cj-live"
                ? "רשימת האריזה מבוססת על נתוני היצרן בפועל."
                : "רשימת אריזה משוערת - טרם אומתה מול נתוני יצרן חיים."}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="mb-3 font-bold text-camp-forest-900">מפרט</h2>
            <ul className="space-y-2 text-sm text-camp-bark-800">
              {product.specsHe.map((spec) => (
                <li key={spec} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-camp-amber-600" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
