import { Suspense } from "react";
import { CreateProductButton } from "@/components/createProductButton";
import { HydrationErrorTimestamp } from "@/components/hydrationErrorTimestamp";
import { ProductTable } from "@/components/productTable";
import { Spinner } from "@/components/spinner";

export default function Home() {
  return (
    <div className="space-y-4">
      <HydrationErrorTimestamp />
      <div className="flex justify-end">
        <CreateProductButton />
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductTable />
      </Suspense>
    </div>
  );
}
