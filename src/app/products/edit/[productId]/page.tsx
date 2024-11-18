import Link from "next/link";
import { redirect } from "next/navigation";
import { editProduct, getProduct } from "@/server/actions";
import { ArrowLeft } from "lucide-react";
import { DeleteProductDialog } from "@/components/deleteProductDialog";
import { ProductForm } from "@/components/productForm";
import { Button } from "@/components/ui/button";

interface EditProps {
  params: Promise<{ productId: string }>;
}

export default async function Edit({ params }: EditProps) {
  const product = await getProduct((await params).productId);
  if (!product) redirect("/");

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between gap-4 border-b pb-4 md:mx-2">
        <Link href="/" className="flex items-center gap-4">
          <ArrowLeft />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <span className="hidden text-muted-foreground md:flex">Make changes to an existing product</span>
          </div>
        </Link>
        <DeleteProductDialog productId={product.id}>
          <Button variant="destructive">Delete Product</Button>
        </DeleteProductDialog>
      </section>
      <ProductForm
        onSubmitAction={editProduct}
        successMessage="Product edited successfully!"
        defaultValues={{ ...product, price: +product.price, description: product.description ?? undefined }}
        productId={product.id}
      />
    </div>
  );
}
