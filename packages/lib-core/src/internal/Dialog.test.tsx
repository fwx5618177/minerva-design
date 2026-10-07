import { useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  getFocusScopeCount,
  getLayerStack,
  isScrollLocked,
} from "@minerva/core";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "../components/Modal";
import { Drawer } from "../components/Drawer";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Select, SelectItem } from "../components/Select";
import { ConfigProvider } from "../contexts/ConfigProvider";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Next tick: core layers ignore the pointer down that opened them. */
const ready = () => act(() => new Promise((r) => setTimeout(r, 0)));

describe("Dialog foundation", () => {
  it("links title / description and supports role, aria-modal and data-state", async () => {
    const user = setup();
    render(
      <DialogRoot>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent
          role="alertdialog"
          className="panel"
          overlayClassName="veil"
        >
          <DialogTitle>Remove item</DialogTitle>
          <DialogDescription>It cannot be restored.</DialogDescription>
          <DialogClose>Cancel</DialogClose>
        </DialogContent>
      </DialogRoot>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(trigger).not.toHaveAttribute("aria-controls");
    await user.click(trigger);
    const dialog = screen.getByRole("alertdialog", { name: "Remove item" });
    expect(dialog).toHaveAccessibleDescription("It cannot be restored.");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(document.querySelector(".veil")).toHaveAttribute(
      "data-state",
      "open",
    );
    expect(screen.getByText("Remove item").tagName).toBe("H2");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("throws a helpful error outside of a root", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<DialogClose />)).toThrow(/inside its dialog root/);
    vi.restoreAllMocks();
  });

  it("hides the rest of the page, locks scrolling and disables outside pointer events while open, then restores", async () => {
    const user = setup();
    render(
      <>
        <main>page</main>
        <Modal title="Settings" trigger={<button type="button">Open</button>}>
          <ModalBody>body</ModalBody>
        </Modal>
      </>,
    );
    const main = screen.getByText("page");
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(main.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(dialog.closest("[aria-hidden]")).toBeNull();
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.pointerEvents).toBe("none");
    expect(dialog.style.pointerEvents).toBe("auto");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(main.closest("[aria-hidden]")).toBeNull();
    expect(isScrollLocked()).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.pointerEvents).toBe("");
    expect(getLayerStack()).toHaveLength(0);
    expect(getFocusScopeCount()).toBe(0);
  });

  it("closes only the topmost of nested modals on Escape, nesting scroll lock and hideOthers", async () => {
    const user = setup();
    const onOuter = vi.fn();
    function Nested() {
      const [outer, setOuter] = useState(true);
      const [inner, setInner] = useState(false);
      return (
        <Modal
          open={outer}
          onOpenChange={(next) => {
            onOuter(next);
            setOuter(next);
          }}
          title="Outer"
        >
          <ModalBody>
            <button type="button" onClick={() => setInner(true)}>
              Open inner
            </button>
            <Modal open={inner} onOpenChange={setInner} title="Inner">
              <ModalBody>
                <input aria-label="Inner field" />
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      );
    }
    render(<Nested />);
    const outer = screen.getByRole("dialog", { name: "Outer" });
    const openInner = screen.getByRole("button", { name: "Open inner" });
    await user.click(openInner);
    const inner = screen.getByRole("dialog", { name: "Inner" });
    expect(screen.getByRole("textbox", { name: "Inner field" })).toHaveFocus();
    // the inner modal hides the outer one from assistive technology
    expect(outer.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(getLayerStack().map((l) => l.parent)).toEqual([null, outer]);

    // Tab stays in the inner modal
    await user.tab();
    expect(inner).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Inner" })).toBeNull(),
    );
    expect(onOuter).not.toHaveBeenCalled();
    expect(outer.closest("[aria-hidden]")).toBeNull();
    expect(isScrollLocked()).toBe(true);
    await waitFor(() => expect(openInner).toHaveFocus());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOuter).toHaveBeenCalledWith(false);
    expect(isScrollLocked()).toBe(false);
  });

  it("closes on an overlay pointer down but not on clicks inside", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    render(
      <ModalRoot open onOpenChange={onOpenChange}>
        <ModalContent overlayClassName="veil">
          <ModalHeader>Title</ModalHeader>
          <button type="button">Inside</button>
        </ModalContent>
      </ModalRoot>,
    );
    await ready();
    await user.click(screen.getByRole("button", { name: "Inside" }));
    expect(onOpenChange).not.toHaveBeenCalled();
    await user.click(document.querySelector<HTMLElement>(".veil")!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes a non-modal dialog on outside click and focus without trapping", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Page</button>
        <ModalRoot modal={false}>
          <ModalTrigger>Open</ModalTrigger>
          <ModalContent hideCloseButton>
            <ModalHeader>Panel</ModalHeader>
            <button type="button">Inside</button>
          </ModalContent>
        </ModalRoot>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Panel" });
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(document.body.style.pointerEvents).toBe("");
    expect(isScrollLocked()).toBe(false);
    expect(document.querySelector(".overlay")).toBeNull();
    await ready();
    await user.click(screen.getByRole("button", { name: "Page" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("returns focus to the opener of a state-opened modal, and to the trigger otherwise", async () => {
    const user = setup();
    function Page() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Row action
          </button>
          <Drawer open={open} onOpenChange={setOpen} title="Details">
            <button type="button">Inside</button>
          </Drawer>
        </>
      );
    }
    render(<Page />);
    const opener = screen.getByRole("button", { name: "Row action" });
    await user.click(opener);
    const drawer = screen.getByRole("dialog", { name: "Details" });
    expect(drawer).toContainElement(document.activeElement as HTMLElement);
    await user.click(within(drawer).getByRole("button", { name: "Close" }));
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("keeps a Popover inside a Modal as a child layer: Escape and outside clicks close the popover first", async () => {
    const user = setup();
    const onModal = vi.fn();
    render(
      <Modal open onOpenChange={onModal} title="Edit">
        <ModalBody>
          <Popover>
            <PopoverTrigger>Options</PopoverTrigger>
            <PopoverContent aria-label="Options panel">
              <button type="button">Pick</button>
            </PopoverContent>
          </Popover>
          <button type="button">Elsewhere</button>
        </ModalBody>
      </Modal>,
    );
    const modal = screen.getByRole("dialog", { name: "Edit" });
    const trigger = screen.getByRole("button", { name: "Options" });
    await user.click(trigger);
    const panel = screen.getByRole("dialog", { name: "Options panel" });
    expect(modal).not.toContainElement(panel);
    expect(panel).toContainElement(document.activeElement as HTMLElement);
    // portalled after the modal opened: not hidden, pointer events enabled
    expect(panel.closest("[aria-hidden]")).toBeNull();
    expect(panel.style.pointerEvents).toBe("auto");

    await ready();
    await user.click(screen.getByRole("button", { name: "Pick" }));
    expect(onModal).not.toHaveBeenCalled();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Options panel" }),
      ).toBeNull(),
    );
    expect(onModal).not.toHaveBeenCalled();
    await waitFor(() => expect(trigger).toHaveFocus());

    await user.click(trigger);
    await ready();
    await user.click(screen.getByRole("button", { name: "Elsewhere" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Options panel" }),
      ).toBeNull(),
    );
    expect(onModal).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Edit" })).toBeInTheDocument();
  });

  it("lets a (Radix) Select inside a Modal take focus and Escape", async () => {
    const user = setup();
    const onModal = vi.fn();
    const onChange = vi.fn();
    render(
      <Modal open onOpenChange={onModal} title="Language">
        <ModalBody>
          <Select aria-label="Language" onChange={onChange}>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </Select>
        </ModalBody>
      </Modal>,
    );
    const combobox = screen.getByRole("combobox", { name: "Language" });
    await user.click(combobox);
    const listbox = await screen.findByRole("listbox");
    await waitFor(() =>
      expect(listbox).toContainElement(document.activeElement as HTMLElement),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    expect(onModal).not.toHaveBeenCalled();

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "French" }));
    expect(onChange).toHaveBeenCalledWith("fr");
    expect(onModal).not.toHaveBeenCalled();
    expect(
      screen.getByRole("dialog", { name: "Language" }),
    ).toBeInTheDocument();
  });

  it("portals into the theme-scoped container of a nested ConfigProvider", async () => {
    const user = setup();
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <Drawer open title="Scoped drawer" />
          <Popover defaultOpen>
            <PopoverTrigger>T</PopoverTrigger>
            <PopoverContent aria-label="Scoped popover">body</PopoverContent>
          </Popover>
        </ConfigProvider>
      </ConfigProvider>,
    );
    const host = document.querySelector("[data-minerva-portal-host]");
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toContainElement(
      screen.getByRole("dialog", { name: "Scoped drawer" }),
    );
    expect(host).toContainElement(
      screen.getByRole("dialog", { name: "Scoped popover", hidden: true }),
    );
    await user.keyboard("{Escape}");
  });

  it("keeps a forceMount-ed content mounted while closed without behaviour", () => {
    render(
      <DialogRoot>
        <DialogContent forceMount aria-label="Kept">
          content
        </DialogContent>
      </DialogRoot>,
    );
    const dialog = screen.getByRole("dialog", { name: "Kept" });
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(getLayerStack()).toHaveLength(0);
    expect(isScrollLocked()).toBe(false);
  });
});
