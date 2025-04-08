
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Search } from "lucide-react";

interface OrdersHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const OrdersHeader = ({ searchTerm, setSearchTerm }: OrdersHeaderProps) => {
  return (
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
  );
};
