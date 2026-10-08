// Leak harness: every custom element of the manifest (overlays also open,
// data elements with data) is connected, given time to run, then
// disconnected. Nothing the library acquired may survive: event listeners on
// window / document / <html> / <body> / media query lists, timers,
// intervals, animation frames, idle callbacks, Resize / Mutation /
// Intersection observers. Reconnecting an element acquires exactly what the
// first connection did (no accumulation across connect / disconnect cycles).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import manifest from "../../custom-elements.json" with { type: "json" };
import "../../src/index";
import "../../src/elements/code-editor";
import { toast } from "../../src/index";
import { settle } from "../utils";
import { trackLeaks, type LeakTracker } from "../../../../tests/leak-tracker";

const realTimeout = globalThis.setTimeout.bind(globalThis);
const pause = (ms: number) =>
  new Promise<void>((resolve) => realTimeout(resolve, ms));

interface Declaration {
  tagName?: string;
  attributes?: { name: string }[];
}
const declarations = (
  manifest as { modules: { declarations?: Declaration[] }[] }
).modules
  .flatMap((m) => m.declarations ?? [])
  .filter((d): d is Declaration & { tagName: string } => !!d.tagName);

/** Data for the elements that only acquire resources once they render items */
const DATA: Record<string, Record<string, unknown>> = {
  "minerva-select": { options: [{ value: "a", label: "Apple" }] },
  "minerva-autocomplete": { options: [{ value: "a", label: "Apple" }] },
  "minerva-cascader": {
    options: [
      { value: "a", label: "A", children: [{ value: "b", label: "B" }] },
    ],
  },
  "minerva-command-dialog": { items: [{ id: "a", title: "Alpha" }] },
  "minerva-menu": { items: [{ key: "a", label: "Alpha" }] },
  "minerva-context-menu": { items: [{ key: "a", label: "Alpha" }] },
  "minerva-data-table": {
    columns: [{ key: "name", title: "Name", dataIndex: "name", fixed: "left" }],
    rows: [{ key: 1, name: "Ada" }],
  },
  "minerva-virtual-list": {
    items: Array.from({ length: 50 }, (_, i) => ({ id: i, label: `Row ${i}` })),
  },
  "minerva-nav-tree": {
    sections: [{ id: "s", items: [{ id: "a", label: "A", href: "/a" }] }],
  },
  "minerva-steps": { items: [{ title: "One" }, { title: "Two" }] },
  "minerva-description-list": { items: [{ label: "Name", value: "Ada" }] },
  "minerva-tag-input": { value: ["a"] },
};

/** Inner markup some elements need to be meaningful (trigger / tabs...) */
const CONTENT: Record<string, string> = {
  "minerva-tooltip": `<button slot="trigger">Tip</button>`,
  "minerva-popover": `<button slot="trigger">Pop</button>body`,
  "minerva-menu": `<button slot="trigger">Menu</button>`,
  "minerva-tabs": `<minerva-tab value="a">A</minerva-tab><minerva-tab-panel value="a">a</minerva-tab-panel>`,
  "minerva-page-tabs": `<minerva-page-tab value="a">A</minerva-page-tab>`,
  "minerva-command-dialog": "",
};

function create(tag: string, open: boolean) {
  const el = document.createElement(tag) as HTMLElement &
    Record<string, unknown>;
  Object.assign(el, DATA[tag] ?? {});
  if (CONTENT[tag]) el.innerHTML = CONTENT[tag];
  if (open) el.setAttribute("open", "");
  return el;
}

const cases = declarations.flatMap((d) => {
  const open = d.attributes?.some((a) => a.name === "open") ?? false;
  return open
    ? [[d.tagName, false] as const, [d.tagName, true] as const]
    : [[d.tagName, false] as const];
});

let tracker: LeakTracker;

beforeEach(() => {
  tracker = trackLeaks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  tracker.restore();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("leak harness: connect / disconnect", () => {
  it("covers every element of the manifest", () => {
    expect(declarations.length).toBeGreaterThan(80);
    for (const { tagName } of declarations) {
      expect(customElements.get(tagName), tagName).toBeDefined();
    }
  });

  it.each(
    cases.map(([tag, open]) => [`${tag}${open ? " (open)" : ""}`, tag, open]),
  )("%s releases everything it acquired", async (_, tag, open) => {
    const el = create(tag, open);
    document.body.append(el);
    await settle();
    await pause(30);
    el.remove();
    await settle();
    await pause(30);
    expect(tracker.held()).toEqual([]);
  });

  it.each(
    cases.map(([tag, open]) => [`${tag}${open ? " (open)" : ""}`, tag, open]),
  )(
    "%s re-acquires the same resources when reconnected",
    async (_, tag, open) => {
      const el = create(tag, open);
      document.body.append(el);
      await settle();
      await pause(20);
      const first = tracker.counts();
      el.remove();
      await settle();
      document.body.append(el);
      await settle();
      await pause(20);
      expect(tracker.counts()).toEqual(first);
      el.remove();
      await settle();
      await pause(30);
      expect(tracker.held()).toEqual([]);
    },
  );

  // The toast store is module level by design (the imperative `toast()` API
  // works without a region and toasts survive a region reconnect): a toast's
  // auto-dismiss timer belongs to the toast and is released when it closes.
  it("toast: the auto-dismiss timer is released when the toast closes", async () => {
    const region = document.createElement("minerva-toast-region");
    document.body.append(region);
    await settle();
    toast.success("Saved", { duration: 60_000 });
    await settle();
    await pause(30);
    region.remove();
    await settle();
    expect(tracker.held().join("\n")).toMatch(/toast/);
    toast.dismiss();
    await pause(350);
    await settle();
    expect(tracker.held()).toEqual([]);
  });
});

describe("reconnection keeps open overlays working", () => {
  it("a moved open modal still closes with Escape and keeps the scroll lock", async () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);
    first.innerHTML = `<minerva-modal open label="Moved"><p>Body</p></minerva-modal>`;
    const modal = first.querySelector("minerva-modal") as HTMLElement & {
      open: boolean;
    };
    await settle();
    expect(document.body.style.overflow).toBe("hidden");
    second.append(modal); // disconnect + connect
    await settle();
    expect(modal.open).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    await settle();
    expect(modal.open).toBe(false);
    await pause(300);
    await settle();
    expect(document.body.style.overflow).toBe("");
  });

  it("a moved virtual list keeps observing its container", async () => {
    const list = create("minerva-virtual-list", false);
    document.body.append(list);
    await settle();
    const before = tracker.counts();
    const host = document.createElement("section");
    document.body.append(host);
    host.append(list);
    await settle();
    expect(tracker.counts()).toEqual(before);
    expect([...before.keys()].join("\n")).toMatch(/ResizeObserver/);
  });
});
