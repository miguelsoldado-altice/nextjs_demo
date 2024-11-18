import { getAllProducts } from "@/server/actions";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionsButtons } from "./actionsButtons";

export async function ProductTable() {
  const products = await getAllProducts();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="w-8">Name</TableHead>
          <TableHead className="w-36">Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate">{product.id}</TableCell>
            <TableCell className="truncate">{product.name}</TableCell>
            <TableCell className="max-w-xs truncate">{product.description}</TableCell>
            <TableCell className="truncate">€ {product.price}</TableCell>
            <TableCell className="truncate">{new Date(product.createdAt).toLocaleString("pt-PT")}</TableCell>
            <TableCell className="truncate">{new Date(product.updatedAt).toLocaleString("pt-PT")}</TableCell>
            <TableCell>
              <ActionsButtons productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Products: {products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
