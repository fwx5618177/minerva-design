// A toolbar with overlays: Tooltip on an IconButton, a Popover "share" panel
// and an action Menu. Keyboard first: open, navigate, Escape, focus return.
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  IconButton,
  Menu,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@minerva/lib-core";

const CogIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="5" />
  </svg>
);

const Toolbar = ({ onAction }: { onAction: (action: string) => void }) => {
  return (
    <div role="toolbar" aria-label="Document">
      <Tooltip content="Open settings">
        <IconButton icon={<CogIcon />} ariaLabel="Settings" />
      </Tooltip>
      <IconButton
        icon={<CogIcon />}
        ariaLabel="Favorite"
        defaultPressed={false}
      />
      <Popover>
        <PopoverTrigger>Share</PopoverTrigger>
        <PopoverContent aria-label="Share options" side="bottom" align="start">
          <button type="button" onClick={() => onAction("copy-link")}>
            Copy link
          </button>
        </PopoverContent>
      </Popover>
      <Menu
        ariaLabel="More actions"
        items={[
          { key: "rename", label: "Rename" },
          { key: "archive", label: "Archive", disabled: true },
          { key: "delete", label: "Delete" },
        ]}
        onSelect={(item) => onAction(item.key)}
      >
        <button type="button">More</button>
      </Menu>
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

  it("closes only the tooltip on the first Escape inside an open popover", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Format</PopoverTrigger>
        <PopoverContent aria-label="Format options">
          <Tooltip content="Make text bold">
            <button type="button">Bold</button>
          </Tooltip>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Format" }));
    // focus moves to the first tabbable: the tooltip shows on focus
    const bold = screen.getByRole("button", { name: "Bold" });
    await waitFor(() => expect(bold).toHaveFocus());
    expect(screen.getByRole("tooltip")).toHaveTextContent("Make text bold");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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

  it("opens the share popover, closes it with Escape and returns focus", async () => {
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
    await waitFor(() => expect(share).toHaveFocus());
    expect(share).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the share popover when clicking outside", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Outside content"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates the action menu with the keyboard", async () => {
    const { user, onAction } = setup();
    const more = screen.getByRole("button", { name: "More" });
    more.focus();
    await user.keyboard("{Enter}");
    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("menu", { name: "More actions" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus(),
    );

    // disabled items are skipped; Home / End jump to the ends
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(more).toHaveFocus());

    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus(),
    );
    await user.keyboard("{End}{Enter}");
    expect(onAction).toHaveBeenCalledWith("delete");
    await waitFor(() => expect(more).toHaveFocus());
  });

  it("closes the menu when clicking outside", async () => {
    // The modal menu blocks pointer events on the page; the click outside
    // still dismisses it
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Toolbar onAction={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByText("Outside content"));
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });
});
