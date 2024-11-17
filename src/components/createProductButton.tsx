import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary

export function CreateProductButton() {
  return (
    <Link href="/product/create" passHref>
      <Button className="mr-2 mt-2">Create Product</Button>
    </Link>
  );
}
