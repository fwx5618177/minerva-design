/// <reference types="vite/client" />
import { describe, expect, it } from "vitest";
import {
  BOOLEAN_STATES,
  KEYED_STATES,
  NON_VISUAL_ELEMENTS,
  STABILITY_POLICY,
  STATE_VALUES,
  customStateName,
  hookSurface,
  itemPartName,
  reactSelector,
  reactStateSelector,
  stylingHooks,
  wcItemParts,
  wcSelector,
  wcStateSelector,
  type ComponentHookSpec,
  type ComponentStateSpec,
} from "./index";

const manifest = stylingHooks as Record<string, ComponentHookSpec>;
const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const STATE_KEYS = ["state", ...BOOLEAN_STATES, ...KEYED_STATES] as string[];

/** Keys and values of a component / item state spec use the vocabulary */
function expectVocabulary(states: ComponentStateSpec) {
  for (const [key, value] of Object.entries(states)) {
    expect(STATE_KEYS).toContain(key);
    if (key === "state") {
      expect((value as string[]).length).toBeGreaterThan(0);
      for (const v of value as string[]) expect(STATE_VALUES).toContain(v);
    } else if ((BOOLEAN_STATES as readonly string[]).includes(key)) {
      expect(value).toBe(true);
    } else {
      expect((value as string[]).length).toBeGreaterThan(0);
      for (const v of value as string[]) expect(v).toMatch(KEBAB);
    }
  }
}

describe("styling hooks manifest", () => {
  it("lists every component module", () => {
    const files = Object.keys(import.meta.glob("./components/*.ts"))
      .map((file) => file.replace(/^.*\/|\.ts$/g, ""))
      .sort();
    expect(Object.keys(manifest).sort()).toEqual(files);
  });

  describe.each(Object.keys(manifest))("%s", (name) => {
    const spec = manifest[name];

    it("is named and described", () => {
      expect(name).toMatch(KEBAB);
      expect(spec.description).not.toMatch(/^(TODO)?$/);
      if (spec.wc !== null) expect(spec.wc).toBe(`minerva-${name}`);
      expect(spec.react.length + (spec.wc ? 1 : 0)).toBeGreaterThan(0);
      for (const exported of spec.react) expect(exported).toMatch(/^[A-Z]/);
    });

    it("declares described, kebab-case parts", () => {
      expect(Object.keys(spec.parts).length).toBeGreaterThan(0);
      for (const [part, partSpec] of Object.entries(spec.parts)) {
        expect(part).toMatch(KEBAB);
        expect(partSpec.description.trim()).not.toBe("");
        if (partSpec.only) expect(["react", "wc"]).toContain(partSpec.only);
      }
    });

    it("uses the state vocabulary", () => {
      expectVocabulary(spec.states);
    });

    it("declares item states with the vocabulary", () => {
      for (const [part, partSpec] of Object.entries(spec.parts)) {
        if (!partSpec.itemStates) continue;
        expect(Object.keys(partSpec.itemStates).length, part).toBeGreaterThan(
          0,
        );
        expectVocabulary(partSpec.itemStates);
        // a key is either a component state or an item state of the part
        for (const key of partSpec.states ?? []) {
          expect(Object.keys(partSpec.itemStates), part).not.toContain(key);
        }
        // part names are kebab-case (no "--"): `<part>--<state>` names
        // never collide with a part
      }
    });

    it("renders every state on a part", () => {
      const keys = Object.keys(spec.states);
      for (const partSpec of Object.values(spec.parts)) {
        for (const key of partSpec.states ?? []) expect(keys).toContain(key);
      }
      if (spec.parts.root && !spec.parts.root.states) return;
      const carried = new Set(
        Object.values(spec.parts).flatMap((part) => part.states ?? []),
      );
      for (const key of keys) expect(carried).toContain(key);
    });
  });

  it("never lists a non-visual element", () => {
    const tags = Object.values(manifest).map((spec) => spec.wc);
    for (const tag of NON_VISUAL_ELEMENTS) expect(tags).not.toContain(tag);
  });
});

describe("selectors", () => {
  it("builds React selectors", () => {
    expect(reactSelector("button")).toBe('[data-minerva="button"]');
    expect(reactSelector("button", "label")).toBe(
      '[data-minerva="button"][data-part="label"]',
    );
    expect(
      reactSelector("modal", "content", { state: "open", size: "large" }),
    ).toBe(
      '[data-minerva="modal"][data-part="content"][data-state="open"][data-size="large"]',
    );
    expect(reactStateSelector({ disabled: true, loading: true })).toBe(
      "[data-disabled][data-loading]",
    );
  });

  it("builds web component selectors", () => {
    expect(wcSelector("button")).toBe("minerva-button");
    expect(wcSelector("button", "label", { loading: true })).toBe(
      "minerva-button:state(loading)::part(label)",
    );
    expect(wcSelector("unknown-thing")).toBe("minerva-unknown-thing");
    expect(wcStateSelector({ state: "open", size: "small" })).toBe(
      ":state(open):state(size-small)",
    );
  });

  it("builds item state selectors", () => {
    expect(
      reactSelector("menu", "item", undefined, { highlighted: true }),
    ).toBe('[data-minerva="menu"][data-part="item"][data-highlighted]');
    expect(
      reactSelector("data-table", "header-cell", {}, { sort: "ascending" }),
    ).toBe(
      '[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"]',
    );
    expect(wcSelector("menu", "item", undefined, { highlighted: true })).toBe(
      "minerva-menu::part(item item--highlighted)",
    );
    expect(
      wcSelector("menu", "item", { state: "open" }, { state: "checked" }),
    ).toBe("minerva-menu:state(open)::part(item item--checked)");
    expect(wcItemParts("item", { disabled: true, status: "error" })).toBe(
      "item item--disabled item--status-error",
    );
    expect(wcItemParts("row")).toBe("row");
    expect(itemPartName("header-cell", "sort", "descending")).toBe(
      "header-cell--sort-descending",
    );
  });

  it("maps states to custom state names", () => {
    expect(customStateName("state", "checked")).toBe("checked");
    expect(customStateName("disabled")).toBe("disabled");
    expect(customStateName("variant", "ghost")).toBe("variant-ghost");
  });
});

describe("hook surface lock", () => {
  it("matches styling-hooks.lock.json (update deliberately: pnpm hooks:lock)", async () => {
    const lock = {
      $schema: "Minerva public styling hooks (React + web components)",
      policy: STABILITY_POLICY,
      components: hookSurface(),
    };
    await expect(`${JSON.stringify(lock, null, 2)}\n`).toMatchFileSnapshot(
      "../../styling-hooks.lock.json",
    );
  });
});
