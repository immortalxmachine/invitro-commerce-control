
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileDown, 
  FileText, 
  Calendar, 
  History, 
  Printer,
  Download,
  Clock,
  Search
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Mock activity logs
const activityLogs = [
  { id: 1, action: "Product Added", user: "Admin", details: "Added Premium Bluetooth Headphones", timestamp: "2025-04-08 09:23:45" },
  { id: 2, action: "Order Status Updated", user: "Admin", details: "Changed order ORD-2023-001 to Delivered", timestamp: "2025-04-08 10:15:30" },
  { id: 3, action: "Customer Account Banned", user: "Admin", details: "Banned customer CUST-005", timestamp: "2025-04-07 14:42:18" },
  { id: 4, action: "Product Deleted", user: "Admin", details: "Deleted Wooden Coffee Table", timestamp: "2025-04-07 11:37:22" },
  { id: 5, action: "Inventory Updated", user: "Admin", details: "Updated stock for Smart Watch Pro (5 to 8)", timestamp: "2025-04-06 16:05:11" },
  { id: 6, action: "Price Changed", user: "Admin", details: "Changed price of Organic Cotton T-Shirt ($24.99 to $29.99)", timestamp: "2025-04-06 15:23:59" },
  { id: 7, action: "New Order Received", user: "System", details: "Order ORD-2023-004 received", timestamp: "2025-04-06 10:12:33" },
  { id: 8, action: "New Customer Registration", user: "System", details: "Customer CUST-006 registered", timestamp: "2025-04-05 19:48:27" },
];

const reportTypes = [
  { id: "sales-daily", name: "Daily Sales Report", icon: <FileText className="h-5 w-5" />, description: "Sales data grouped by day with product breakdowns" },
  { id: "sales-weekly", name: "Weekly Sales Report", icon: <FileText className="h-5 w-5" />, description: "Weekly sales summary with trends and comparisons" },
  { id: "sales-monthly", name: "Monthly Sales Report", icon: <FileText className="h-5 w-5" />, description: "Comprehensive monthly sales analysis" },
  { id: "inventory", name: "Inventory Status Report", icon: <FileText className="h-5 w-5" />, description: "Current stock levels, low stock alerts, and valuation" },
  { id: "products", name: "Product Performance Report", icon: <FileText className="h-5 w-5" />, description: "Performance metrics for all products" },
  { id: "customers", name: "Customer Activity Report", icon: <FileText className="h-5 w-5" />, description: "Customer engagement and purchasing patterns" },
];

const Reports = () => {
  const [searchLogs, setSearchLogs] = useState("");
  
  const filteredLogs = activityLogs.filter(
    log => 
      log.action.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.details.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.user.toLowerCase().includes(searchLogs.toLowerCase())
  );
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Logs</h1>
        <p className="text-muted-foreground">Generate reports and view system activity logs.</p>
      </div>
      
      <Tabs defaultValue="reports">
        <TabsList className="mb-4">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create and download various system reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTypes.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        {report.icon}
                        <CardTitle className="text-base">{report.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="mb-4">{report.description}</CardDescription>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Select Date
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <FileDown className="h-4 w-4" /> Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated reports available for download</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Generated On</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Sales Report - April 2025</TableCell>
                    <TableCell>2025-04-08 08:30:22</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Inventory Status Report</TableCell>
                    <TableCell>2025-04-07 14:15:37</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekly Sales Report - Week 14, 2025</TableCell>
                    <TableCell>2025-04-05 17:42:10</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>Audit trail of all system activities</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8 w-full md:w-[250px]"
                    value={searchLogs}
                    onChange={(e) => setSearchLogs(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" /> Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Time</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                        No logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.details}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <History className="h-4 w-4" /> Load More
            </Button>
            <p className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {activityLogs.length} activities
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
