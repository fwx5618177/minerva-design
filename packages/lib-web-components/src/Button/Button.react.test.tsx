import type {} from "../react";
import { act, StrictMode, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import "../index";
import type { Button } from "./index";

// React 19 passes props to custom elements as properties when the element
// defines them, so booleans work as expected (React 18 stringified them).
beforeAll(() => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

let root: Root | undefined;
let container: HTMLDivElement | undefined;

const renderReact = async (ui: React.ReactNode) => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root!.render(<StrictMode>{ui}</StrictMode>));
  const el = container.querySelector("minerva-button") as Button;
  await el.updateComplete;
  return el;
};

const inner = (el: Button) => el.shadowRoot!.querySelector("button")!;
/**
 * A composed click from the inner button. Browsers retarget it to the host
 * outside the shadow root; happy-dom does not, so React (which reads the
 * target at the root) is exercised by clicking the host directly.
 */
const clickInner = (el: Button) =>
  inner(el).dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      composed: true,
    }),
  );
const clickHost = (el: Button) =>
  el.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
});

describe("<minerva-button> in React 19", () => {
  it("treats loading={false} as not loading (regression from React 18)", async () => {
    const el = await renderReact(
      <minerva-button loading={false}>Save</minerva-button>,
    );
    expect(el.loading).toBe(false);
    expect(el.hasAttribute("loading")).toBe(false);
    expect(inner(el).querySelector(".loading-spinner")).toBeNull();
    expect(inner(el).hasAttribute("aria-busy")).toBe(false);
  });

  it("toggles boolean props between true and false", async () => {
    let setLoading: (v: boolean) => void = () => {};
    const Harness = () => {
      const [loading, set] = useState(false);
      setLoading = set;
      return (
        <minerva-button loading={loading} disabled={false}>
          Save
        </minerva-button>
      );
    };
    const el = await renderReact(<Harness />);
    await act(async () => setLoading(true));
    await el.updateComplete;
    expect(el.loading).toBe(true);
    expect(inner(el).querySelector(".loading-spinner")).not.toBeNull();
    await act(async () => setLoading(false));
    await el.updateComplete;
    expect(el.loading).toBe(false);
    expect(inner(el).querySelector(".loading-spinner")).toBeNull();
    expect(el.disabled).toBe(false);
  });

  it("sets string props and forwards clicks to React handlers", async () => {
    const onClick = vi.fn();
    const el = await renderReact(
      <minerva-button variant="success" size="small" onClick={onClick}>
        Go
      </minerva-button>,
    );
    expect(el.variant).toBe("success");
    expect(inner(el).classList.contains("size-small")).toBe(true);
    clickHost(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("stops clicks inside the shadow root while loading", async () => {
    const el = await renderReact(<minerva-button loading>Go</minerva-button>);
    const onHostClick = vi.fn();
    el.addEventListener("click", onHostClick);
    clickInner(el);
    expect(onHostClick).not.toHaveBeenCalled();
  });
});
