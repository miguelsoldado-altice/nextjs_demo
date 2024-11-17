"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { DeleteProductDialog } from "./deleteProductDialog";
import { Button } from "./ui/button";

interface ActionsButtonsProps {
  productId: number;
}

export function ActionsButtons({ productId }: ActionsButtonsProps) {
  return (
    <div className="flex gap-2">
      <DeleteProductDialog productId={productId}>
        <Button className="size-8" variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </DeleteProductDialog>
      <Button className="size-8" size="icon" asChild>
        <Link href={`/product/edit/${productId}`}>
          <Edit />
        </Link>
      </Button>
    </div>
  );
}
