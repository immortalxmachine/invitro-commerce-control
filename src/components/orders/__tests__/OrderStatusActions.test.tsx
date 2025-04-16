
import { render, screen, fireEvent } from "@testing-library/react";
import { OrderStatusActions } from "../OrderStatusActions";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Order } from "@/contexts/AdminContext";
import * as supabase from "@/integrations/supabase/client";

// Mock the supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ error: null })
  }
}));

// Mock the toast utility
vi.mock("@/utils/toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe("OrderStatusActions", () => {
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
  
  const mockUpdateOrderStatus = vi.fn();
  const mockOnClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it("renders the component with correct buttons", () => {
    render(
      <OrderStatusActions 
        order={mockOrder} 
        updateOrderStatus={mockUpdateOrderStatus} 
        onClose={mockOnClose} 
      />
    );
    
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Update Status")).toBeInTheDocument();
    expect(screen.getByText("Print Invoice")).toBeInTheDocument();
  });
  
  it("calls onClose when Close button is clicked", () => {
    render(
      <OrderStatusActions 
        order={mockOrder} 
        updateOrderStatus={mockUpdateOrderStatus} 
        onClose={mockOnClose} 
      />
    );
    
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
