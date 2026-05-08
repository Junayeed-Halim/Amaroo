import type { ReactNode } from "react";

export function TrustBadge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.25rem 0.625rem",
        borderRadius: "999px",
        fontSize: "0.875rem",
        fontWeight: 600,
        backgroundColor: "var(--amaroo-brand)",
        color: "var(--amaroo-brand-contrast)",
      }}
    >
      {children}
    </span>
  );
}
