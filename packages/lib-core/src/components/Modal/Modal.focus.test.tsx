/* eslint-disable jsx-a11y/no-autofocus -- focus return with an autoFocus child is the behaviour under test */
import { act, createRef, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "./index";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  vi.useFakeTimers();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  act(() => vi.runAllTimers());
  container.remove();
  vi.useRealTimers();
});

function Simple({
  autoFocus = false,
  removeOpener = false,
  conditional = false,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!(removeOpener && open) && (
        <button id="first" onClick={() => setOpen(true)}>
          First opener
        </button>
      )}
      <button id="second" onClick={() => setOpen(true)}>
        Second opener
      </button>
      {(!conditional || open) && (
        <Modal
          open={open}
          onOpenChange={(next) => !next && setOpen(false)}
          title="Edit record"
        >
          <ModalBody>
            <input aria-label="Record" autoFocus={autoFocus} />
            <button id="cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

function openFrom(id: string) {
  const opener = container.querySelector<HTMLButtonElement>(`#${id}`)!;
  act(() => {
    opener.focus();
    opener.click();
  });
  expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  expect(document.activeElement).toBe(document.querySelector("input"));
  return opener;
}

function escape() {
  act(() =>
    document.activeElement!.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  act(() => vi.runAllTimers());
  expect(document.querySelector('[role="dialog"]')).toBeNull();
}

it.each([false, true])(
  "restores the opener after Escape with child autoFocus=%s",
  (autoFocus) => {
    act(() => root.render(<Simple autoFocus={autoFocus} />));
    const opener = openFrom("first");
    escape();
    expect(document.activeElement).toBe(opener);
  },
);

it("restores focus when an autofocus dialog is conditionally mounted in StrictMode", () => {
  act(() =>
    root.render(
      <StrictMode>
        <Simple autoFocus conditional />
      </StrictMode>,
    ),
  );
  const opener = openFrom("first");
  escape();
  expect(document.activeElement).toBe(opener);
});

it("captures the current opener on repeated opens and preserves it across an open rerender", () => {
  act(() => root.render(<Simple autoFocus />));
  const first = openFrom("first");
  escape();
  expect(document.activeElement).toBe(first);
  const second = openFrom("second");
  act(() => root.render(<Simple autoFocus />));
  act(() => document.querySelector<HTMLButtonElement>("#cancel")!.click());
  act(() => vi.runAllTimers());
  expect(document.activeElement).toBe(second);
});

it("does not focus a detached opener or a replacement element with the same id", () => {
  act(() => root.render(<Simple autoFocus />));
  const opener = openFrom("first");
  act(() => root.render(<Simple autoFocus removeOpener />));
  expect(opener.isConnected).toBe(false);
  escape();
  expect(document.activeElement).toBe(document.body);
  expect(container.querySelector("#first")).not.toBe(opener);
  const second = openFrom("second");
  escape();
  expect(document.activeElement).toBe(second);
});

it("keeps the new opener when reopened before the previous close autofocus timer", () => {
  act(() => root.render(<Simple autoFocus />));
  openFrom("first");
  act(() => document.querySelector<HTMLButtonElement>("#cancel")!.click());
  const second = openFrom("second");
  act(() => vi.runAllTimers());
  expect(document.activeElement).toBe(document.querySelector("input"));
  escape();
  expect(document.activeElement).toBe(second);
});

it("keeps native compound trigger restoration", () => {
  act(() =>
    root.render(
      <ModalRoot>
        <ModalTrigger id="trigger">Open compound</ModalTrigger>
        <ModalContent>
          <ModalHeader>Compound</ModalHeader>
          <input aria-label="Value" />
          <ModalClose id="compound-close">Close</ModalClose>
        </ModalContent>
      </ModalRoot>,
    ),
  );
  const trigger = container.querySelector<HTMLButtonElement>("#trigger")!;
  act(() => {
    trigger.focus();
    trigger.click();
  });
  expect(document.activeElement).toBe(document.querySelector("input"));
  act(() =>
    document.querySelector<HTMLButtonElement>("#compound-close")!.click(),
  );
  act(() => vi.runAllTimers());
  expect(document.activeElement).toBe(trigger);
});

it("preserves compound consumer autofocus cancellation, custom targets and content ref", () => {
  const ref = createRef<HTMLDivElement>();
  act(() =>
    root.render(
      <>
        <button id="return-target">Return here</button>
        <ModalRoot>
          <ModalTrigger id="trigger">Open compound</ModalTrigger>
          <ModalContent
            ref={ref}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              document.querySelector<HTMLInputElement>("#preferred")!.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              document
                .querySelector<HTMLButtonElement>("#return-target")!
                .focus();
            }}
          >
            <ModalHeader>Compound</ModalHeader>
            <input aria-label="First field" />
            <input id="preferred" aria-label="Preferred field" />
          </ModalContent>
        </ModalRoot>
      </>,
    ),
  );
  act(() => container.querySelector<HTMLButtonElement>("#trigger")!.click());
  expect(ref.current).toBe(document.querySelector('[role="dialog"]'));
  expect(document.activeElement).toBe(document.querySelector("#preferred"));
  escape();
  expect(document.activeElement).toBe(
    container.querySelector("#return-target"),
  );
  expect(ref.current).toBeNull();
});
