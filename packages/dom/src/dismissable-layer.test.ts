import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ESCAPE_CONSUMER_ATTRIBUTE,
  createDismissableLayer,
  getLayerStack,
  type DismissableLayer,
} from "./dismissable-layer";

const created: DismissableLayer[] = [];
const layer = (...args: Parameters<typeof createDismissableLayer>) => {
  const l = createDismissableLayer(...args);
  created.push(l);
  return l;
};

const el = (id: string, parent: Element = document.body) => {
  const node = document.createElement("div");
  node.id = id;
  node.innerHTML = `<button id="${id}-btn">${id}</button>`;
  parent.appendChild(node);
  return node;
};

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

const pointerDown = (target: Element, init: PointerEventInit = {}) => {
  const event = new PointerEvent("pointerdown", {
    bubbles: true,
    cancelable: true,
    composed: true,
    pointerType: "mouse",
    ...init,
  });
  target.dispatchEvent(event);
  return event;
};

const escape = (target: Element = document.body) => {
  const event = new KeyboardEvent("keydown", {
    key: "Escape",
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event;
};

afterEach(() => {
  for (const l of created.splice(0)) l.destroy();
  document.body.innerHTML = "";
  document.body.removeAttribute("style");
});

describe("createDismissableLayer", () => {
  it("dismisses on Escape and prevents the key's default", () => {
    const onDismiss = vi.fn();
    const onEscapeKeyDown = vi.fn();
    layer(el("a"), { onDismiss, onEscapeKeyDown });
    const event = escape();
    expect(onEscapeKeyDown).toHaveBeenCalledWith(event);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores Escape pressed inside an element that consumes it", () => {
    const onDismiss = vi.fn();
    const node = el("a");
    layer(node, { onDismiss });
    const button = node.querySelector("button")!;
    button.setAttribute(ESCAPE_CONSUMER_ATTRIBUTE, "");
    expect(escape(button).defaultPrevented).toBe(false);
    expect(onDismiss).not.toHaveBeenCalled();
    button.removeAttribute(ESCAPE_CONSUMER_ATTRIBUTE);
    escape(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("ignores other keys", () => {
    const onDismiss = vi.fn();
    layer(el("a"), { onDismiss });
    document.body.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("only the topmost layer handles Escape", () => {
    const parent = vi.fn();
    const child = vi.fn();
    layer(el("a"), { onDismiss: parent });
    const top = layer(el("b"), { onDismiss: child });
    escape();
    expect(child).toHaveBeenCalledTimes(1);
    expect(parent).not.toHaveBeenCalled();

    top.destroy();
    escape();
    expect(parent).toHaveBeenCalledTimes(1);
  });

  it("Escape can be cancelled with preventDefault or by returning false", () => {
    const onDismiss = vi.fn();
    const l = layer(el("a"), {
      onDismiss,
      onEscapeKeyDown: (e) => e.preventDefault(),
    });
    escape();
    l.update({ onEscapeKeyDown: () => false });
    escape();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("ignores the opening pointerdown, then dismisses on outside pointerdown", async () => {
    const onDismiss = vi.fn();
    const onPointerDownOutside = vi.fn();
    const onInteractOutside = vi.fn();
    const outside = el("outside");
    layer(el("a"), { onDismiss, onPointerDownOutside, onInteractOutside });

    pointerDown(outside);
    expect(onDismiss).not.toHaveBeenCalled();

    await nextTick();
    const event = pointerDown(outside);
    expect(onPointerDownOutside).toHaveBeenCalledWith(event);
    expect(onInteractOutside).toHaveBeenCalledWith(event);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not dismiss on pointerdown inside the layer or its branches", async () => {
    const onDismiss = vi.fn();
    const a = el("a");
    const trigger = el("trigger");
    layer(a, { onDismiss, branches: () => [trigger, null] });
    await nextTick();
    pointerDown(a.querySelector("button")!);
    pointerDown(trigger.querySelector("button")!);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("outside pointerdown can be cancelled", async () => {
    const onDismiss = vi.fn();
    const outside = el("outside");
    const l = layer(el("a"), {
      onDismiss,
      onPointerDownOutside: (e) => e.preventDefault(),
    });
    await nextTick();
    pointerDown(outside);
    l.update({
      onPointerDownOutside: undefined,
      onInteractOutside: () => false,
    });
    pointerDown(outside);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("excludeFromOutside ignores interactions entirely", async () => {
    const onDismiss = vi.fn();
    const toast = el("toast");
    layer(el("a"), {
      onDismiss,
      excludeFromOutside: (target) => toast.contains(target),
    });
    await nextTick();
    pointerDown(toast);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("clicks in a portalled child layer never dismiss the parent", async () => {
    const parentDismiss = vi.fn();
    const childDismiss = vi.fn();
    const grandchildDismiss = vi.fn();
    const menu = el("menu");
    const submenu = el("submenu"); // portalled: sibling of menu
    const subsub = el("subsub");
    layer(menu, { onDismiss: parentDismiss });
    layer(submenu, { onDismiss: childDismiss });
    layer(subsub, { onDismiss: grandchildDismiss });
    await nextTick();

    pointerDown(subsub.querySelector("button")!);
    expect(parentDismiss).not.toHaveBeenCalled();
    expect(childDismiss).not.toHaveBeenCalled();
    expect(grandchildDismiss).not.toHaveBeenCalled();

    // click in the parent: only the descendants are outside
    pointerDown(menu.querySelector("button")!);
    expect(parentDismiss).not.toHaveBeenCalled();
    expect(childDismiss).toHaveBeenCalledTimes(1);
    expect(grandchildDismiss).toHaveBeenCalledTimes(1);

    // click outside everything: all of them
    pointerDown(el("outside"));
    expect(parentDismiss).toHaveBeenCalledTimes(1);
    expect(childDismiss).toHaveBeenCalledTimes(2);
  });

  it("supports explicit parents and DOM-nested layers", async () => {
    const a = el("a");
    const nested = el("nested", a);
    const b = el("b");
    const aLayer = layer(a, { onDismiss: vi.fn() });
    layer(nested, {});
    // b explicitly a root: a click in b dismisses a
    const aDismiss = vi.fn();
    aLayer.update({ onDismiss: aDismiss });
    const bLayer = layer(b, { parent: null });
    const c = el("c");
    const cDismiss = vi.fn();
    // c is explicitly a child of b (by handle) and d of a (by element)
    layer(c, { parent: bLayer, onDismiss: cDismiss });
    const d = el("d");
    layer(d, { parent: a.querySelector("button") });

    const stack = getLayerStack();
    expect(stack.map((l) => l.element.id)).toEqual([
      "a",
      "nested",
      "b",
      "c",
      "d",
    ]);
    expect(stack.map((l) => l.parent?.id ?? null)).toEqual([
      null,
      "a",
      null,
      "b",
      "a",
    ]);
    await nextTick();

    pointerDown(b);
    expect(aDismiss).toHaveBeenCalledTimes(1);
    expect(cDismiss).toHaveBeenCalledTimes(1);

    aDismiss.mockClear();
    pointerDown(d);
    expect(aDismiss).not.toHaveBeenCalled();
  });

  it("dismisses on focus outside (not on focus inside a child layer)", () => {
    const onDismiss = vi.fn();
    const onFocusOutside = vi.fn();
    const menu = el("menu");
    const submenu = el("submenu");
    const outside = el("outside");
    layer(menu, { onDismiss, onFocusOutside });
    layer(submenu, {});

    submenu.querySelector("button")!.focus();
    expect(onDismiss).not.toHaveBeenCalled();

    outside.querySelector("button")!.focus();
    expect(onFocusOutside).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("preventDefault() in onFocusOutside keeps the layer open (focusin is not cancelable)", () => {
    const onDismiss = vi.fn();
    const dialog = el("dialog");
    const outside = el("outside");
    layer(dialog, {
      onDismiss,
      onFocusOutside: (event) => event.preventDefault(),
    });
    outside.querySelector("button")!.focus();
    expect(onDismiss).not.toHaveBeenCalled();
    // the instance override is removed after the handlers ran
    const event = new FocusEvent("focusin");
    expect(Object.prototype.hasOwnProperty.call(event, "preventDefault")).toBe(
      false,
    );
  });

  it("handles touch on the following click", async () => {
    const onDismiss = vi.fn();
    const outside = el("outside");
    layer(el("a"), { onDismiss });
    await nextTick();
    pointerDown(outside, { pointerType: "touch" });
    expect(onDismiss).not.toHaveBeenCalled();
    // a second touch (e.g. scroll gesture) replaces the pending one
    pointerDown(outside, { pointerType: "touch" });
    outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("disableOutsidePointerEvents: body inert, layer and higher layers auto, nested restore", async () => {
    document.body.style.pointerEvents = "visible";
    const below = el("below");
    const modal = el("modal");
    const above = el("above");
    above.style.pointerEvents = "painted";
    const belowDismiss = vi.fn();

    const belowLayer = layer(below, { onDismiss: belowDismiss });
    const modalLayer = layer(modal, { disableOutsidePointerEvents: true });
    expect(document.body.style.pointerEvents).toBe("none");
    expect(modal.style.pointerEvents).toBe("auto");
    expect(below.style.pointerEvents).toBe("");

    const aboveLayer = layer(above, {});
    expect(above.style.pointerEvents).toBe("auto");

    // nested modal keeps body disabled
    const modal2 = el("modal2");
    const modal2Layer = layer(modal2, { disableOutsidePointerEvents: true });
    expect(modal.style.pointerEvents).toBe("");
    expect(modal2.style.pointerEvents).toBe("auto");

    await nextTick();
    // layers below a modal are not dismissed by pointer
    pointerDown(el("outside"));
    expect(belowDismiss).not.toHaveBeenCalled();

    modal2Layer.destroy();
    expect(document.body.style.pointerEvents).toBe("none");
    expect(modal.style.pointerEvents).toBe("auto");

    aboveLayer.destroy();
    expect(above.style.pointerEvents).toBe("painted");

    modalLayer.update({ disableOutsidePointerEvents: false });
    expect(document.body.style.pointerEvents).toBe("visible");
    expect(modal.style.pointerEvents).toBe("");

    modalLayer.update({ disableOutsidePointerEvents: true });
    expect(document.body.style.pointerEvents).toBe("none");
    modalLayer.destroy();
    belowLayer.destroy();
    expect(document.body.style.pointerEvents).toBe("visible");
    expect(getLayerStack()).toHaveLength(0);
  });

  it("destroy is idempotent and stops handling", async () => {
    const onDismiss = vi.fn();
    const l = layer(el("a"), { onDismiss });
    l.destroy();
    l.destroy();
    l.update({ disableOutsidePointerEvents: true });
    expect(document.body.style.pointerEvents).toBe("");
    escape();
    await nextTick();
    pointerDown(document.body);
    expect(onDismiss).not.toHaveBeenCalled();
    expect(l.element.id).toBe("a");
  });

  it("a handler destroying lower layers does not call them", async () => {
    const lowerDismiss = vi.fn();
    const lower = layer(el("lower"), { onDismiss: lowerDismiss });
    layer(el("upper"), { onDismiss: () => lower.destroy() });
    await nextTick();
    pointerDown(el("outside"));
    expect(lowerDismiss).not.toHaveBeenCalled();
  });
});
