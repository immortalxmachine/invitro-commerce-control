
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { useProducts, Product } from "@/hooks/useProducts";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductDetails } from "@/components/products/ProductDetails";
import { DeleteConfirmation } from "@/components/products/DeleteConfirmation";

const Products = () => {
  const { products, loading, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredProducts = products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      const success = await deleteProduct(selectedProduct.id);
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <ProductsHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Showing {filteredProducts.length} of {products.length} products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable 
            products={filteredProducts}
            onViewProduct={handleViewProduct}
            onDeleteProduct={handleDeleteClick}
          />
        </CardContent>
      </Card>
      
      <ProductDetails 
        product={selectedProduct}
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
      
      <DeleteConfirmation 
        product={selectedProduct}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Products;
