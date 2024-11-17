"use server";

import { productSchema } from "@/components/productFormSchema";
import { db } from "./db";
import * as schema from "./db/schema";

export async function getAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.query.products.findMany();
}

interface FormState {
  message: string;
  success?: boolean;
}

export async function createProduct(_prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = productSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid form data", success: false };
  }

  if (parsed.data.name.toLowerCase().includes("digi")) {
    return { message: "Product name cannot contain 'digi'", success: false };
  }

  const [product] = await db
    .insert(schema.products)
    .values({ ...parsed.data, price: parsed.data.price.toFixed(2) })
    .returning({ id: schema.products.id });

  return { message: `Product created with id: ${product.id}`, success: true };
}
