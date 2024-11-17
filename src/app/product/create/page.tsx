import React from "react";
import { CreateProductForm } from "@/components/createProductForm";

export default function Create() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Create Product</h1>
      <CreateProductForm />
    </div>
  );
}
