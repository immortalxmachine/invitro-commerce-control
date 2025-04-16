
import { Order, useAdmin } from "@/contexts/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderStatusProgress } from "./OrderStatusProgress";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderItemsTable } from "./OrderItemsTable";
import { OrderStatusActions } from "./OrderStatusActions";

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: Order | null;
}

export const OrderDetailDialog = ({ open, onOpenChange, selectedOrder }: OrderDetailDialogProps) => {
  const { updateOrderStatus } = useAdmin();

  if (!selectedOrder) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about order {selectedOrder.id}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">{selectedOrder.id}</h3>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
            </div>
            <OrderStatusBadge status={selectedOrder.status} />
          </div>
          
          <div className="space-y-2">
            <CustomerInfoCard customer={selectedOrder.customer} />
            <OrderStatusProgress status={selectedOrder.status} />
          </div>
          
          <OrderItemsTable items={selectedOrder.items} />
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Total:</span>
            <span className="text-xl font-bold">₹{selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <OrderStatusActions 
            order={selectedOrder} 
            updateOrderStatus={updateOrderStatus} 
            onClose={() => onOpenChange(false)} 
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
