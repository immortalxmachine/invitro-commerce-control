
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Package, Truck, XCircle } from "lucide-react";
import { Order } from "@/contexts/AdminContext";

type OrderStatusBadgeVariant = "default" | "destructive" | "outline" | "secondary";

interface StatusConfig {
  variant: OrderStatusBadgeVariant;
  icon: React.ReactNode;
  text: string;
}

export const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const getStatusColorAndIcon = (): StatusConfig => {
    switch (status) {
      case 'pending':
        return { 
          variant: "outline", 
          icon: <Clock className="mr-1 h-3 w-3" />,
          text: "Pending"
        };
      case 'processing':
        return { 
          variant: "secondary", 
          icon: <Package className="mr-1 h-3 w-3" />,
          text: "Processing"
        };
      case 'shipped':
        return { 
          variant: "default", 
          icon: <Truck className="mr-1 h-3 w-3" />,
          text: "Shipped"
        };
      case 'delivered':
        return { 
          variant: "default", 
          icon: <Check className="mr-1 h-3 w-3" />,
          text: "Delivered"
        };
      case 'cancelled':
        return { 
          variant: "destructive", 
          icon: <XCircle className="mr-1 h-3 w-3" />,
          text: "Cancelled"
        };
      default:
        return { 
          variant: "outline", 
          icon: null,
          text: status
        };
    }
  };
  
  const { variant, icon, text } = getStatusColorAndIcon();
  
  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {text}
    </Badge>
  );
};
