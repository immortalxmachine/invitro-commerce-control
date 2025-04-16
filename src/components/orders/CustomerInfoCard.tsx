
import { Order } from "@/contexts/AdminContext";

interface CustomerInfoCardProps {
  customer: Order['customer'];
}

export const CustomerInfoCard = ({ customer }: CustomerInfoCardProps) => {
  return (
    <div className="bg-muted p-4 rounded-md">
      <h4 className="font-medium mb-2">Customer Information</h4>
      <p>{customer}</p>
      <p className="text-sm text-muted-foreground">customer@example.com</p>
      <p className="text-sm text-muted-foreground">123 Main St, Anytown, CA 90210</p>
    </div>
  );
};
