import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "../elements/tabs";
import "../elements/radio";
import "../elements/select";
import {
  getHostAttribute,
  hostSettled,
  isHostDeferred,
  markServerRendered,
  onHostSettled,
  scheduleHostSettle,
  setHostAttribute,
} from "./hydration";
import { settle } from "../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.body.innerHTML = "";
});

/** Creates `el` as if the HTML parser created it during page load. */
function parsed<E extends Element>(create: () => E): E {
  const readyState = vi
    .spyOn(document, "readyState", "get")
    .mockReturnValue("loading");
  try {
    const el = create();
    markServerRendered(el);
    return el;
  } finally {
    readyState.mockRestore();
  }
}

/** Mounts markup as parsed during page load (the elements are deferred). */
async function mountParsed(markup: string) {
  const readyState = vi
    .spyOn(document, "readyState", "get")
    .mockReturnValue("loading");
  document.body.innerHTML = markup;
  readyState.mockRestore();
  // Lit updates only (microtasks): the elements settle after a frame
  for (let i = 0; i < 3; i++) {
    await Promise.all(
      Array.from(
        document.querySelectorAll("*"),
        (el) => (el as { updateComplete?: Promise<unknown> }).updateComplete,
      ),
    );
  }
}

describe("hydration-safe host attributes", () => {
  it("writes at once on elements created by script", () => {
    const el = document.createElement("div");
    markServerRendered(el);
    expect(isHostDeferred(el)).toBe(false);
    setHostAttribute(el, "tabindex", "0");
    setHostAttribute(el, "data-disabled", true);
    expect(el.getAttribute("tabindex")).toBe("0");
    expect(el.getAttribute("data-disabled")).toBe("");
    setHostAttribute(el, "data-disabled", false);
    setHostAttribute(el, "aria-controls", null);
    expect(el.hasAttribute("data-disabled")).toBe(false);
    expect(getHostAttribute(el, "tabindex")).toBe("0");
    const callback = vi.fn();
    expect(onHostSettled(el, callback)).toBe(true);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("defers the writes of server-rendered markup until it settled", async () => {
    const el = parsed(() => document.createElement("div"));
    el.setAttribute("data-remove", "");
    document.body.append(el);
    expect(isHostDeferred(el)).toBe(true);
    setHostAttribute(el, "tabindex", "0");
    setHostAttribute(el, "tabindex", "-1"); // the latest value wins
    setHostAttribute(el, "data-state", true);
    setHostAttribute(el, "data-remove", null);
    expect(el.getAttributeNames()).toEqual(["data-remove"]);
    expect(getHostAttribute(el, "tabindex")).toBe("-1");
    expect(getHostAttribute(el, "data-remove")).toBeNull();
    const seen: Array<string | null> = [];
    expect(
      onHostSettled(el, () => seen.push(el.getAttribute("tabindex"))),
    ).toBe(false);
    await hostSettled();
    // attributes first, then the callbacks
    expect(seen).toEqual(["-1"]);
    expect(el.getAttribute("data-state")).toBe("");
    expect(el.hasAttribute("data-remove")).toBe(false);
    expect(isHostDeferred(el)).toBe(false);
    await expect(hostSettled()).resolves.toBeUndefined();
  });

  it("marks upgraded elements and settles them once connected", async () => {
    const el = document.createElement("div");
    document.body.append(el);
    markServerRendered(el); // constructed while connected: an upgrade
    expect(isHostDeferred(el)).toBe(true);
    scheduleHostSettle(el);
    await hostSettled();
    expect(isHostDeferred(el)).toBe(false);
  });

  it("defers the writes of a deferred owner on its items", async () => {
    const owner = parsed(() => document.createElement("div"));
    const item = document.createElement("span");
    owner.append(item);
    document.body.append(owner);
    setHostAttribute(item, "id", "item-1", owner);
    expect(item.id).toBe("");
    expect(getHostAttribute(item, "id")).toBe("item-1");
    // its own later upgrade keeps the pending writes
    markServerRendered(item);
    await hostSettled();
    expect(item.id).toBe("item-1");
  });

  it("settles after an idle period when the engine has one", async () => {
    const idle = vi.fn((callback: () => void) => setTimeout(callback, 0));
    vi.stubGlobal("requestIdleCallback", idle);
    const el = parsed(() => document.createElement("div"));
    setHostAttribute(el, "data-x", "1");
    await hostSettled();
    expect(idle).toHaveBeenCalledWith(expect.any(Function), { timeout: 200 });
    expect(el.getAttribute("data-x")).toBe("1");
  });

  it("settles without animation frames (no rAF, or a background tab)", async () => {
    vi.stubGlobal("requestAnimationFrame", undefined);
    const el = parsed(() => document.createElement("div"));
    setHostAttribute(el, "data-x", "1");
    await hostSettled();
    expect(el.getAttribute("data-x")).toBe("1");

    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", () => 0); // never fires
    const hidden = parsed(() => document.createElement("div"));
    setHostAttribute(hidden, "data-y", "1");
    vi.advanceTimersByTime(999);
    expect(hidden.hasAttribute("data-y")).toBe(false);
    vi.advanceTimersByTime(1);
    expect(hidden.getAttribute("data-y")).toBe("1");
  });
});

describe("server-rendered composite elements", () => {
  it("tabs: no host attribute of their own before settling, then roving focus", async () => {
    await mountParsed(`<minerva-tabs value="b" label="Letters">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab value="b">B</minerva-tab>
      <minerva-tab value="c" disabled>C</minerva-tab>
      <minerva-tab-panel value="a">Panel a</minerva-tab-panel>
      <minerva-tab-panel value="b">Panel b</minerva-tab-panel>
      <minerva-tab-panel value="c"><template><p>Lazy c</p></template></minerva-tab-panel>
    </minerva-tabs>`);
    const tabs = Array.from(document.querySelectorAll("minerva-tab"));
    const panels = Array.from(document.querySelectorAll("minerva-tab-panel"));
    for (const el of [...tabs, ...panels]) {
      expect(el.getAttributeNames()).not.toEqual(
        expect.arrayContaining(["tabindex"]),
      );
      expect(el.id).toBe("");
      expect(el.hasAttribute("data-state")).toBe(false);
    }
    expect(tabs[0].hasAttribute("slot")).toBe(false);
    expect(panels[0].hidden).toBe(false);
    // inactive panels hide their content meanwhile
    expect(panels[0].shadowRoot!.querySelector(".panel")).toHaveAttribute(
      "hidden",
    );
    expect(panels[1].shadowRoot!.querySelector(".panel")).not.toHaveAttribute(
      "hidden",
    );

    await hostSettled();
    await settle();
    expect(tabs[1]).toHaveAttribute("tabindex", "0");
    expect(tabs[0]).toHaveAttribute("tabindex", "-1");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-controls", panels[1].id);
    expect(tabs[1]).toHaveAttribute("data-state", "active");
    expect(tabs[0].slot).toBe("tab");
    expect(panels[1]).toHaveAttribute("aria-labelledby", tabs[1].id);
    expect(panels[0].hidden).toBe(true);
    expect(panels[0].shadowRoot!.querySelector(".panel")).not.toHaveAttribute(
      "hidden",
    );

    const user = userEvent.setup();
    await user.tab();
    expect(tabs[1]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tabs[0]).toHaveFocus(); // skips the disabled tab, wraps
    await settle();
    expect(tabs[0]).toHaveAttribute("data-state", "active");
    expect(panels[2].querySelector("p")).toBeNull();
  });

  it("radios and options: roving tabindex, descriptions and states once settled", async () => {
    await mountParsed(`<minerva-radio-group label="Plan" value="pro">
      <minerva-radio value="free">Free</minerva-radio>
      <minerva-radio value="pro">Pro</minerva-radio>
    </minerva-radio-group>
    <minerva-radio id="solo" value="solo" helper-text="On its own">Solo</minerva-radio>
    <minerva-select aria-label="Fruit" value="b">
      <minerva-option-group>
        <minerva-select-label>Fruits</minerva-select-label>
        <minerva-option value="a">Apple</minerva-option>
        <minerva-option value="b">Banana</minerva-option>
      </minerva-option-group>
    </minerva-select>`);
    const [free, pro] = Array.from(
      document.querySelectorAll("minerva-radio-group minerva-radio"),
    );
    const solo = document.getElementById("solo")!;
    const banana = document.querySelector('minerva-option[value="b"]')!;
    const group = document.querySelector("minerva-option-group")!;
    expect(pro.hasAttribute("tabindex")).toBe(false);
    expect(solo.hasAttribute("tabindex")).toBe(false);
    expect(solo.hasAttribute("aria-description")).toBe(false);
    expect(banana.hasAttribute("data-state")).toBe(false);
    expect(group.hasAttribute("aria-labelledby")).toBe(false);

    await hostSettled();
    await settle();
    expect(pro).toHaveAttribute("tabindex", "0");
    expect(free).toHaveAttribute("tabindex", "-1");
    expect(pro).toHaveAttribute("aria-checked", "true");
    expect(solo).toHaveAttribute("tabindex", "0");
    expect(solo).toHaveAttribute("aria-description", "On its own");
    expect(banana).toHaveAttribute("data-state", "checked");
    expect(group).toHaveAttribute(
      "aria-labelledby",
      document.querySelector("minerva-select-label")!.id,
    );

    const user = userEvent.setup();
    await user.click(pro);
    await user.keyboard("{ArrowUp}");
    await settle();
    expect(free).toHaveFocus();
    expect(free).toHaveAttribute("aria-checked", "true");
  });
});
