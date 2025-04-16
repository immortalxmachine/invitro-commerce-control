
import { render, screen } from "@testing-library/react";
import { CustomerInfoCard } from "../CustomerInfoCard";
import { describe, it, expect } from "vitest";

describe("CustomerInfoCard", () => {
  it("renders the customer information correctly", () => {
    // Arrange
    const customer = "John Doe";
    
    // Act
    render(<CustomerInfoCard customer={customer} />);
    
    // Assert
    expect(screen.getByText("Customer Information")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("customer@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Anytown, CA 90210")).toBeInTheDocument();
  });
});
