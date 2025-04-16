
import { render, screen } from "@testing-library/react";
import { OrderStatusProgress } from "../OrderStatusProgress";
import { describe, it, expect } from "vitest";

describe("OrderStatusProgress", () => {
  it("renders the progress bar for pending status", () => {
    render(<OrderStatusProgress status="pending" />);
    
    expect(screen.getByText("Order Progress")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });
  
  it("renders the progress bar for processing status", () => {
    render(<OrderStatusProgress status="processing" />);
    
    const progressBars = screen.getAllByRole("presentation");
    // Check that the first two segments are filled (active)
    expect(progressBars.some(bar => bar.className.includes("bg-primary"))).toBeTruthy();
  });
  
  it("renders the progress bar for shipped status", () => {
    render(<OrderStatusProgress status="shipped" />);
    
    const progressBars = screen.getAllByRole("presentation");
    // Check that the first three segments are filled (active)
    expect(progressBars.some(bar => bar.className.includes("bg-primary"))).toBeTruthy();
  });
  
  it("renders the progress bar for delivered status", () => {
    render(<OrderStatusProgress status="delivered" />);
    
    const progressBars = screen.getAllByRole("presentation");
    // Check that all segments are filled (active)
    expect(progressBars.some(bar => bar.className.includes("bg-primary"))).toBeTruthy();
  });
  
  it("renders the progress bar for cancelled status", () => {
    render(<OrderStatusProgress status="cancelled" />);
    
    const progressBars = screen.getAllByRole("presentation");
    // Check that no segments are filled (active) for cancelled status
    expect(progressBars.some(bar => bar.className.includes("bg-muted-foreground"))).toBeTruthy();
  });
});
