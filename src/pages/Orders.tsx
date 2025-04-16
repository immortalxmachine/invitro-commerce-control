
import { useState, useEffect } from "react";
import { useAdmin, Order } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrdersTabContent } from "@/components/orders/OrdersTabContent";
import { OrderDetailDialog } from "@/components/orders/OrderDetailDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Orders = () => {
  const { orders, setOrders } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            id, 
            total, 
            status, 
            created_at,
            profiles(first_name, last_name),
            order_items(
              id,
              quantity,
              price,
              products(id, name)
            )
          `);

        if (ordersError) {
          throw ordersError;
        }

        // Transform the data to match the Order type
        const transformedOrders = ordersData.map(order => {
          // Compute customer name from profile or use placeholder
          const customerName = order.profiles ? 
            `${order.profiles.first_name || ''} ${order.profiles.last_name || ''}`.trim() || 'Unknown Customer' : 
            'Unknown Customer';
          
          // Transform items
          const items = order.order_items.map(item => ({
            productId: item.products.id,
            productName: item.products.name,
            quantity: item.quantity,
            price: item.price
          }));

          return {
            id: order.id,
            customer: customerName,
            date: order.created_at,
            total: parseFloat(order.total),
            status: order.status,
            items: items
          };
        });

        setOrders(transformedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [setOrders]);
  
  const filteredOrders = orders.filter(
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
            {isLoading ? 'Loading orders...' : `Showing ${filteredOrders.length} of ${orders.length} orders`}
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
