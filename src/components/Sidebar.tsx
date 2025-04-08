
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users, 
  LineChart, 
  FileText, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLinkProps {
  to: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  end?: boolean;
}

const SidebarLink = ({ to, icon: Icon, children, end }: SidebarLinkProps) => {
  const { sidebarOpen } = useAdmin();
  
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center py-3 px-4 rounded-md text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground",
          !sidebarOpen && "justify-center px-2"
        )
      }
    >
      <Icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
      {sidebarOpen && <span>{children}</span>}
    </NavLink>
  );
};

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useAdmin();
  
  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-sidebar-foreground">
            InvitroCommerce
          </h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-2">
        <nav className="space-y-1">
          <SidebarLink to="/" icon={BarChart3} end>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/products" icon={Package}>
            Products
          </SidebarLink>
          <SidebarLink to="/orders" icon={ShoppingCart}>
            Orders
          </SidebarLink>
          <SidebarLink to="/customers" icon={Users}>
            Customers
          </SidebarLink>
          <SidebarLink to="/analytics" icon={LineChart}>
            Analytics & Forecast
          </SidebarLink>
          <SidebarLink to="/reports" icon={FileText}>
            Reports & Logs
          </SidebarLink>
          <SidebarLink to="/settings" icon={Settings}>
            Settings
          </SidebarLink>
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !sidebarOpen && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
          {sidebarOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
