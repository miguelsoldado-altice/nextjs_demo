import { Suspense } from "react";
import { ProductTable } from "@/components/productTable";
import { Spinner } from "@/components/spinner";

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductTable />
    </Suspense>
  );
}
