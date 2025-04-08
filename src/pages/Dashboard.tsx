
import { useAdmin } from "@/contexts/AdminContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TopProductsChart } from "@/components/dashboard/TopProductsChart";
import { InventoryStatusChart } from "@/components/dashboard/InventoryStatusChart";
import { Package, Truck, AlertTriangle, DollarSign, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  const { dashboardData } = useAdmin();
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your e-commerce inventory and sales.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Total Products" 
          value={dashboardData.totalProducts}
          icon={Package}
        />
        <StatCard 
          title="Inventory In Stock" 
          value={dashboardData.totalStock}
          icon={Truck}
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={dashboardData.lowStockAlerts}
          icon={AlertTriangle}
          className="bg-red-50"
          description="Products below threshold"
        />
        <StatCard 
          title="Total Sales Revenue" 
          value={`$${dashboardData.totalSales.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard 
          title="Total Orders" 
          value={dashboardData.totalOrders}
          icon={ShoppingCart}
        />
        <StatCard 
          title="Total Customers" 
          value={dashboardData.totalCustomers}
          icon={Users}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SalesChart />
        <div className="grid grid-cols-1 gap-4">
          <TopProductsChart />
          <InventoryStatusChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
