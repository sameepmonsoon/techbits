import { render, screen } from "@testing-library/react";
import React from "react";
import Button from "../Button.jsx";

describe("App tests", () => {
  it("should contains the heading 1", () => {
    render(<Button title="Nepal" />);
    const heading = screen.getByText(/Hello world! I am using React/i);
    expect(heading).toBeInTheDocument();
  });
});
