import { StrictMode } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import InteractiveIconButton from "./InteractiveIconButton";
import { interactiveIconsMap } from "./interactive-config";
import type { InteractiveIconType } from "./interactive-types";

const getIconButton = () => screen.getByRole("button", { name: "icon button" });

describe("InteractiveIconButton", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an inactive button with inactive colors by default", () => {
    render(<InteractiveIconButton type="favorite" />);

    const button = getIconButton();
    const config = interactiveIconsMap.favorite;
    expect(button).not.toHaveClass("active");
    // inactive color is a theme token (var(--text-secondary-color))
    expect(button.style.color).toBe(config.inactiveColor);
    expect(button.style.getPropertyValue("--fill-color")).toBe(
      config.inactiveFillColor,
    );
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("starts active when initialState is true", () => {
    render(<InteractiveIconButton type="favorite" initialState />);

    const button = getIconButton();
    expect(button).toHaveClass("active");
    expect(button).toHaveStyle({
      color: interactiveIconsMap.favorite.activeColor,
    });
  });

  it("toggles on click and calls onChange with the new state", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onChange = vi.fn();
    render(<InteractiveIconButton type="bookmark" onChange={onChange} />);

    await user.click(getIconButton());
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(getIconButton()).toHaveClass("active");
    expect(getIconButton()).toHaveStyle({
      color: interactiveIconsMap.bookmark.activeColor,
    });

    await user.click(getIconButton());
    expect(onChange).toHaveBeenNthCalledWith(2, false);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(getIconButton()).not.toHaveClass("active");
  });

  it("toggles with Enter and Space despite the tooltip wrapper", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onChange = vi.fn();
    render(<InteractiveIconButton type="star" onChange={onChange} />);

    await user.tab();
    expect(getIconButton()).toHaveFocus();
    expect(screen.getAllByRole("button")).toHaveLength(1);

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    await user.keyboard(" ");
    expect(onChange).toHaveBeenNthCalledWith(2, false);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("calls onChange exactly once per click under StrictMode", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onChange = vi.fn();
    render(
      <StrictMode>
        <InteractiveIconButton type="like" onChange={onChange} />
      </StrictMode>,
    );

    await user.click(getIconButton());

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onChange = vi.fn();
    render(<InteractiveIconButton type="pin" onChange={onChange} disabled />);

    const button = getIconButton();
    expect(button).toBeDisabled();
    await user.click(button);

    expect(onChange).not.toHaveBeenCalled();
    expect(button).not.toHaveClass("active");
  });

  it("passes size, shape and className to the button", () => {
    render(
      <InteractiveIconButton
        type="share"
        size="small"
        shape="square"
        className="mine"
      />,
    );

    expect(getIconButton()).toHaveClass("small", "square", "mine");
  });

  it("shows the inactive tooltip on hover and the active tooltip after toggling", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<InteractiveIconButton type="follow" />);

    await user.hover(getIconButton());
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      interactiveIconsMap.follow.inactiveTooltip,
    );

    await user.click(getIconButton());
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      interactiveIconsMap.follow.activeTooltip,
    );
  });

  it.each(Object.keys(interactiveIconsMap) as InteractiveIconType[])(
    "renders the %s type with an icon",
    (type) => {
      render(<InteractiveIconButton type={type} />);

      expect(getIconButton().querySelector("svg")).toBeInTheDocument();
      expect(getIconButton().style.color).toBe(
        interactiveIconsMap[type].inactiveColor,
      );
    },
  );
});
