import { StrictMode, createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IconButton from "./IconButton";
import i18n from "../../config/i18n";

const Icon = () => <svg data-testid="icon" />;

describe("IconButton", () => {
  it("renders the icon inside a button with a default accessible name", () => {
    render(<IconButton icon={<Icon />} />);

    const button = screen.getByRole("button", { name: "icon button" });
    expect(button).toContainElement(screen.getByTestId("icon"));
    expect(button).toHaveClass(
      "iconButton",
      "neutral",
      "variant-ghost",
      "medium",
      "circle",
    );
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("uses aria-label as the accessible name", () => {
    render(<IconButton icon={<Icon />} aria-label="Delete item" />);

    expect(
      screen.getByRole("button", { name: "Delete item" }),
    ).toBeInTheDocument();
  });

  it("applies color, variant, size, shape, pressed and className", () => {
    render(
      <IconButton
        icon={<Icon />}
        color="danger"
        variant="solid"
        size="large"
        shape="square"
        pressed
        className="mine"
      />,
    );

    expect(screen.getByRole("button")).toHaveClass(
      "danger",
      "variant-solid",
      "large",
      "square",
      "pressed",
      "mine",
    );
  });

  it("forwards style so the CSS custom property hooks can be set", () => {
    render(
      <IconButton
        icon={<Icon />}
        color="primary"
        style={
          {
            "--icon-button-color": "red",
            "--icon-button-hover-bg": "yellow",
            "--icon-button-pressed-color": "green",
            "--icon-button-pressed-bg": "blue",
          } as React.CSSProperties
        }
      />,
    );

    const button = screen.getByRole("button");
    expect(button).not.toHaveAttribute("color");
    expect(button.style.getPropertyValue("--icon-button-color")).toBe("red");
    expect(button.style.getPropertyValue("--icon-button-hover-bg")).toBe(
      "yellow",
    );
    expect(button.style.getPropertyValue("--icon-button-pressed-color")).toBe(
      "green",
    );
    expect(button.style.getPropertyValue("--icon-button-pressed-bg")).toBe(
      "blue",
    );
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
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("tabindex", "-1");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a loading progressbar instead of the icon while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Icon />} onClick={onClick} loading />);

    const button = screen.getByRole("button", { name: "icon button" });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveClass("loading");
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
          aria-label="Info"
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
          aria-label="Info"
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
        <IconButton icon={<Icon />} aria-label="Info" />,
      );

      rerender(
        <IconButton
          icon={<Icon />}
          aria-label="Info"
          showTooltip
          tooltip={{ content: "Hint" }}
        />,
      );
      expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();

      rerender(<IconButton icon={<Icon />} aria-label="Info" />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    it("survives toggling showTooltip and tooltip in every combination", () => {
      const { rerender } = render(
        <IconButton icon={<Icon />} aria-label="Info" showTooltip />,
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
            <IconButton icon={<Icon />} aria-label="Info" {...variant} />,
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
          aria-label="Info"
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

  it("forwards ref to the button (React 19 ref prop)", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton icon={<Icon />} aria-label="Settings" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Settings" }));
  });

  it("localizes its default label", () => {
    render(<IconButton icon={<Icon />} />);
    act(() => {
      i18n.changeLanguage("zh");
    });
    expect(
      screen.getByRole("button", { name: "图标按钮" }),
    ).toBeInTheDocument();
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  describe("toggle (pressed)", () => {
    it("is not a toggle by default", () => {
      render(<IconButton icon={<Icon />} aria-label="Mute" />);
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
    });

    it("toggles on click with a stable name and reports the new state", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      const onClick = vi.fn();
      render(
        <IconButton
          icon={<Icon />}
          aria-label="Favorite"
          defaultPressed={false}
          onPressedChange={onPressedChange}
          onClick={onClick}
        />,
      );
      const button = screen.getByRole("button", { name: "Favorite" });
      expect(button).toHaveAttribute("aria-pressed", "false");
      await user.click(button);
      expect(
        screen.getByRole("button", { name: "Favorite", pressed: true }),
      ).toBe(button);
      expect(button).toHaveClass("pressed");
      expect(onPressedChange).toHaveBeenNthCalledWith(1, true);
      expect(onClick).toHaveBeenCalledTimes(1);
      await user.click(button);
      expect(onPressedChange).toHaveBeenNthCalledWith(2, false);
      expect(button).not.toHaveClass("pressed");
    });

    it("toggles with Enter and Space despite the tooltip wrapper", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <IconButton
          icon={<Icon />}
          label="Star"
          onPressedChange={onPressedChange}
        />,
      );
      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
      expect(screen.getAllByRole("button")).toHaveLength(1);
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onPressedChange.mock.calls).toEqual([[true], [false]]);
    });

    it("reports exactly once per click under StrictMode", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <StrictMode>
          <IconButton
            icon={<Icon />}
            aria-label="Like"
            onPressedChange={onPressedChange}
          />
        </StrictMode>,
      );
      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledExactlyOnceWith(true);
    });

    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <IconButton
          icon={<Icon />}
          aria-label="Pin"
          disabled
          onPressedChange={onPressedChange}
        />,
      );
      await user.click(screen.getByRole("button"));
      expect(onPressedChange).not.toHaveBeenCalled();
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("is controlled by pressed and only reports changes", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      const { rerender } = render(
        <IconButton
          icon={<Icon />}
          aria-label="Star"
          pressed={false}
          onPressedChange={onPressedChange}
        />,
      );
      await user.click(screen.getByRole("button"));
      expect(onPressedChange).toHaveBeenCalledExactlyOnceWith(true);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      rerender(
        <IconButton
          icon={<Icon />}
          aria-label="Star"
          pressed
          onPressedChange={onPressedChange}
        />,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("starts pressed with defaultPressed", () => {
      render(<IconButton icon={<Icon />} aria-label="Pin" defaultPressed />);
      expect(screen.getByRole("button", { pressed: true })).toHaveClass(
        "pressed",
      );
    });

    it("lets onClick cancel the toggle with preventDefault", async () => {
      const user = userEvent.setup();
      const onPressedChange = vi.fn();
      render(
        <IconButton
          icon={<Icon />}
          aria-label="Lock"
          onClick={(e) => e.preventDefault()}
          onPressedChange={onPressedChange}
        />,
      );
      await user.click(screen.getByRole("button"));
      expect(onPressedChange).not.toHaveBeenCalled();
    });
  });

  describe("search button", () => {
    it("submits its form, but not while loading", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      const { rerender } = render(
        <form onSubmit={onSubmit}>
          <IconButton icon={<Icon />} label="Search" type="submit" />
        </form>,
      );
      await user.click(screen.getByRole("button", { name: "Search" }));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      rerender(
        <form onSubmit={onSubmit}>
          <IconButton icon={<Icon />} label="Search" type="submit" loading />
        </form>,
      );
      await user.click(screen.getByRole("button", { name: "Search" }));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      await user.keyboard("{Enter}");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("loading", () => {
    it("stays focusable and ignores Enter, Space and clicks", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onPressedChange = vi.fn();
      render(
        <>
          <button type="button">Before</button>
          <IconButton
            icon={<Icon />}
            label="Save"
            loading
            onClick={onClick}
            onPressedChange={onPressedChange}
          />
        </>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      await user.click(screen.getByRole("button", { name: "Before" }));
      await user.tab();
      expect(button).toHaveFocus();
      expect(button).not.toHaveAttribute("disabled");
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("aria-busy", "true");
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
      expect(onPressedChange).not.toHaveBeenCalled();
      expect(button).toHaveFocus();
    });

    it("keeps focus when loading starts and activates again once done", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { rerender } = render(
        <IconButton icon={<Icon />} label="Sync" onClick={onClick} />,
      );
      const button = screen.getByRole("button", { name: "Sync" });
      await user.tab();
      rerender(
        <IconButton icon={<Icon />} label="Sync" onClick={onClick} loading />,
      );
      expect(button).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onClick).not.toHaveBeenCalled();
      rerender(<IconButton icon={<Icon />} label="Sync" onClick={onClick} />);
      expect(button).not.toHaveAttribute("aria-disabled");
      expect(button).not.toHaveAttribute("aria-busy");
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("uses the native disabled attribute when also disabled", () => {
      render(<IconButton icon={<Icon />} label="Off" loading disabled />);
      const button = screen.getByRole("button", { name: "Off" });
      expect(button).toBeDisabled();
      expect(button).not.toHaveAttribute("aria-disabled");
    });
  });
});
