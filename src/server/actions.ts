"use server";

import { eq } from "drizzle-orm";
import { productSchema } from "@/components/productFormSchema";
import { db } from "./db";
import * as schema from "./db/schema";
import type { FormState } from "@/types";

export async function getAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.query.products.findMany({ orderBy: (products, { desc }) => [desc(products.updatedAt)] });
}

export async function createProduct(_prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = productSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid form data", success: false };
  }

  const [product] = await db
    .insert(schema.products)
    .values({
      name: parsed.data.name.trim(),
      price: parsed.data.price.toFixed(2),
      description: parsed.data.description?.trim(),
      sku: parsed.data.sku.trim(),
    })
    .returning({ id: schema.products.id });

  return { message: `Product created with id: ${product.id}`, success: true };
}

export async function getProduct(productId: string) {
  if (isNaN(+productId)) {
    return null;
  }

  return db.query.products.findFirst({ where: eq(schema.products.id, +productId) });
}

export async function editProduct(_prevState: FormState, data: FormData, productId?: number): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = productSchema.safeParse(formData);

  if (!parsed.success || !productId) {
    return { message: "Invalid form data", success: false };
  }

  const [product] = await db
    .update(schema.products)
    .set({
      name: parsed.data.name.trim(),
      price: parsed.data.price.toFixed(2),
      description: parsed.data.description?.trim(),
      sku: parsed.data.sku.trim(),
      updatedAt: new Date(),
    })
    .where(eq(schema.products.id, productId))
    .returning({ id: schema.products.id });

  return { message: `Product updated with id: ${product.id}`, success: true };
}
