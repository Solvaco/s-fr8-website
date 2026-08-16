// src/components/FormStatus.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormStatus from "./FormStatus";

describe("FormStatus", () => {
  it("renders nothing when state is idle", () => {
    const { container } = render(<FormStatus state="idle" successText="ok" errorText="err" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the success message when state is success", () => {
    render(<FormStatus state="success" successText="Sent!" errorText="err" />);
    expect(screen.getByText("Sent!")).toBeInTheDocument();
  });

  it("renders the error message when state is error", () => {
    render(<FormStatus state="error" successText="ok" errorText="Failed!" />);
    expect(screen.getByText("Failed!")).toBeInTheDocument();
  });
});
