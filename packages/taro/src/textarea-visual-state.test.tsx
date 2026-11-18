import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Textarea } from "./forms";

it("Textarea paints and clears its invalid border from the emitted host state", () => {
  const style = document.createElement("style");
  style.textContent = ["mini-controls.css", "taro-components.css"]
    .map((name) =>
      readFileSync(
        resolve(
          dirname(fileURLToPath(import.meta.url)),
          "../../../tools/styles",
          name,
        ),
        "utf8",
      ),
    )
    .join("\n");
  document.head.append(style);
  const { container, rerender } = render(<Textarea invalid />);
  container.style.setProperty("--danger-color", "#dc2626");
  container.style.setProperty("--border-color", "#d1d5db");
  const field = container.querySelector(".mn-textarea")!;
  try {
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveClass("mn-invalid");
    expect(getComputedStyle(field).borderTopColor).toBe("#dc2626");
    rerender(<Textarea invalid={false} />);
    expect(field).not.toHaveClass("mn-invalid");
    expect(getComputedStyle(field).borderTopColor).toBe("#d1d5db");
  } finally {
    style.remove();
  }
});
