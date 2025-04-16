
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/utils/toast";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  quantity: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products with their inventory
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_inventory(quantity)
        `);

      if (error) {
        throw error;
      }

      // Transform data to match our Product interface
      const productsWithInventory = data.map(product => {
        // Ensure status is either 'active' or 'inactive'
        const status = product.in_stock ? 'active' : 'inactive' as 'active' | 'inactive';
        
        return {
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: product.price,
          category: product.category || 'Uncategorized',
          image: product.image || '',
          status: status,
          quantity: product.product_inventory?.[0]?.quantity || 0
        };
      });

      setProducts(productsWithInventory);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast.success('Product deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    deleteProduct,
    fetchProducts
  };
};
