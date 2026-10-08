import { afterEach, describe, expect, it, vi } from "vitest";
import "../elements/button";
import type { MinervaButton } from "../components/button/button";
import { attachInternals } from "./internals";
import {
  customStateNames,
  customStates,
  itemParts,
  setCustomStates,
} from "./styling-hooks";
import { settle } from "../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

/** A custom element with fake internals (`states` behaving as given) */
function fakeElement(states: unknown): HTMLElement {
  const el = document.createElement("div");
  Object.defineProperty(el, "attachInternals", {
    value: () => ({ states }),
  });
  return el;
}

describe("customStateNames", () => {
  it("maps the vocabulary to custom state names", () => {
    expect([
      ...customStateNames({
        state: "open",
        disabled: true,
        loading: false,
        size: "small",
        color: undefined,
        shape: null,
        variant: 0,
      }),
    ]).toEqual(["open", "disabled", "size-small", "variant-0"]);
  });
});

describe("itemParts", () => {
  it("adds a <part>--<state> part name per item state", () => {
    expect(
      itemParts("item", {
        highlighted: true,
        disabled: false,
        state: "checked",
        status: "error",
      }),
    ).toBe("item item--highlighted item--checked item--status-error");
    expect(itemParts("row", {})).toBe("row");
  });
});

describe("setCustomStates", () => {
  it("adds the new states and removes the old ones", () => {
    const set = new Set<string>();
    const el = fakeElement(set);
    setCustomStates(el, { state: "open", disabled: true });
    expect([...set]).toEqual(["open", "disabled"]);
    setCustomStates(el, { state: "closed", disabled: false });
    expect([...set]).toEqual(["closed"]);
    expect([...customStates(el)]).toEqual(["closed"]);
  });

  it("falls back to the legacy dashed syntax (Chromium < 125)", () => {
    const set = new Set<string>();
    const legacy = {
      add(name: string) {
        if (!name.startsWith("--")) throw new DOMException("SyntaxError");
        set.add(name);
      },
      delete: (name: string) => set.delete(name),
    };
    const el = fakeElement(legacy);
    setCustomStates(el, { state: "open", size: "large" });
    expect([...set]).toEqual(["--open", "--size-large"]);
    setCustomStates(el, { size: "large" });
    expect([...set]).toEqual(["--size-large"]);
  });

  it("skips names an engine refuses", () => {
    const el = fakeElement({
      add() {
        throw new DOMException("SyntaxError");
      },
      delete() {},
    });
    expect(() => setCustomStates(el, { state: "open" })).not.toThrow();
    expect([...customStates(el)]).toEqual(["open"]);
  });

  it("records the states where CustomStateSet is missing", () => {
    const el = fakeElement(undefined);
    setCustomStates(el, { loading: true });
    expect([...customStates(el)]).toEqual(["loading"]);
    expect([...customStates(document.createElement("span"))]).toEqual([]);
  });
});

describe("attachInternals", () => {
  it("attaches once and returns the same internals to every caller", () => {
    const attach = vi.fn(() => ({ states: new Set() }));
    const el = document.createElement("div");
    Object.defineProperty(el, "attachInternals", { value: attach });
    expect(attachInternals(el)).toBe(attachInternals(el));
    expect(attach).toHaveBeenCalledTimes(1);
  });

  it("returns null when attaching throws or is unsupported", () => {
    const el = document.createElement("div");
    Object.defineProperty(el, "attachInternals", {
      value: () => {
        throw new DOMException("NotSupportedError");
      },
    });
    expect(attachInternals(el)).toBeNull();
    const plain = document.createElement("div");
    Object.defineProperty(plain, "attachInternals", { value: undefined });
    expect(attachInternals(plain)).toBeNull();
  });
});

describe("element state hooks", () => {
  it("reflect the properties as custom states, without host attributes", async () => {
    document.body.innerHTML = `<minerva-button size="small">Save</minerva-button>`;
    await settle();
    const el = document.querySelector("minerva-button") as MinervaButton;
    expect([...customStates(el)].sort()).toEqual(
      ["color-primary", "inactive", "size-small", "variant-solid"].sort(),
    );
    el.loading = true;
    el.disabled = true;
    await settle();
    expect(customStates(el).has("loading")).toBe(true);
    expect(customStates(el).has("disabled")).toBe(true);
    expect(el.getAttributeNames().filter((n) => n.startsWith("state"))).toEqual(
      [],
    );
  });
});
