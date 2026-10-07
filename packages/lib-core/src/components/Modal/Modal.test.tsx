import { createRef, useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { describe, expect, it, vi } from "vitest";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "./index";
import i18n from "../../config/i18n";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Modal (all-in-one)", () => {
  it("renders nothing while closed", () => {
    render(
      <Modal open={false} title="Hidden">
        body
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByText("body")).toBeNull();
  });

  it("renders a dialog named by the title with hooks, size and a hidden description", () => {
    render(
      <Modal open title="Delete record" size="large" className="extra">
        <ModalBody>The record is removed.</ModalBody>
        <ModalFooter>
          <button type="button">OK</button>
        </ModalFooter>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete record" });
    expect(dialog).toHaveClass(
      "content",
      "large",
      "ui-modal-content",
      "ui-modal-size-lg",
      "extra",
    );
    expect(dialog).toHaveAttribute("data-size", "large");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Delete record")).toHaveClass(
      "header",
      "ui-modal-header",
    );
    expect(screen.getByText("The record is removed.")).toHaveClass(
      "body",
      "ui-modal-body",
    );
    expect(
      screen.getByRole("button", { name: "OK" }).parentElement,
    ).toHaveClass("footer", "ui-modal-footer");
    const hidden = dialog.querySelector(".ui-visually-hidden")!;
    expect(hidden).toHaveClass("visuallyHidden");
    expect(dialog).toHaveAttribute("aria-describedby", hidden.id);
    expect(document.querySelector(".ui-modal-overlay")).toHaveClass("overlay");
  });

  it.each([
    ["small", "sm"],
    ["medium", "md"],
    ["xlarge", "xl"],
    ["full", "full"],
  ] as const)("maps size %s to the ui-modal-size-%s hook", (size, hook) => {
    render(<Modal open title="T" size={size} />);
    expect(screen.getByRole("dialog")).toHaveClass(
      size,
      `ui-modal-size-${hook}`,
    );
  });

  it("defaults to the medium size", () => {
    render(<Modal open title="T" />);
    expect(screen.getByRole("dialog")).toHaveClass("ui-modal-size-md");
  });

  it("renders a visible accessible description", () => {
    render(<Modal open title="T" description="Cannot be undone" />);
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
      "Cannot be undone",
    );
    expect(screen.getByText("Cannot be undone")).toHaveClass(
      "description",
      "ui-modal-description",
    );
  });

  it("requests closing from the close button, Escape and an overlay click", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="T">
        x
      </Modal>,
    );
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveClass("close", "ui-modal-close");
    await user.click(close);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    await user.click(document.querySelector<HTMLElement>(".ui-modal-overlay")!);
    expect(onOpenChange).toHaveBeenCalledTimes(3);
    // Controlled: stays open until the parent changes `open`.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("hides the close button and accepts a custom close label", () => {
    const { rerender } = render(<Modal open title="T" hideCloseButton />);
    expect(screen.queryByRole("button")).toBeNull();
    rerender(<Modal open title="T" closeLabel="Dismiss" />);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("localizes the close label", async () => {
    await act(() => i18n.changeLanguage("zh"));
    try {
      render(<Modal open title="T" />);
      expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    } finally {
      await act(() => i18n.changeLanguage("en"));
    }
  });

  it("works uncontrolled with a trigger and returns focus to it", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    render(
      <Modal
        title="Settings"
        trigger={<button type="button">Open settings</button>}
        onOpenChange={onOpenChange}
      >
        <ModalBody>
          <input aria-label="Name" />
        </ModalBody>
      </Modal>,
    );
    const trigger = screen.getByRole("button", { name: "Open settings" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(trigger).toHaveFocus();
  });

  it("opens initially with defaultOpen and forwards the ref to the dialog", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Modal defaultOpen title="Hello" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("dialog", { name: "Hello" }));
  });

  it("traps Tab focus inside the dialog", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Outside</button>
        <Modal open title="Trap">
          <ModalBody>
            <button type="button">Inside</button>
          </ModalBody>
        </Modal>
      </>,
    );
    const dialog = screen.getByRole("dialog", { name: "Trap" });
    for (let i = 0; i < 4; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("submits a form wrapping body and footer", async () => {
    const user = setup();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    function Form() {
      const [open, setOpen] = useState(true);
      return (
        <Modal open={open} onOpenChange={setOpen} title="Rename">
          <form
            onSubmit={(event) => {
              onSubmit(event);
              setOpen(false);
            }}
          >
            <ModalBody>
              <input aria-label="Title" defaultValue="Draft" />
            </ModalBody>
            <ModalFooter>
              <button type="submit">Save</button>
            </ModalFooter>
          </form>
        </Modal>
      );
    }
    render(<Form />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

describe("Modal compound API", () => {
  it("opens via ModalTrigger, closes via ModalClose and forwards refs / attributes", async () => {
    const user = setup();
    const contentRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    const bodyRef = createRef<HTMLDivElement>();
    const footerRef = createRef<HTMLDivElement>();
    render(
      <ModalRoot>
        <ModalTrigger>Open modal</ModalTrigger>
        <ModalContent
          ref={contentRef}
          size="small"
          className="c"
          overlayClassName="o"
          data-k="v"
        >
          <ModalHeader ref={headerRef} className="h">
            Panel
          </ModalHeader>
          <ModalBody ref={bodyRef} className="b">
            body
          </ModalBody>
          <ModalFooter ref={footerRef} className="f">
            <ModalClose>Done</ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalRoot>,
    );
    const trigger = screen.getByRole("button", { name: "Open modal" });
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Panel" });
    expect(contentRef.current).toBe(dialog);
    expect(dialog).toHaveClass("ui-modal-size-sm", "c");
    expect(dialog).toHaveAttribute("data-k", "v");
    expect(document.querySelector(".ui-modal-overlay")).toHaveClass("o");
    expect(headerRef.current).toHaveClass("ui-modal-header", "h");
    expect(bodyRef.current).toHaveClass("ui-modal-body", "b");
    expect(footerRef.current).toHaveClass("ui-modal-footer", "f");

    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("supports a non-modal root and asChild triggers", async () => {
    const user = setup();
    render(
      <ModalRoot modal={false} defaultOpen>
        <ModalTrigger asChild>
          <a href="#x">Link trigger</a>
        </ModalTrigger>
        <ModalContent hideCloseButton>
          <ModalHeader>Non modal</ModalHeader>
        </ModalContent>
      </ModalRoot>,
    );
    expect(
      screen.getByRole("dialog", { name: "Non modal" }),
    ).toBeInTheDocument();
    const link = screen.getByText("Link trigger");
    expect(link.tagName).toBe("A");
    await user.click(link);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

// Ported from novel-isr-ui src/components/__test__/AdminPrimitives.test.tsx
// ("keeps menu focus and Escape inside an enclosing modal"). novel's Menu is a
// Radix dropdown menu; the Radix primitive is used directly here.
describe("Modal with nested layers", () => {
  it("keeps menu focus and Escape inside an enclosing modal", async () => {
    const user = setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="Settings">
        <RadixMenu.Root>
          <RadixMenu.Trigger>Nested actions</RadixMenu.Trigger>
          <RadixMenu.Portal>
            <RadixMenu.Content>
              <RadixMenu.Item>Edit</RadixMenu.Item>
            </RadixMenu.Content>
          </RadixMenu.Portal>
        </RadixMenu.Root>
      </Modal>,
    );
    const trigger = screen.getByRole("button", { name: "Nested actions" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(document.activeElement).toHaveAttribute("role", "menuitem"),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("dialog", { name: "Settings" }),
    ).toBeInTheDocument();
  });
});
