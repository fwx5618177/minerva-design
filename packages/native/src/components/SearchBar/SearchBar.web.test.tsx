import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar (react-native-web)", () => {
  it("renders a searchbox; typing and Cancel", () => {
    const onChange = vi.fn();
    const onCancel = vi.fn();
    render(<SearchBar showCancel onChange={onChange} onCancel={onCancel} />);
    const box = screen.getByRole("searchbox", { name: "Search" });
    expect(box).toHaveAttribute("data-minerva", "search-bar");
    fireEvent.change(box, { target: { value: "tea" } });
    expect(onChange).toHaveBeenCalledWith("tea");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
    expect(box).toHaveValue("");
  });
});
