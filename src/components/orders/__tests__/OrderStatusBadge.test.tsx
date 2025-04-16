
import { render, screen } from "@testing-library/react";
import { OrderStatusBadge } from "../OrderStatusBadge";
import { describe, it, expect } from "vitest";

describe("OrderStatusBadge", () => {
  it("renders pending status correctly", () => {
    render(<OrderStatusBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
  
  it("renders processing status correctly", () => {
    render(<OrderStatusBadge status="processing" />);
    expect(screen.getByText("Processing")).toBeInTheDocument();
  });
  
  it("renders shipped status correctly", () => {
    render(<OrderStatusBadge status="shipped" />);
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });
  
  it("renders delivered status correctly", () => {
    render(<OrderStatusBadge status="delivered" />);
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });
  
  it("renders cancelled status correctly", () => {
    render(<OrderStatusBadge status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });
  
  it("uses correct badge variant for each status", () => {
    const { rerender } = render(<OrderStatusBadge status="pending" />);
    let badge = screen.getByText("Pending").closest("div");
    expect(badge?.className).toContain("outline");
    
    rerender(<OrderStatusBadge status="cancelled" />);
    badge = screen.getByText("Cancelled").closest("div");
    expect(badge?.className).toContain("destructive");
  });
});
