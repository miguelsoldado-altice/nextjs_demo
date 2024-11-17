import { ProductForm } from "@/components/productForm";
import { editProduct, getProduct } from "@/server/actions";
import { redirect } from "next/navigation";

interface EditProps {
  params: Promise<{ productId: string }>;
}

export default async function Edit({ params }: EditProps) {
  const product = await getProduct((await params).productId);

  if (!product) {
    redirect("/");
  }

  return (
    <div className="space-y-8">
      <section className="flex justify-between gap-4 border-b pb-4 md:mx-2 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <span className="hidden text-muted-foreground md:flex">Make changes to an existing product</span>
        </div>
      </section>
      <ProductForm
        onSubmitAction={editProduct}
        successMessage="Product edited successfully!"
        defaultValues={{ ...product, price: +product.price, description: product.description ?? undefined }}
      />
    </div>
  );
}
