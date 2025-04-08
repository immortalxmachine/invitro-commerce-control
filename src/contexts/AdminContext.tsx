
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface AdminContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  dashboardData: DashboardData;
  products: Product[];
  orders: Order[];
  customers: Customer[];
  updateOrderStatus: (orderId: string, status: string) => void;
  deleteProduct: (productId: string) => void;
}

interface DashboardData {
  totalProducts: number;
  totalStock: number;
  lowStockAlerts: number;
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  totalSpending: number;
  status: 'active' | 'banned';
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Mock data for demonstration
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalProducts: 156,
    totalStock: 4890,
    lowStockAlerts: 23,
    totalSales: 54750,
    totalOrders: 347,
    totalCustomers: 189
  });
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Bluetooth Headphones",
      description: "Noise-cancelling over-ear headphones with premium sound quality",
      price: 199.99,
      quantity: 45,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      status: "active"
    },
    {
      id: "2",
      name: "Ergonomic Office Chair",
      description: "Adjustable ergonomic chair with lumbar support",
      price: 259.99,
      quantity: 28,
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb",
      status: "active"
    },
    {
      id: "3",
      name: "Smart Watch Pro",
      description: "Fitness tracker with heart rate monitoring and GPS",
      price: 149.99,
      quantity: 8,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      status: "active"
    },
    {
      id: "4",
      name: "Organic Cotton T-Shirt",
      description: "Sustainable clothing made from 100% organic cotton",
      price: 29.99,
      quantity: 87,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      status: "active"
    },
    {
      id: "5",
      name: "Professional Chef Knife",
      description: "High-carbon stainless steel chef knife",
      price: 89.99,
      quantity: 12,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1593618468786-2d5c334e95fb",
      status: "inactive"
    },
    {
      id: "6",
      name: "Wireless Gaming Mouse",
      description: "High-precision gaming mouse with programmable buttons",
      price: 69.99,
      quantity: 5,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
      status: "active"
    }
  ]);
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2023-001",
      customer: "John Smith",
      date: "2025-04-05",
      total: 259.98,
      status: "delivered",
      items: [
        {
          productId: "1",
          productName: "Premium Bluetooth Headphones",
          quantity: 1,
          price: 199.99
        },
        {
          productId: "4",
          productName: "Organic Cotton T-Shirt",
          quantity: 2,
          price: 29.99
        }
      ]
    },
    {
      id: "ORD-2023-002",
      customer: "Emily Johnson",
      date: "2025-04-06",
      total: 89.99,
      status: "processing",
      items: [
        {
          productId: "5",
          productName: "Professional Chef Knife",
          quantity: 1,
          price: 89.99
        }
      ]
    },
    {
      id: "ORD-2023-003",
      customer: "Michael Davis",
      date: "2025-04-07",
      total: 299.98,
      status: "shipped",
      items: [
        {
          productId: "2",
          productName: "Ergonomic Office Chair",
          quantity: 1,
          price: 259.99
        },
        {
          productId: "6",
          productName: "Wireless Gaming Mouse",
          quantity: 1,
          price: 69.99
        }
      ]
    },
    {
      id: "ORD-2023-004",
      customer: "Sarah Wilson",
      date: "2025-04-08",
      total: 149.99,
      status: "pending",
      items: [
        {
          productId: "3",
          productName: "Smart Watch Pro",
          quantity: 1,
          price: 149.99
        }
      ]
    }
  ]);
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john.smith@example.com",
      registrationDate: "2025-01-15",
      totalSpending: 789.95,
      status: "active"
    },
    {
      id: "CUST-002",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      registrationDate: "2025-02-03",
      totalSpending: 432.50,
      status: "active"
    },
    {
      id: "CUST-003",
      name: "Michael Davis",
      email: "michael.davis@example.com",
      registrationDate: "2025-03-12",
      totalSpending: 1245.75,
      status: "active"
    },
    {
      id: "CUST-004",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      registrationDate: "2025-03-28",
      totalSpending: 149.99,
      status: "active"
    },
    {
      id: "CUST-005",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      registrationDate: "2025-02-18",
      totalSpending: 0,
      status: "banned"
    }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: status as Order['status'] } 
          : order
      )
    );
    toast({
      title: "Order status updated",
      description: `Order ${orderId} is now ${status}`,
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
    // Update dashboard data
    setDashboardData(prev => ({
      ...prev,
      totalProducts: prev.totalProducts - 1
    }));
    toast({
      title: "Product deleted",
      description: "The product has been removed from the system",
    });
  };

  return (
    <AdminContext.Provider 
      value={{ 
        sidebarOpen, 
        toggleSidebar, 
        loading, 
        setLoading,
        dashboardData,
        products,
        orders,
        customers,
        updateOrderStatus,
        deleteProduct
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
