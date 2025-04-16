import { Order, useAdmin } from "@/contexts/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "./OrderStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: Order | null;
}

export const OrderDetailDialog = ({ open, onOpenChange, selectedOrder }: OrderDetailDialogProps) => {
  const { updateOrderStatus } = useAdmin();

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status);
  };

  const getOrderStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

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
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Customer Information</h4>
              <p>{selectedOrder.customer}</p>
              <p className="text-sm text-muted-foreground">customer@example.com</p>
              <p className="text-sm text-muted-foreground">123 Main St, Anytown, CA 90210</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Order Progress</h4>
              <div className="flex items-center">
                <div className={`h-2 w-1/4 ${getOrderStatusStep(selectedOrder.status) >= 0 ? 'bg-primary' : 'bg-muted-foreground'} rounded-l-full`}></div>
                <div className={`h-2 w-1/4 ${getOrderStatusStep(selectedOrder.status) >= 1 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                <div className={`h-2 w-1/4 ${getOrderStatusStep(selectedOrder.status) >= 2 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                <div className={`h-2 w-1/4 ${getOrderStatusStep(selectedOrder.status) >= 3 ? 'bg-primary' : 'bg-muted-foreground'} rounded-r-full`}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Pending</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Order Items</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder.items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Total:</span>
            <span className="text-xl font-bold">₹{selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Update Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup 
                value={selectedOrder.status}
                onValueChange={(value) => {
                  handleStatusChange(selectedOrder.id, value);
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
