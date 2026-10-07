import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children inside a button with default classes", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("customButton", "primary", "medium");
    expect(button).toHaveClass("borderRadiusMedium");
    expect(button).toBeEnabled();
  });

  it("applies variant, size, shape, active and custom className", () => {
    render(
      <Button
        variant="error"
        size="xlarge"
        shape="circle"
        active
        className="extra"
      >
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("error", "xlarge", "circle", "active", "extra");
    expect(button).not.toHaveClass("primary");
  });

  it("maps named borderRadius values to classes", () => {
    render(<Button borderRadius="none">Flat</Button>);

    expect(screen.getByRole("button")).toHaveClass("borderRadiusNone");
  });

  it("applies numeric borderRadius as inline style merged with style prop", () => {
    render(
      <Button borderRadius={12} style={{ color: "red" }}>
        Rounded
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ borderRadius: "12px", color: "red" });
    expect(button).not.toHaveClass("borderRadiusMedium");
  });

  it("uses ariaLabel as the accessible name", () => {
    render(<Button ariaLabel="Close dialog">x</Button>);

    expect(
      screen.getByRole("button", { name: "Close dialog" }),
    ).toBeInTheDocument();
  });

  it("calls onClick with the click event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.click(screen.getByRole("button", { name: "Go" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("activates via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("is disabled and does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a spinner and disables the button while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <Button onClick={onClick} loading>
        Submitting
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submitting" });
    expect(button).toHaveClass("loading");
    expect(button).toBeDisabled();
    expect(container.querySelector(".loadingSpinner")).toBeInTheDocument();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards extra HTML attributes and the ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} type="submit" data-testid="btn">
        Send
      </Button>,
    );

    const button = screen.getByTestId("btn");
    expect(button).toHaveAttribute("type", "submit");
    expect(ref.current).toBe(button);
  });
});
