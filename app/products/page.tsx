import { getCatalog } from "@/lib/catalog";
import { ProductsGrid } from "@/components/ProductsGrid";

export const metadata = {
  title: "כל המוצרים | קמפאיזי",
};

export default async function ProductsPage() {
  const catalog = await getCatalog();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold text-camp-forest-900">כל מוצרי הקמפינג</h1>
      <ProductsGrid products={catalog} />
    </div>
  );
}
