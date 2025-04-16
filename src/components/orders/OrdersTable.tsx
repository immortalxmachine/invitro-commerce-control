import { Order, useAdmin } from "@/contexts/AdminContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Eye, 
  Printer, 
  Check, 
  Truck, 
  Package, 
  Clock, 
  XCircle 
} from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/utils/toast";

interface OrdersTableProps {
  filteredOrders: Order[];
  onViewOrder: (order: Order) => void;
}

export const OrdersTable = ({ filteredOrders, onViewOrder }: OrdersTableProps) => {
  const { updateOrderStatus } = useAdmin();

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Update in local state
      updateOrderStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOrders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
              No orders found
            </TableCell>
          </TableRow>
        ) : (
          filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewOrder(order)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" /> Print Invoice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuRadioGroup 
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <DropdownMenuRadioItem value="pending">
                        <Clock className="mr-2 h-4 w-4" /> Pending
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="processing">
                        <Package className="mr-2 h-4 w-4" /> Processing
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="shipped">
                        <Truck className="mr-2 h-4 w-4" /> Shipped
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="delivered">
                        <Check className="mr-2 h-4 w-4" /> Delivered
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="cancelled">
                        <XCircle className="mr-2 h-4 w-4" /> Cancelled
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
