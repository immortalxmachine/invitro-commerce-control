
import { Order } from "@/contexts/AdminContext";

interface OrderStatusProgressProps {
  status: Order['status'];
}

export const OrderStatusProgress = ({ status }: OrderStatusProgressProps) => {
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

  return (
    <div className="bg-muted p-4 rounded-md">
      <h4 className="font-medium mb-2">Order Progress</h4>
      <div className="flex items-center">
        <div className={`h-2 w-1/4 ${getOrderStatusStep(status) >= 0 ? 'bg-primary' : 'bg-muted-foreground'} rounded-l-full`}></div>
        <div className={`h-2 w-1/4 ${getOrderStatusStep(status) >= 1 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
        <div className={`h-2 w-1/4 ${getOrderStatusStep(status) >= 2 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
        <div className={`h-2 w-1/4 ${getOrderStatusStep(status) >= 3 ? 'bg-primary' : 'bg-muted-foreground'} rounded-r-full`}></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Pending</span>
        <span>Processing</span>
        <span>Shipped</span>
        <span>Delivered</span>
      </div>
    </div>
  );
};
