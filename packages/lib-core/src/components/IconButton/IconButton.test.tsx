import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IconButton from "./IconButton";

const Icon = () => <svg data-testid="icon" />;

describe("IconButton", () => {
  it("renders the icon inside a button with a default accessible name", () => {
    render(<IconButton icon={<Icon />} />);

    const button = screen.getByRole("button", { name: "icon button" });
    expect(button).toContainElement(screen.getByTestId("icon"));
    expect(button).toHaveClass("iconButton", "default", "medium", "circle");
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-disabled", "false");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("uses ariaLabel as the accessible name", () => {
    render(<IconButton icon={<Icon />} ariaLabel="Delete item" />);

    expect(
      screen.getByRole("button", { name: "Delete item" }),
    ).toBeInTheDocument();
  });

  it("applies variant, size, shape, active and className", () => {
    render(
      <IconButton
        icon={<Icon />}
        variant="error"
        size="large"
        shape="square"
        active
        className="mine"
      />,
    );

    expect(screen.getByRole("button")).toHaveClass(
      "error",
      "large",
      "square",
      "active",
      "mine",
    );
  });

  it("applies custom colors as inline style and CSS variables", () => {
    render(
      <IconButton
        icon={<Icon />}
        color="red"
        bgColor="blue"
        activeColor="green"
        hoverColor="yellow"
        fillColor="black"
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ color: "red", backgroundColor: "blue" });
    expect(button.style.getPropertyValue("--active-color")).toBe("green");
    expect(button.style.getPropertyValue("--hover-color")).toBe("yellow");
    expect(button.style.getPropertyValue("--fill-color")).toBe("black");
  });

  it("calls onClick with the click event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} onClick={onClick} />);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} onClick={onClick} />);

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled, unfocusable and ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} onClick={onClick} disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabindex", "-1");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a loading progressbar instead of the icon while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} onClick={onClick} loading />);

    const button = screen.getByRole("button", { name: "icon button" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("loading");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getByRole("progressbar", { name: "Loading" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards extra HTML attributes", () => {
    render(<IconButton icon={<Icon />} type="submit" title="Submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("title", "Submit");
  });

  describe("tooltip", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("does not render a tooltip wrapper unless showTooltip is set", () => {
      render(<IconButton icon={<Icon />} tooltip={{ content: "Hint" }} />);

      expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    it("shows tooltip content on hover when showTooltip is set", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(
        <IconButton
          icon={<Icon />}
          ariaLabel="Info"
          showTooltip
          tooltip={{ content: "More information" }}
        />,
      );

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      await user.hover(screen.getByRole("button", { name: "Info" }));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole("tooltip")).toHaveTextContent("More information");
    });

    it("does not show the tooltip when disabled", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(
        <IconButton
          icon={<Icon />}
          ariaLabel="Info"
          disabled
          showTooltip
          tooltip={{ content: "More information" }}
        />,
      );

      await user.hover(screen.getByRole("button", { name: "Info" }));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("can toggle showTooltip between renders", () => {
      const { rerender } = render(
        <IconButton icon={<Icon />} ariaLabel="Info" />,
      );

      rerender(
        <IconButton
          icon={<Icon />}
          ariaLabel="Info"
          showTooltip
          tooltip={{ content: "Hint" }}
        />,
      );
      expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();

      rerender(<IconButton icon={<Icon />} ariaLabel="Info" />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    it("survives toggling showTooltip and tooltip in every combination", () => {
      const { rerender } = render(
        <IconButton icon={<Icon />} ariaLabel="Info" showTooltip />,
      );
      const variants = [
        { showTooltip: true, tooltip: { content: "Hint" } },
        { showTooltip: false, tooltip: { content: "Hint" } },
        { showTooltip: true, tooltip: undefined },
        { showTooltip: true, tooltip: { content: "Hint" } },
        { showTooltip: false, tooltip: undefined },
      ];
      variants.forEach((variant) => {
        expect(() =>
          rerender(
            <IconButton icon={<Icon />} ariaLabel="Info" {...variant} />,
          ),
        ).not.toThrow();
        expect(screen.getAllByRole("button")).toHaveLength(1);
      });
    });

    it("activates with Enter/Space and describes itself via the tooltip on focus", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onClick = vi.fn();
      render(
        <IconButton
          icon={<Icon />}
          ariaLabel="Info"
          showTooltip
          tooltip={{ content: "More information" }}
          onClick={onClick}
        />,
      );

      await user.tab();
      const button = screen.getByRole("button", { name: "Info" });
      expect(button).toHaveFocus();
      const tooltip = screen.getByRole("tooltip");
      expect(button).toHaveAttribute("aria-describedby", tooltip.id);

      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });
});
