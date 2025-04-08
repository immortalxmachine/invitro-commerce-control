
import { Order } from "@/contexts/AdminContext";
import { TabsContent } from "@/components/ui/tabs";
import { OrdersTable } from "./OrdersTable";

interface OrdersTabContentProps {
  filteredOrders: Order[];
  onViewOrder: (order: Order) => void;
}

export const OrdersTabContent = ({ filteredOrders, onViewOrder }: OrdersTabContentProps) => {
  return (
    <>
      <TabsContent value="all">
        <OrdersTable 
          filteredOrders={filteredOrders} 
          onViewOrder={onViewOrder} 
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <div className="text-center py-10 text-muted-foreground">
          Filtered orders by "Pending" status would appear here
        </div>
      </TabsContent>
      
      <TabsContent value="processing">
        <div className="text-center py-10 text-muted-foreground">
          Filtered orders by "Processing" status would appear here
        </div>
      </TabsContent>
      
      <TabsContent value="shipped">
        <div className="text-center py-10 text-muted-foreground">
          Filtered orders by "Shipped" status would appear here
        </div>
      </TabsContent>
      
      <TabsContent value="delivered">
        <div className="text-center py-10 text-muted-foreground">
          Filtered orders by "Delivered" status would appear here
        </div>
      </TabsContent>
    </>
  );
};
