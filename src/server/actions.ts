"use server";

import { db } from "./db";

export async function getAllProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.query.products.findMany();
}
