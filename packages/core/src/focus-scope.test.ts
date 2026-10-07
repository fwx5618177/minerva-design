import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createFocusScope,
  FOCUS_SCOPE_MOUNT_EVENT,
  getFocusScopeCount,
  type FocusScope,
} from "./focus-scope";

const scopes: FocusScope[] = [];
const scope = (...args: Parameters<typeof createFocusScope>) => {
  const s = createFocusScope(...args);
  scopes.push(s);
  return s;
};

function setup(
  inner = `<button id="first">first</button><input id="middle" /><button id="last">last</button>`,
) {
  document.body.innerHTML = `
    <button id="trigger">trigger</button>
    <div id="container">${inner}</div>
    <button id="outside">outside</button>
  `;
  const $ = <T extends HTMLElement = HTMLElement>(id: string) =>
    document.getElementById(id) as T;
  return { $, container: $("container") };
}

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  for (const s of scopes.splice(0)) s.deactivate();
  document.body.innerHTML = "";
});

describe("createFocusScope", () => {
  it("auto-focuses the first tabbable and restores focus on deactivate", async () => {
    const { $, container } = setup();
    $("trigger").focus();
    const s = scope(container);
    s.activate();
    expect(document.activeElement).toBe($("first"));
    expect(s.isActive()).toBe(true);

    s.deactivate();
    expect(s.isActive()).toBe(false);
    await nextTick();
    expect(document.activeElement).toBe($("trigger"));
  });

  it("restores focus after the container is removed", async () => {
    const { $, container } = setup();
    $("trigger").focus();
    const s = scope(container, { trapped: true });
    s.activate();
    container.remove();
    s.deactivate();
    await nextTick();
    expect(document.activeElement).toBe($("trigger"));
  });

  it("does not steal focus moved deliberately outside before the restore", async () => {
    const { $, container } = setup();
    $("trigger").focus();
    const s = scope(container);
    s.activate();
    s.deactivate();
    $("outside").focus();
    await nextTick();
    expect(document.activeElement).toBe($("outside"));
  });

  it("skips restore when the trigger is gone or restoreFocus is false", async () => {
    const { $, container } = setup();
    $("trigger").focus();
    const s = scope(container);
    s.activate();
    $("trigger").remove();
    s.deactivate();
    await nextTick();
    expect(document.activeElement).not.toBe($("trigger"));

    const { $: $2, container: c2 } = setup();
    $2("trigger").focus();
    const s2 = scope(c2, { restoreFocus: false });
    s2.activate();
    s2.deactivate();
    await nextTick();
    expect(document.activeElement).toBe($2("first"));
  });

  it("restores focus to an explicit element", async () => {
    const { $, container } = setup();
    const s = scope(container, { restoreFocus: $("outside") });
    s.activate();
    s.deactivate();
    await nextTick();
    expect(document.activeElement).toBe($("outside"));
  });

  it("supports autoFocus element / function / false", () => {
    const { $, container } = setup();
    const s1 = scope(container, { autoFocus: $("last") });
    s1.activate();
    expect(document.activeElement).toBe($("last"));
    s1.deactivate();

    $("outside").focus();
    const s2 = scope(container, { autoFocus: () => $("middle") });
    s2.activate();
    expect(document.activeElement).toBe($("middle"));
    s2.deactivate();

    $("outside").focus();
    const s3 = scope(container, { autoFocus: () => null });
    s3.activate();
    expect(document.activeElement).toBe($("first"));
    s3.deactivate();

    $("outside").focus();
    const s4 = scope(container, { autoFocus: false });
    s4.activate();
    expect(document.activeElement).toBe($("outside"));
  });

  it("focuses links last and the container when empty", () => {
    const { $, container } = setup(
      `<a id="link" href="#x">l</a><button id="b">b</button>`,
    );
    const s = scope(container);
    s.activate();
    expect(document.activeElement).toBe($("b"));
    s.deactivate();

    const { container: empty } = setup(`<p>no tabbables</p>`);
    const s2 = scope(empty);
    s2.activate();
    expect(empty.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(empty);
    s2.deactivate();
    expect(empty.hasAttribute("tabindex")).toBe(false);
  });

  it("keeps focus where it is when already inside", () => {
    const { $, container } = setup();
    $("last").focus();
    const s = scope(container);
    s.activate();
    expect(document.activeElement).toBe($("last"));
  });

  it("mount / unmount auto-focus can be cancelled", async () => {
    const { $, container } = setup();
    $("trigger").focus();
    const onMount = vi.fn((event: Event) => event.preventDefault());
    const onUnmount = vi.fn(() => false as const);
    const domListener = vi.fn();
    container.addEventListener(FOCUS_SCOPE_MOUNT_EVENT, domListener);
    const s = scope(container, {
      onMountAutoFocus: onMount,
      onUnmountAutoFocus: onUnmount,
    });
    s.activate();
    expect(onMount).toHaveBeenCalledTimes(1);
    expect(domListener).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe($("trigger"));

    $("first").focus();
    s.deactivate();
    container.remove();
    await nextTick();
    expect(onUnmount).toHaveBeenCalledTimes(1);
    expect(document.activeElement).not.toBe($("trigger"));
  });

  it("traps and loops Tab / Shift+Tab", async () => {
    const user = userEvent.setup();
    const { $, container } = setup();
    scope(container, { trapped: true, loop: true }).activate();
    expect(document.activeElement).toBe($("first"));

    await user.tab();
    expect(document.activeElement).toBe($("middle"));
    await user.tab();
    expect(document.activeElement).toBe($("last"));
    await user.tab();
    expect(document.activeElement).toBe($("first"));
    await user.tab({ shift: true });
    expect(document.activeElement).toBe($("last"));
  });

  it("stops at the edges when trapped without loop", async () => {
    const user = userEvent.setup();
    const { $, container } = setup();
    scope(container, { trapped: true }).activate();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe($("first"));
    $("last").focus();
    await user.tab();
    expect(document.activeElement).toBe($("last"));
  });

  it("loops without trapping", async () => {
    const user = userEvent.setup();
    const { $, container } = setup();
    scope(container, { loop: true }).activate();
    $("last").focus();
    await user.tab();
    expect(document.activeElement).toBe($("first"));
    // not trapped: focus may leave by other means
    $("outside").focus();
    expect(document.activeElement).toBe($("outside"));
  });

  it("ignores modified Tab and non-trapping scopes", async () => {
    const user = userEvent.setup();
    const { $, container } = setup();
    scope(container).activate();
    $("last").focus();
    await user.tab();
    expect(document.activeElement).toBe($("outside"));

    const { $: $2, container: c2 } = setup();
    scope(c2, { trapped: true, loop: true }).activate();
    $2("last").focus();
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    $2("last").dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("keeps Tab on an empty trapped container", () => {
    const { container } = setup(`<p>empty</p>`);
    scope(container, { trapped: true }).activate();
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    container.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("pulls focus back inside when it moves outside", () => {
    const { $, container } = setup();
    scope(container, { trapped: true }).activate();
    $("middle").focus();
    $("outside").focus();
    expect(document.activeElement).toBe($("middle"));
  });

  it("focuses the container when the focused element is removed", async () => {
    const { $, container } = setup();
    scope(container, { trapped: true }).activate();
    $("first").focus();
    $("first").remove();
    await nextTick();
    expect(document.activeElement).toBe(container);
  });

  it("pause() / resume() stop and restart trapping", () => {
    const { $, container } = setup();
    const s = scope(container, { trapped: true });
    s.activate();
    s.pause();
    expect(s.isActive()).toBe(false);
    $("outside").focus();
    expect(document.activeElement).toBe($("outside"));
    s.resume();
    $("first").focus();
    $("outside").focus();
    expect(document.activeElement).toBe($("first"));
  });

  it("stacks scopes: a nested trap pauses the parent, deactivating resumes it", async () => {
    document.body.innerHTML = `
      <div id="outer"><button id="o1">o1</button><button id="open">open</button></div>
      <div id="inner"><button id="i1">i1</button></div>
      <button id="elsewhere">x</button>
    `;
    const $ = (id: string) => document.getElementById(id)!;
    const outer = scope($("outer"), { trapped: true });
    outer.activate();
    $("open").focus();

    const before = getFocusScopeCount();
    const inner = scope($("inner"), { trapped: true });
    inner.activate();
    expect(getFocusScopeCount()).toBe(before + 1);
    expect(document.activeElement).toBe($("i1"));
    expect(outer.isActive()).toBe(false);

    // only the inner scope traps
    $("elsewhere").focus();
    expect(document.activeElement).toBe($("i1"));

    inner.deactivate();
    expect(outer.isActive()).toBe(true);
    await nextTick();
    expect(document.activeElement).toBe($("open"));
    $("elsewhere").focus();
    expect(document.activeElement).toBe($("open"));
  });

  it("activate / deactivate are idempotent", () => {
    const { container } = setup();
    const s = scope(container);
    const before = getFocusScopeCount();
    s.activate();
    s.activate();
    expect(getFocusScopeCount()).toBe(before + 1);
    s.deactivate();
    s.deactivate();
    expect(getFocusScopeCount()).toBe(before);
  });
});
