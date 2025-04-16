
import { Product } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetails = ({ product, isOpen, onOpenChange }: ProductDetailsProps) => {
  if (!product) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected product.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-md bg-muted overflow-hidden">
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-[200px] object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <Badge variant={product.status === 'active' ? "default" : "secondary"}>
                {product.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock:</span>
                <span className={product.quantity < 10 ? "text-red-500 font-medium" : ""}>
                  {product.quantity} units
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="text-sm">{product.id}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Description:</h4>
              <p className="text-sm text-muted-foreground">
                {product.description || 'No description available'}
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="default">
            <Pencil className="mr-2 h-4 w-4" /> Edit Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
