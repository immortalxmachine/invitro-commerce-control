
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen } = useAdmin();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out overflow-auto",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
