import { useState } from "react";
import { useAdmin, Order } from "@/contexts/AdminContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  FileDown, 
  Printer, 
  Check, 
  Truck, 
  Package, 
  Clock, 
  XCircle 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const getStatusColorAndIcon = () => {
    switch (status) {
      case 'pending':
        return { 
          variant: "outline" as const, 
          icon: <Clock className="mr-1 h-3 w-3" />,
          text: "Pending"
        };
      case 'processing':
        return { 
          variant: "secondary" as const, 
          icon: <Package className="mr-1 h-3 w-3" />,
          text: "Processing"
        };
      case 'shipped':
        return { 
          variant: "default" as const, 
          icon: <Truck className="mr-1 h-3 w-3" />,
          text: "Shipped"
        };
      case 'delivered':
        return { 
          variant: "success" as const, 
          icon: <Check className="mr-1 h-3 w-3" />,
          text: "Delivered"
        };
      case 'cancelled':
        return { 
          variant: "destructive" as const, 
          icon: <XCircle className="mr-1 h-3 w-3" />,
          text: "Cancelled"
        };
      default:
        return { 
          variant: "outline" as const, 
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

const Orders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const filteredOrders = orders.filter(
    order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };
  
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
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and process customer orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Showing {filteredOrders.length} of {orders.length} orders
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
            <TabsContent value="all">
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
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewOrder(order)}>
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
            </TabsContent>
            {/* Other tabs would have filtered content */}
            <TabsContent value="pending">
              {/* Pending orders table */}
              <div className="text-center py-10 text-muted-foreground">
                Filtered orders by "Pending" status would appear here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about order {selectedOrder?.id}.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
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
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Total:</span>
                <span className="text-xl font-bold">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Update Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup 
                  value={selectedOrder?.status}
                  onValueChange={(value) => {
                    if (selectedOrder) {
                      handleStatusChange(selectedOrder.id, value);
                    }
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
                  </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
