"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ActionsButtonsProps {
  productId: number;
}

export function ActionsButtons({ productId }: ActionsButtonsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        const response = await fetch("/api/product", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productId }),
        });

        if (response.ok) {
          toast.success("Product deleted successfully.");
          return router.refresh();
        }

        toast.error("Error deleting the product.");
      } catch {
        toast.error("Error deleting the product.");
      } finally {
        setOpen(false);
      }
    });
  }

  return (
    <div className="flex gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="size-8" variant="destructive" size="icon">
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button className="size-8" size="icon" asChild>
        <Link href={`/edit/${productId}`}>
          <Edit />
        </Link>
      </Button>
    </div>
  );
}
