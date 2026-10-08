import { fireEvent, render, screen } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { describe, expect, it, vi } from "vitest";
import { Counter } from "./Counter";

describe("Counter (Taro components via @tarojs/components-react)", () => {
  it("renders Text and Button and increments on click", () => {
    const onIncrement = vi.fn();
    const toast = vi.spyOn(Taro, "showToast");
    render(<Counter onIncrement={onIncrement} />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Increment"));
    expect(onIncrement).toHaveBeenCalledWith(1);
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 1");
    expect(toast).toHaveBeenCalledWith({ title: "count 1", icon: "none" });
  });

  it("ignores clicks when disabled", () => {
    const onIncrement = vi.fn();
    render(<Counter disabled onIncrement={onIncrement} />);
    const btn = screen.getByRole("button", { name: "Increment" });
    expect(btn).toHaveClass("taro-btn-disabled");
    expect(btn).toHaveAttribute("aria-disabled", "true");
    expect(btn.tagName).toBe("DIV"); // not a native <button>
    fireEvent.click(btn);
    expect(onIncrement).not.toHaveBeenCalled();
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 0");
  });

  it("forwards className and style to the DOM", () => {
    render(
      <Counter
        className="mv-counter"
        style={{ color: "red", padding: "4px" }}
      />,
    );
    const root = screen.getByTestId("root");
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("mv-counter");
    // happy-dom keeps named colors as written (no rgb() normalisation) -> assert raw values
    expect(root.style.color).toBe("red");
    expect(root.style.padding).toBe("4px");
    expect(root).toHaveStyle({ color: "red" });
    expect(screen.getByTestId("count").tagName).toBe("SPAN");
    expect(screen.getByTestId("count")).toHaveClass("taro-text");
  });

  it("forwards className/style on Taro Button itself", () => {
    render(
      <Counter buttonClassName="mv-btn" buttonStyle={{ marginTop: "8px" }} />,
    );
    const btn = screen.getByRole("button", { name: "Increment" });
    expect(btn).toHaveClass("mv-btn", "taro-button-core", "taro-btn-default");
    expect(btn.style.marginTop).toBe("8px");
  });
});
