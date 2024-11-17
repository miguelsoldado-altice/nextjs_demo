import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const [result] = await db
    .delete(schema.products)
    .where(eq(schema.products.id, id))
    .returning({ id: schema.products.id });

  if (result.id) return Response.json({ message: "Product deleted successfully." }, { status: 200 });
  return Response.json({ message: "Error deleting the product." }, { status: 500 });
}
