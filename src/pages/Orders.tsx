
import { useState, useEffect } from "react";
import { useAdmin, Order } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrdersTabContent } from "@/components/orders/OrdersTabContent";
import { OrderDetailDialog } from "@/components/orders/OrderDetailDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/utils/toast";

const Orders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Fix the relationship ambiguity by specifying which foreign key to use
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            id, 
            total, 
            status, 
            created_at,
            profiles(first_name, last_name),
            order_items!order_items_order_id_fkey(
              id,
              quantity,
              price,
              product_id
            )
          `);

        if (ordersError) {
          throw ordersError;
        }

        // Fetch products information for all order items
        const productIds = new Set<string>();
        ordersData.forEach(order => {
          order.order_items.forEach((item: any) => {
            if (item.product_id) {
              productIds.add(item.product_id);
            }
          });
        });

        // Only proceed with products query if there are product IDs to look up
        let productMap = new Map();
        if (productIds.size > 0) {
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('id, name')
            .in('id', Array.from(productIds));

          if (productsError) {
            throw productsError;
          }

          // Create a map of product id to product details
          productsData.forEach((product: any) => {
            productMap.set(product.id, product);
          });
        }

        // Transform the data to match the Order type
        const transformedOrders = ordersData.map((order: any) => {
          // Compute customer name from profile or use placeholder
          const customerName = order.profiles ? 
            `${order.profiles.first_name || ''} ${order.profiles.last_name || ''}`.trim() || 'Unknown Customer' : 
            'Unknown Customer';
          
          // Transform items
          const items = order.order_items.map((item: any) => {
            const product = productMap.get(item.product_id);
            return {
              productId: item.product_id,
              productName: product ? product.name : 'Unknown Product',
              quantity: item.quantity,
              price: Number(item.price)
            };
          });

          return {
            id: order.id,
            customer: customerName,
            date: order.created_at,
            total: Number(order.total),
            status: order.status,
            items: items
          };
        });

        setLocalOrders(transformedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  
  const filteredOrders = localOrders.filter(
    order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <OrdersHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            {isLoading ? 'Loading orders...' : `Showing ${filteredOrders.length} of ${localOrders.length} orders`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading orders...
              </div>
            ) : (
              <OrdersTabContent 
                filteredOrders={filteredOrders} 
                onViewOrder={handleViewOrder} 
              />
            )}
          </Tabs>
        </CardContent>
      </Card>
      
      <OrderDetailDialog 
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default Orders;
