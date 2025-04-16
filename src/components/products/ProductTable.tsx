
import { Product } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ProductActions } from "./ProductActions";

interface ProductTableProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductTable = ({ products, onViewProduct, onDeleteProduct }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
              No products found
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <span className={product.quantity < 10 ? "text-red-500 font-medium" : ""}>
                  {product.quantity}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={product.status === 'active' ? "default" : "secondary"}>
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions 
                  product={product} 
                  onView={onViewProduct} 
                  onDelete={onDeleteProduct} 
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
