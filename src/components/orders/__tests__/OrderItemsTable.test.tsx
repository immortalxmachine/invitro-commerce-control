
import { render, screen } from "@testing-library/react";
import { OrderItemsTable } from "../OrderItemsTable";
import { describe, it, expect } from "vitest";

describe("OrderItemsTable", () => {
  it("renders the order items correctly", () => {
    // Arrange
    const items = [
      {
        productId: "1",
        productName: "Product 1",
        quantity: 2,
        price: 10.99
      },
      {
        productId: "2",
        productName: "Product 2",
        quantity: 1,
        price: 24.99
      }
    ];
    
    // Act
    render(<OrderItemsTable items={items} />);
    
    // Assert
    expect(screen.getByText("Order Items")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Qty")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("₹10.99")).toBeInTheDocument();
    expect(screen.getByText("₹21.98")).toBeInTheDocument();
    
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("₹24.99")).toBeInTheDocument();
  });
  
  it("calculates the item totals correctly", () => {
    // Arrange
    const items = [
      {
        productId: "1",
        productName: "Product 1",
        quantity: 3,
        price: 9.99
      }
    ];
    
    // Act
    render(<OrderItemsTable items={items} />);
    
    // Assert
    expect(screen.getByText("₹29.97")).toBeInTheDocument(); // 3 * 9.99 = 29.97
  });
});
