import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CookieConsent } from "../src/components/CookieConsent";

describe("CookieConsent", () => {
  it("renders cookie consent banner", () => {
    render(<CookieConsent privacyPolicyUrl="/privacy" />);
    expect(screen.getByText(/We value your privacy/i)).toBeInTheDocument();
  });

  it("handles accept all", () => {
    render(<CookieConsent privacyPolicyUrl="/privacy" />);
    fireEvent.click(screen.getByText(/Accept All/i));
    expect(screen.queryByText(/We value your privacy/i)).not.toBeInTheDocument();
  });
});