import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";
import { IconButton } from "../IconButton";

describe("Button keyboard", () => {
  it("skips disabled buttons in the tab order", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Button>First</Button>
        <Button disabled>Disabled</Button>
        <Button>Last</Button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Last" })).toHaveFocus();
  });

  it("keeps a loading button reachable but ignores Enter and Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    await user.tab();
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("ignores Enter and Space when disabled, even if focused programmatically", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Delete
      </Button>,
    );
    screen.getByRole("button", { name: "Delete" }).focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards aria-* attributes to the native button", () => {
    render(
      <Button aria-haspopup="menu" aria-expanded={false} aria-controls="m">
        Options
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Options" });
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "m");
  });
});

describe("IconButton keyboard", () => {
  it("skips disabled icon buttons; loading ones stay focusable but inert", async () => {
    const user = userEvent.setup();
    render(
      <>
        <IconButton aria-label="First" icon="1" />
        <IconButton aria-label="Disabled" icon="2" disabled />
        <IconButton aria-label="Loading" icon="3" loading />
        <IconButton aria-label="Last" icon="4" />
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
    await user.tab();
    const loading = screen.getByRole("button", { name: "Loading" });
    expect(loading).toHaveFocus();
    expect(loading).toHaveAttribute("aria-disabled", "true");
    expect(loading).toHaveAttribute("aria-busy", "true");
    await user.tab();
    expect(screen.getByRole("button", { name: "Last" })).toHaveFocus();
  });

  it("toggles aria-pressed with Space and keeps focus", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(
      <IconButton
        aria-label="Mute"
        icon="m"
        onPressedChange={onPressedChange}
      />,
    );
    await user.tab();
    const button = screen.getByRole("button", { name: "Mute" });
    await user.keyboard(" ");
    expect(onPressedChange).toHaveBeenLastCalledWith(true);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveFocus();
  });

  it("forwards className, style and aria-* attributes", () => {
    render(
      <IconButton
        aria-label="More"
        icon="m"
        className="custom"
        style={{ marginTop: 2 }}
        aria-haspopup="menu"
        aria-expanded
      />,
    );
    const button = screen.getByRole("button", { name: "More" });
    expect(button).toHaveClass("custom");
    expect(button.style.marginTop).toBe("2px");
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
