
import { Order } from "@/contexts/AdminContext";
import { TabsContent } from "@/components/ui/tabs";
import { OrdersTable } from "./OrdersTable";

interface OrdersTabContentProps {
  filteredOrders: Order[];
  onViewOrder: (order: Order) => void;
}

export const OrdersTabContent = ({ filteredOrders, onViewOrder }: OrdersTabContentProps) => {
  // Filter orders by status for each tab
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
  const processingOrders = filteredOrders.filter(order => order.status === 'processing');
  const shippedOrders = filteredOrders.filter(order => order.status === 'shipped');
  const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered');
  
  return (
    <>
      <TabsContent value="all">
        <OrdersTable 
          filteredOrders={filteredOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <OrdersTable 
          filteredOrders={pendingOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
      
      <TabsContent value="processing">
        <OrdersTable 
          filteredOrders={processingOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
      
      <TabsContent value="shipped">
        <OrdersTable 
          filteredOrders={shippedOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
      
      <TabsContent value="delivered">
        <OrdersTable 
          filteredOrders={deliveredOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
    </>
  );
};
