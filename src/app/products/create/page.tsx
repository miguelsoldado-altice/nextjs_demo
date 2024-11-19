import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/productForm";
import { createProduct } from "@/server/actions";

export default function Create() {
  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between gap-4 border-b pb-4 md:mx-2">
        <Link href="/" className="flex items-center gap-4">
          <ArrowLeft />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
            <span className="hidden text-muted-foreground md:flex">Add another product to the database</span>
          </div>
        </Link>
      </section>
      <ProductForm
        onSubmitAction={createProduct}
        successMessage="Product created successfully!"
        defaultValues={{ name: "", description: "", price: 0, sku: "" }}
      />
    </div>
  );
}
