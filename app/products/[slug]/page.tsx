import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getCatalogEntry } from "@/lib/catalog";
import { TruckIcon } from "@/components/Icons";
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
        <div className="grid aspect-square place-items-center overflow-hidden rounded-3xl bg-camp-sand-100 text-camp-forest-700">
          <ProductThumb imageUrl={product.imageUrl} icon={product.icon} alt={product.nameHe} iconClassName="h-40 w-40" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-camp-bark-800 sm:text-3xl">{product.nameHe}</h1>
          <p className="mt-1 text-sm text-camp-bark-800/50">{product.nameEn}</p>

          <ProductDetailActions product={product} />

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-camp-sand-100 p-3 text-sm text-camp-bark-800">
            <TruckIcon className="h-5 w-5 shrink-0 text-camp-forest-700" />
            <span>
              משלוח לישראל: זמן אספקה משוער {product.etaDays[0]}-{product.etaDays[1]} ימי עסקים.
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-camp-bark-800">{product.descriptionHe}</p>

          <div className="mt-6">
            <h2 className="mb-2 font-bold text-camp-forest-900">מפרט</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-camp-bark-800">
              {product.specsHe.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
