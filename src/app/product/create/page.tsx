import React from "react";
import { ProductForm } from "@/components/productForm";
import { createProduct } from "@/server/actions";

export default function Create() {
  return (
    <div className="space-y-8">
      <section className="flex justify-between gap-4 border-b pb-4 md:mx-2 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <span className="hidden text-muted-foreground md:flex">Add another product to the database</span>
        </div>
      </section>
      <ProductForm
        onSubmitAction={createProduct}
        successMessage="Product created successfully!"
        defaultValues={{ name: "", description: "", price: 0, sku: "" }}
      />
    </div>
  );
}
