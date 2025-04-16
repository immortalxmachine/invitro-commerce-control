
import { render, screen } from "@testing-library/react";
import { OrderDetailDialog } from "../OrderDetailDialog";
import { describe, it, expect, vi } from "vitest";
import { Order } from "@/contexts/AdminContext";

// Mock the child components
vi.mock("../OrderStatusBadge", () => ({
  OrderStatusBadge: ({ status }: { status: string }) => (
    <div data-testid="status-badge">{status}</div>
  )
}));

vi.mock("../OrderStatusProgress", () => ({
  OrderStatusProgress: ({ status }: { status: string }) => (
    <div data-testid="status-progress">{status}</div>
  )
}));

vi.mock("../CustomerInfoCard", () => ({
  CustomerInfoCard: ({ customer }: { customer: string }) => (
    <div data-testid="customer-info">{customer}</div>
  )
}));

vi.mock("../OrderItemsTable", () => ({
  OrderItemsTable: ({ items }: { items: any[] }) => (
    <div data-testid="order-items">Items: {items.length}</div>
  )
}));

vi.mock("../OrderStatusActions", () => ({
  OrderStatusActions: ({ order }: { order: Order }) => (
    <div data-testid="order-actions">{order.id}</div>
  )
}));

// Mock the AdminContext hook
vi.mock("@/contexts/AdminContext", () => ({
  useAdmin: () => ({
    updateOrderStatus: vi.fn()
  }),
  // Export the Order type to satisfy TypeScript
  Order: {}
}));

describe("OrderDetailDialog", () => {
  const mockOrder: Order = {
    id: "order-123",
    customer: "John Doe",
    date: "2023-04-15T12:00:00Z",
    total: 99.99,
    status: "processing",
    items: [
      {
        productId: "product-1",
        productName: "Test Product",
        quantity: 1,
        price: 99.99
      }
    ]
  };
  
  it("renders null when no order is selected", () => {
    const { container } = render(
      <OrderDetailDialog 
        open={true} 
        onOpenChange={() => {}} 
        selectedOrder={null} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
  
  it("renders the dialog with all components when an order is selected", () => {
    render(
      <OrderDetailDialog 
        open={true} 
        onOpenChange={() => {}} 
        selectedOrder={mockOrder} 
      />
    );
    
    // Check for dialog title and order ID
    expect(screen.getByText("Order Details")).toBeInTheDocument();
    expect(screen.getByText("order-123")).toBeInTheDocument();
    
    // Check for child components
    expect(screen.getByTestId("status-badge")).toHaveTextContent("processing");
    expect(screen.getByTestId("status-progress")).toHaveTextContent("processing");
    expect(screen.getByTestId("customer-info")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("order-items")).toHaveTextContent("Items: 1");
    expect(screen.getByTestId("order-actions")).toHaveTextContent("order-123");
    
    // Check for order total
    expect(screen.getByText("₹99.99")).toBeInTheDocument();
  });
  
  it("formats the date correctly", () => {
    render(
      <OrderDetailDialog 
        open={true} 
        onOpenChange={() => {}} 
        selectedOrder={mockOrder} 
      />
    );
    
    // The date should be formatted to a localized string
    const date = new Date(mockOrder.date).toLocaleDateString();
    expect(screen.getByText(`Placed on ${date}`)).toBeInTheDocument();
  });
});
