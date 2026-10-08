import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapse, CollapseItem } from "./Collapse";

describe("Collapse (react-native-web)", () => {
  it("headers are DOM buttons with aria-expanded and styling hooks", () => {
    const onChange = vi.fn();
    render(
      <Collapse accordion onChange={onChange}>
        <CollapseItem name="a" title="First">
          One
        </CollapseItem>
        <CollapseItem name="b" title="Second">
          Two
        </CollapseItem>
      </Collapse>,
    );
    const first = screen.getByRole("button", { name: "First" });
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(first).toHaveAttribute("data-minerva", "collapse");
    expect(first).toHaveAttribute("data-part", "header");
    fireEvent.click(first);
    expect(onChange).toHaveBeenCalledWith("a");
    expect(screen.getByRole("button", { name: "First" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Second" }));
    expect(screen.queryByText("One")).toBeNull();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
