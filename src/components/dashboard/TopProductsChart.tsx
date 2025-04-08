
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock top products data
const data = [
  { name: "Headphones", units: 28 },
  { name: "Office Chair", units: 22 },
  { name: "T-Shirt", units: 19 },
  { name: "Smart Watch", units: 15 },
  { name: "Chef Knife", units: 12 }
];

export function TopProductsChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Products by units sold this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip 
                formatter={(value) => [`${value} units`, 'Sold']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="units" 
                fill="hsl(var(--accent))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
