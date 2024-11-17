import { Suspense } from "react";
import { ProductTable } from "@/components/productTable";
import { Spinner } from "@/components/spinner";
import { CreateProductButton } from "@/components/createProductButton"; // Adjust the import path as necessary

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateProductButton />
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductTable />
      </Suspense>
    </div>
  );
}
