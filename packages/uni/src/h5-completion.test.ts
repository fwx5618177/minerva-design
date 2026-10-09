import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { expect, it } from "vitest";
import Modal from "./Modal.vue";
import HtmlPreview from "./HtmlPreview.vue";
import Popover from "./Popover.vue";
import PopoverContent from "./PopoverContent.vue";
import PopoverTrigger from "./PopoverTrigger.vue";
import { h } from "vue";
it("H5 modal isolates its background and restores scrolling", async () => {
  const outside = document.createElement("button");
  document.body.append(outside);
  const w = mount(Modal, {
    attachTo: document.body,
    props: { open: true, title: "Details" },
  });
  await nextTick();
  await nextTick();
  expect(document.body.style.overflow).toBe("hidden");
  expect(outside.hasAttribute("inert")).toBe(true);
  w.unmount();
  expect(outside.hasAttribute("inert")).toBe(false);
  expect(document.body.style.overflow).not.toBe("hidden");
  outside.remove();
});
it("H5 preview renders in sandbox with CSP", () => {
  const w = mount(HtmlPreview, {
    props: { html: "<p>Hello</p>", title: "Preview" },
  });
  expect(w.find("iframe").exists()).toBe(true);
  expect(w.find("iframe").attributes("sandbox")).toBe("");
  expect(w.find("iframe").attributes("srcdoc")).toContain("default-src 'none'");
  w.unmount();
});
it("H5 popover portal renders content under body", async () => {
  const w = mount(Popover, {
    attachTo: document.body,
    props: { defaultOpen: true },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Trigger"),
        h(PopoverContent, { portal: true }, () => "Portal content"),
      ],
    },
  });
  await nextTick();
  expect(
    document.body.querySelector(".mn-uni-popover-panel")?.parentElement,
  ).toBe(document.body);
  w.unmount();
});
it("H5 asChild trigger composes the authored button and honors its canceled click", async () => {
  const w = mount(Popover, {
    attachTo: document.body,
    slots: {
      default: () => [
        h(PopoverTrigger, { asChild: true }, () =>
          h(
            "button",
            { class: "authored", onClick: (e: Event) => e.preventDefault() },
            "Open",
          ),
        ),
        h(PopoverContent, {}, () => "Content"),
      ],
    },
  });
  expect(w.findAll("button")).toHaveLength(1);
  await w.find(".authored").trigger("click");
  expect(w.find("[role=dialog]").exists()).toBe(false);
  w.unmount();
});

it.each(["drawer", "popover"])(
  "H5 %s switches modal isolation while remaining open",
  async (kind) => {
    const { default: Drawer } = await import("./Drawer.vue");
    const outside = document.createElement("button");
    document.body.append(outside);
    const w =
      kind === "drawer"
        ? mount(Drawer, {
            attachTo: document.body,
            props: { open: true, modal: false },
            slots: { default: () => h("button", "Inside") },
          })
        : mount(Popover, {
            attachTo: document.body,
            props: { open: true, modal: false },
            slots: {
              default: () => [
                h(PopoverTrigger, {}, () => "Trigger"),
                h(PopoverContent, {}, () => h("button", "Inside")),
              ],
            },
          });
    try {
      await nextTick();
      await nextTick();
      expect(outside.hasAttribute("inert")).toBe(false);
      await w.setProps({ modal: true });
      await nextTick();
      expect(outside.hasAttribute("inert")).toBe(true);
      expect(document.body.style.overflow).toBe("hidden");
      const panel = w.find('[role="dialog"]').element as HTMLElement;
      panel.querySelector("button")!.focus();
      outside.focus();
      expect(panel.contains(document.activeElement)).toBe(true);
      await w.setProps({ modal: false });
      await nextTick();
      expect(outside.hasAttribute("inert")).toBe(false);
      expect(document.body.style.overflow).not.toBe("hidden");
      outside.focus();
      expect(document.activeElement).toBe(outside);
    } finally {
      w.unmount();
      outside.remove();
    }
  },
);

it("H5 popover observes asynchronously resized content after opening and rebinds after reopening", async () => {
  const { vi } = await import("vitest");
  const observers: {
    callback: ResizeObserverCallback;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  }[] = [];
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
      constructor(public callback: ResizeObserverCallback) {
        observers.push(this);
      }
    },
  );
  let frame: FrameRequestCallback | undefined;
  const request = vi
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback) => {
      frame = callback;
      return 77;
    });
  const cancel = vi.spyOn(window, "cancelAnimationFrame");
  const w = mount(Popover, {
    attachTo: document.body,
    props: { open: false },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Trigger"),
        h(PopoverContent, { side: "top" }, () => "Async details"),
      ],
    },
  });
  try {
    await w.setProps({ open: true });
    await nextTick();
    const panel = w.find('[role="dialog"]').element as HTMLElement;
    const anchor = w.find(".mn-popover-trigger").element as HTMLElement;
    anchor.getBoundingClientRect = () =>
      ({
        left: 100,
        right: 200,
        top: 400,
        bottom: 430,
        width: 100,
        height: 30,
      }) as DOMRect;
    panel.getBoundingClientRect = () =>
      ({ width: 200, height: 160 }) as DOMRect;
    expect(observers).toHaveLength(1);
    expect(observers[0].observe).toHaveBeenCalledWith(panel);
    expect(observers[0].observe).toHaveBeenCalledWith(anchor);
    observers[0].callback([], observers[0] as unknown as ResizeObserver);
    frame!(0);
    await nextTick();
    expect(panel.style.top).toBe("234px");
    observers[0].callback([], observers[0] as unknown as ResizeObserver);
    await w.setProps({ open: false });
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalledWith(77);
    await w.setProps({ open: true });
    await nextTick();
    expect(observers).toHaveLength(2);
    const reopened = w.find('[role="dialog"]').element;
    expect(reopened).not.toBe(panel);
    expect(observers[1].observe).toHaveBeenCalledWith(reopened);
    w.unmount();
    expect(observers[1].disconnect).toHaveBeenCalledOnce();
    expect(request).toHaveBeenCalled();
  } finally {
    w.unmount();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  }
});
