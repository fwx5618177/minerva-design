// A toolbar with overlays: Tooltip on an IconButton, a Popper "share" panel
// and a Dropdown menu. Keyboard first: open, navigate, Escape, focus return.
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Dropdown,
  IconButton,
  InteractiveIconButton,
  Popper,
  Tooltip,
} from "@minerva/lib-core";

const CogIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="5" />
  </svg>
);

const Toolbar = ({ onAction }: { onAction: (action: string) => void }) => {
  const [shareAnchor, setShareAnchor] = useState<HTMLButtonElement | null>(
    null,
  );
  const [shareOpen, setShareOpen] = useState(false);
  return (
    <div role="toolbar" aria-label="Document">
      <Tooltip content="Open settings">
        <IconButton icon={<CogIcon />} ariaLabel="Settings" />
      </Tooltip>
      <InteractiveIconButton type="favorite" />
      <button ref={setShareAnchor} type="button" aria-expanded={shareOpen}>
        Share
      </button>
      <Popper
        anchorEl={shareAnchor}
        visible={shareOpen}
        onVisibleChange={setShareOpen}
        onClickAway={() => setShareOpen(false)}
        ariaLabel="Share options"
        placement="bottomStart"
      >
        <button type="button" onClick={() => onAction("copy-link")}>
          Copy link
        </button>
      </Popper>
      <Dropdown
        ariaLabel="More actions"
        items={[
          { label: "Rename", value: "rename" },
          { label: "Archive", value: "archive", disabled: true },
          { label: "Delete", value: "delete" },
        ]}
        onSelect={(item) => onAction(item.value)}
      >
        <button type="button">More</button>
      </Dropdown>
      <p>Outside content</p>
    </div>
  );
};

const setup = () => {
  const onAction = vi.fn();
  const user = userEvent.setup();
  render(<Toolbar onAction={onAction} />);
  return { user, onAction };
};

describe("e2e: overlays", () => {
  it("shows a tooltip on keyboard focus and dismisses it with Escape", async () => {
    const { user } = setup();
    await user.tab();
    const settings = screen.getByRole("button", { name: "Settings" });
    expect(settings).toHaveFocus();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("Open settings");
    expect(settings).toHaveAccessibleDescription("Open settings");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(settings).toHaveFocus();
  });

  it("toggles the favorite button and exposes its pressed state", async () => {
    const { user } = setup();
    const favorite = screen.getByRole("button", { name: "Favorite" });
    expect(favorite).toHaveAttribute("aria-pressed", "false");
    favorite.focus();
    await user.keyboard("{Enter}");
    expect(favorite).toHaveAttribute("aria-pressed", "true");
    await user.keyboard(" ");
    expect(favorite).toHaveAttribute("aria-pressed", "false");
  });

  it("opens the share popper, closes it with Escape and returns focus", async () => {
    const { user, onAction } = setup();
    const share = screen.getByRole("button", { name: "Share" });
    await user.click(share);
    expect(share).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("dialog", { name: "Share options" });

    await user.click(screen.getByRole("button", { name: "Copy link" }));
    expect(onAction).toHaveBeenCalledWith("copy-link");
    expect(panel).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(share).toHaveFocus();
    expect(share).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the share popper when clicking outside", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Outside content"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates the dropdown menu with the keyboard", async () => {
    const { user, onAction } = setup();
    const more = screen.getByRole("button", { name: "More" });
    more.focus();
    await user.keyboard("{Enter}");
    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("menu", { name: "More actions" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();

    // disabled items are skipped, navigation wraps
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(more).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onAction).toHaveBeenCalledWith("delete");
    expect(more).toHaveFocus();
  });

  it("closes the dropdown when focus leaves it", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByText("Outside content"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
