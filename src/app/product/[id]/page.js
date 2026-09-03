import ProductPageClient from "@/components/Products/ProductPageClient";

export default async function ProductPage({ params }) {
  const { id } = await params;

  return <ProductPageClient id={id} />;
}