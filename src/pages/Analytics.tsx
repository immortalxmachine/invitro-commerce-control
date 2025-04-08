
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for sales forecast
const salesForecastData = [
  { month: 'Jan', actual: 4000, forecast: 4200 },
  { month: 'Feb', actual: 5000, forecast: 5100 },
  { month: 'Mar', actual: 6000, forecast: 6300 },
  { month: 'Apr', actual: 7000, forecast: 7400 },
  { month: 'May', actual: 8000, forecast: 8500 },
  { month: 'Jun', actual: 9000, forecast: 9600 },
  { month: 'Jul', actual: null, forecast: 10800 },
  { month: 'Aug', actual: null, forecast: 11500 },
  { month: 'Sep', actual: null, forecast: 12000 },
];

// Mock data for category performance
const categoryPerformanceData = [
  { category: 'Electronics', revenue: 12000, growth: 15 },
  { category: 'Furniture', revenue: 8000, growth: 5 },
  { category: 'Apparel', revenue: 6000, growth: -2 },
  { category: 'Kitchen', revenue: 4000, growth: 10 },
  { category: 'Books', revenue: 2000, growth: 8 },
];

// Mock data for inventory predictions
const inventoryPredictionsData = [
  { name: 'Premium Bluetooth Headphones', stock: 45, daysUntilStockout: 22, reorderSuggestion: 50 },
  { name: 'Ergonomic Office Chair', stock: 28, daysUntilStockout: 35, reorderSuggestion: 30 },
  { name: 'Smart Watch Pro', stock: 8, daysUntilStockout: 5, reorderSuggestion: 40 },
  { name: 'Organic Cotton T-Shirt', stock: 87, daysUntilStockout: 60, reorderSuggestion: 0 },
  { name: 'Professional Chef Knife', stock: 12, daysUntilStockout: 15, reorderSuggestion: 25 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Forecast</h1>
        <p className="text-muted-foreground">Data-driven insights and predictive analysis to optimize your inventory.</p>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales Forecast</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Predictions</TabsTrigger>
          <TabsTrigger value="categories">Category Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>Projected sales revenue for the next quarter based on historical data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesForecastData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Sales are projected to increase by <span className="font-medium">28%</span> over the next quarter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>August is forecasted to have the highest growth rate at <span className="font-medium">14%</span> month-over-month.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Consider increasing inventory by <span className="font-medium">35%</span> to meet projected demand.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Demand Forecast</CardTitle>
              <CardDescription>Predictions for product stock levels based on sales velocity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Product</th>
                      <th className="text-center py-3 px-2">Current Stock</th>
                      <th className="text-center py-3 px-2">Days Until Stock Out</th>
                      <th className="text-center py-3 px-2">Risk Level</th>
                      <th className="text-center py-3 px-2">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryPredictionsData.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{product.name}</td>
                        <td className="py-3 px-2 text-center">{product.stock}</td>
                        <td className="py-3 px-2 text-center">{product.daysUntilStockout}</td>
                        <td className="py-3 px-2 text-center">
                          {product.daysUntilStockout <= 7 ? (
                            <Badge variant="destructive" className="inline-flex gap-1 items-center">
                              <AlertTriangle className="h-3 w-3" /> Critical
                            </Badge>
                          ) : product.daysUntilStockout <= 21 ? (
                            <Badge variant="default" className="bg-amber-500">Medium</Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600">Low</Badge>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {product.reorderSuggestion > 0 ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={product.daysUntilStockout <= 7 ? "border-red-500 text-red-500 hover:bg-red-50" : ""}
                            >
                              Reorder {product.reorderSuggestion} units
                            </Button>
                          ) : (
                            <span className="text-muted-foreground">No action needed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Revenue</CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryPerformanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {categoryPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Growth</CardTitle>
                <CardDescription>Growth rate by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryPerformanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Growth']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="growth" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      >
                        {categoryPerformanceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.growth < 0 ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Insights</CardTitle>
              <CardDescription>AI-generated recommendations based on category performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Electronics (15% growth)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    This category is showing strong growth and accounts for the largest portion of revenue.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 hover:bg-green-100">
                      Increase inventory by 20%
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 hover:bg-green-100">
                      Expand product range
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 hover:bg-green-100">
                      Feature in promotions
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Apparel (-2% growth)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    This category is showing negative growth and needs attention.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-red-50 hover:bg-red-100">
                      Review pricing strategy
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 hover:bg-red-100">
                      Consider seasonal discounts
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 hover:bg-red-100">
                      Evaluate product quality
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
