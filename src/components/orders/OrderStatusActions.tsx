
import { Order } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Clock, 
  Package, 
  Printer, 
  Truck, 
  XCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/utils/toast";

interface OrderStatusActionsProps {
  order: Order;
  updateOrderStatus: (orderId: string, status: string) => void;
  onClose: () => void;
}

export const OrderStatusActions = ({ order, updateOrderStatus, onClose }: OrderStatusActionsProps) => {
  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      
      updateOrderStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="flex-col sm:flex-row gap-2">
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Update Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup 
            value={order.status}
            onValueChange={(value) => {
              handleStatusChange(order.id, value);
            }}
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
      <Button variant="outline">
        <Printer className="mr-2 h-4 w-4" /> Print Invoice
      </Button>
    </div>
  );
};
