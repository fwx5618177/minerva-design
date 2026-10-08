// Every public component under <StrictMode> (double render, double effects):
// no React errors / warnings, effects are idempotent (no duplicated portals,
// no document / window listeners left behind) and overlays open and close
// cleanly (scroll lock, aria-hidden and focus are restored).
import { StrictMode, type ReactElement, type ReactNode } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as lib from "./index";
import { componentSsrCases } from "./test-utils/componentSsrCases";

type Listener = [EventTarget, string, EventListenerOrEventListenerObject];

let added: Listener[] = [];
let logged: unknown[][] = [];

const optionsCapture = (options?: boolean | EventListenerOptions) =>
  typeof options === "boolean" ? options : !!options?.capture;

beforeEach(() => {
  added = [];
  logged = [];
  const record =
    (
      kind: "add" | "remove",
      target: EventTarget,
      original: EventTarget["addEventListener"],
    ) =>
    (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions,
    ) => {
      if (listener) {
        const capture = optionsCapture(options);
        const key = `${type}:${capture}`;
        if (kind === "add") added.push([target, key, listener]);
        else {
          const index = added.findIndex(
            ([t, k, l]) => t === target && k === key && l === listener,
          );
          if (index !== -1) added.splice(index, 1);
        }
      }
      return original.call(target, type, listener, options);
    };
  for (const target of [window, document] as EventTarget[]) {
    const add = target.addEventListener;
    const remove = target.removeEventListener;
    vi.spyOn(target, "addEventListener").mockImplementation(
      record("add", target, add),
    );
    vi.spyOn(target, "removeEventListener").mockImplementation(
      record("remove", target, remove),
    );
  }
  for (const method of ["error", "warn"] as const) {
    vi.spyOn(console, method).mockImplementation((...args) => {
      logged.push([method, ...args]);
    });
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});

const strict = (ui: ReactNode) =>
  render(
    <StrictMode>
      <lib.ConfigProvider theme="light">{ui}</lib.ConfigProvider>
    </StrictMode>,
  );

/**
 * Listeners on window / document that survived unmounting (React DOM's own
 * once-per-document `selectionchange` listener is not ours).
 */
const leftover = () =>
  added
    .filter(([, key]) => !key.startsWith("selectionchange:"))
    .map(
      ([target, key]) => `${target === window ? "window" : "document"} ${key}`,
    );

describe("StrictMode", () => {
  it.each(componentSsrCases)(
    "%s renders, re-runs effects and unmounts cleanly",
    (_, element: ReactElement) => {
      const { unmount, container } = strict(element);
      // No duplicated portal content: every portalled node lives in at most
      // one body child besides the render container.
      const ids = Array.from(document.querySelectorAll("[id]"), (n) => n.id);
      expect(new Set(ids).size, "duplicate ids").toBe(ids.length);
      unmount();
      expect(container.innerHTML).toBe("");
      expect(
        Array.from(document.body.children).filter((c) => c !== container),
        "portal content left in body",
      ).toEqual([]);
      expect(leftover(), "window / document listeners left").toEqual([]);
      expect(document.body.style.overflow).toBe("");
      expect(logged).toEqual([]);
    },
  );
});

describe("StrictMode overlays: open / close", () => {
  const before = () => <button type="button">Outside</button>;

  async function expectClosedCleanly(trigger: HTMLElement) {
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body.style.overflow).toBe("");
    expect(
      document.querySelectorAll(
        "[aria-hidden='true'][data-minerva-hidden], [inert]",
      ),
    ).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Outside" })).not.toHaveAttribute(
      "aria-hidden",
    );
    expect(logged).toEqual([]);
  }

  it("Modal", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.ModalRoot>
          <lib.ModalTrigger>Open modal</lib.ModalTrigger>
          <lib.ModalContent>
            <lib.ModalHeader>Title</lib.ModalHeader>
            <lib.ModalBody>Body</lib.ModalBody>
          </lib.ModalContent>
        </lib.ModalRoot>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open modal" });
    await user.click(trigger);
    expect(await screen.findAllByRole("dialog")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("Drawer", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.DrawerRoot>
          <lib.DrawerTrigger>Open drawer</lib.DrawerTrigger>
          <lib.DrawerContent>
            <lib.DrawerHeader>Title</lib.DrawerHeader>
            <lib.DrawerBody>Body</lib.DrawerBody>
          </lib.DrawerContent>
        </lib.DrawerRoot>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    expect(await screen.findAllByRole("dialog")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("Popover", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.Popover>
          <lib.PopoverTrigger>Open popover</lib.PopoverTrigger>
          <lib.PopoverContent aria-label="Pop">Body</lib.PopoverContent>
        </lib.Popover>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open popover" });
    await user.click(trigger);
    expect(await screen.findAllByRole("dialog")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("Menu", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    strict(
      <>
        {before()}
        <lib.Menu items={[{ key: "a", label: "Alpha" }]}>
          <button type="button">Open menu</button>
        </lib.Menu>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    act(() => trigger.focus());
    await user.keyboard("{Enter}");
    expect(await screen.findAllByRole("menu")).toHaveLength(1);
    expect(screen.getByRole("menuitem", { name: "Alpha" })).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("Select", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.Select placeholder="Pick">
          <lib.SelectItem value="a">A</lib.SelectItem>
          <lib.SelectItem value="b">B</lib.SelectItem>
        </lib.Select>
      </>,
    );
    const trigger = screen.getByRole("combobox");
    act(() => trigger.focus());
    await user.keyboard("{ArrowDown}");
    expect(await screen.findAllByRole("listbox")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("Tooltip", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.Tooltip content="Tip">
          <button type="button">With tip</button>
        </lib.Tooltip>
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "With tip" })).toHaveFocus();
    expect(await screen.findAllByRole("tooltip")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
    expect(logged).toEqual([]);
  });

  it("ConfirmProvider + useConfirm", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    function Ask() {
      const ask = lib.useConfirm();
      return (
        <button
          type="button"
          onClick={async () => onResult(await ask({ title: "Sure?" }))}
        >
          Ask
        </button>
      );
    }
    strict(
      <lib.ConfirmProvider>
        {before()}
        <Ask />
      </lib.ConfirmProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Ask" });
    await user.click(trigger);
    expect(await screen.findAllByRole("alertdialog")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    await expectClosedCleanly(trigger);
  });

  it("CommandDialog", async () => {
    const user = userEvent.setup();
    strict(
      <>
        {before()}
        <lib.CommandDialog
          items={[{ id: "a", title: "Alpha" }]}
          onSelect={() => {}}
          shortcut="/"
        />
      </>,
    );
    const outside = screen.getByRole("button", { name: "Outside" });
    act(() => outside.focus());
    // A doubly registered shortcut listener would toggle it open and shut.
    await user.keyboard("/");
    expect(await screen.findAllByRole("dialog")).toHaveLength(1);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await expectClosedCleanly(outside);
  });

  it("ToastProvider renders one toast per push", async () => {
    strict(<lib.ToastProvider>{before()}</lib.ToastProvider>);
    act(() => {
      lib.toast.info("Saved", { id: "strict", duration: 0 });
    });
    expect(await screen.findAllByText("Saved")).toHaveLength(1);
    act(() => lib.toast.dismiss());
    await waitFor(() => expect(screen.queryByText("Saved")).toBeNull());
    expect(logged).toEqual([]);
  });
});
