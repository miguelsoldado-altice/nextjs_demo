"use server";

import { productSchema } from "@/components/productFormSchema";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";
import type { FormState } from "@/types";

export async function getAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.query.products.findMany();
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

export async function getProduct(productId: string) {
  if (isNaN(+productId)) {
    return null;
  }

  return db.query.products.findFirst({ where: eq(schema.products.id, +productId) });
}

export async function editProduct(_prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = productSchema.safeParse(formData);

  if (!parsed.success || !parsed.data.id) {
    return { message: "Invalid form data", success: false };
  }

  await db
    .update(schema.products)
    .set({ ...parsed.data, price: parsed.data.price.toFixed(2), updatedAt: new Date() })
    .where(eq(schema.products.id, parsed.data.id));

  return { message: `Product updated with id: ${parsed.data.id}`, success: true };
}
