
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [stockThreshold, setStockThreshold] = useState(10);
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };
  
  const handleSaveThresholds = () => {
    toast({
      title: "System thresholds saved",
      description: `Low stock threshold set to ${stockThreshold} units`,
    });
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences.</p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline">Change Photo</Button>
                  <Button variant="ghost" className="text-destructive hover:text-destructive">Remove</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" disabled />
                </div>
              </div>
              
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div></div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage which emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-orders">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails for new orders and status changes
                    </p>
                  </div>
                  <Switch 
                    id="email-orders" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-inventory">Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when products are running low on stock
                    </p>
                  </div>
                  <Switch 
                    id="email-inventory" 
                    checked={lowStockAlerts} 
                    onCheckedChange={setLowStockAlerts}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing & Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive tips, product updates, and marketing campaigns
                    </p>
                  </div>
                  <Switch id="email-marketing" />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Thresholds</CardTitle>
              <CardDescription>Configure system-wide settings and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="stock-threshold">Low Stock Threshold</Label>
                    <p className="text-sm text-muted-foreground">
                      Products below this quantity will trigger alerts
                    </p>
                  </div>
                  <Input 
                    id="stock-threshold" 
                    type="number" 
                    min="1" 
                    max="100" 
                    value={stockThreshold} 
                    onChange={(e) => setStockThreshold(Number(e.target.value))}
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="default-currency">Default Currency</Label>
                    <p className="text-sm text-muted-foreground">
                      Currency used for all transactions and reports
                    </p>
                  </div>
                  <Input id="default-currency" defaultValue="USD" />
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="date-format">Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      How dates are displayed throughout the system
                    </p>
                  </div>
                  <Input id="date-format" defaultValue="MM/DD/YYYY" />
                </div>
              </div>
              
              <Button onClick={handleSaveThresholds}>Save Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email templates sent to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order-confirmation">Order Confirmation Template</Label>
                  <Textarea
                    id="order-confirmation"
                    rows={5}
                    defaultValue="Dear {{customer_name}},

Thank you for your order #{{order_id}}. We're processing it now and will send you a notification when it ships.

Order Total: {{order_total}}
Estimated Delivery: {{delivery_date}}

Thank you for shopping with us!
The InvitroCommerce Team"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shipping-notification">Shipping Notification Template</Label>
                  <Textarea
                    id="shipping-notification"
                    rows={5}
                    defaultValue="Dear {{customer_name}},

Good news! Your order #{{order_id}} has been shipped.

Tracking Number: {{tracking_number}}
Carrier: {{shipping_carrier}}
Estimated Delivery: {{delivery_date}}

Thank you for shopping with us!
The InvitroCommerce Team"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>Save Templates</Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
