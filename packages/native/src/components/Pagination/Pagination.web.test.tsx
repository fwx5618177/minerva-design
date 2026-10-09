import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Pagination } from "./Pagination";

describe("Pagination (react-native-web)", () => {
  it("renders a labelled navigation landmark with labelled buttons", () => {
    render(
      <MinervaProvider locale={{ language: "fr" }}>
        <Pagination total={50} current={2} />
      </MinervaProvider>,
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-minerva", "pagination");
    expect(nav).toHaveAttribute("aria-label");
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(7);
    const current = screen.getByRole("button", { name: /\b2\b/ });
    expect(current).toHaveAttribute("aria-selected", "true");
    expect(current).toHaveTextContent("2");
    expect(current).toHaveAttribute("data-part", "item");
  });

  it("clicks change the page; disabled edges are ignored", () => {
    const onChange = vi.fn();
    render(<Pagination total={30} onChange={onChange} />);
    const prev = screen.getByRole("button", { name: "Previous page" });
    expect(prev).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(prev);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onChange).toHaveBeenCalledWith(3, 10);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
