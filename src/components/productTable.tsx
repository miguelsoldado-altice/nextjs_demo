import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { getAllProducts } from "@/server/actions";

export async function ProductTable() {
  const products = await getAllProducts();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="max-w-xs">Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="whitespace-nowrap">{product.id}</TableCell>
            <TableCell className="whitespace-nowrap">{product.name}</TableCell>
            <TableCell className="max-w-xs truncate">
              {product.description}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              € {product.price}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {new Date(product.createdAt).toLocaleString("pt-PT")}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {new Date(product.updatedAt).toLocaleString("pt-PT")}
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
