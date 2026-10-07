import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaTab, MinervaTabPanel, MinervaTabs } from "./tabs";
import "../../elements/tabs";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const basic = (
  attrs = "",
  { disabled = [] as string[], value = "a" } = {},
) => `<minerva-tabs value="${value}" label="Letters" ${attrs}>
  ${["a", "b", "c", "d"]
    .map(
      (v) =>
        `<minerva-tab value="${v}"${disabled.includes(v) ? " disabled" : ""}>${v.toUpperCase()}</minerva-tab>`,
    )
    .join("")}
  ${["a", "b", "c", "d"].map((v) => `<minerva-tab-panel value="${v}">Panel ${v}</minerva-tab-panel>`).join("")}
</minerva-tabs>`;

const tab = (name: string) =>
  Array.from(document.querySelectorAll<MinervaTab>("minerva-tab")).find(
    (t) => t.textContent === name,
  )!;
const selectedName = () =>
  document.querySelector('minerva-tab[aria-selected="true"]')?.textContent;
const visiblePanels = () =>
  Array.from(
    document.querySelectorAll<MinervaTabPanel>("minerva-tab-panel"),
  ).filter((p) => !p.hidden);

describe("<minerva-tabs>", () => {
  it("registers the three elements", () => {
    expect(customElements.get("minerva-tabs")).toBe(MinervaTabs);
    expect(customElements.get("minerva-tab")).toBe(MinervaTab);
    expect(customElements.get("minerva-tab-panel")).toBe(MinervaTabPanel);
  });

  it("wires tablist, tabs and panels accessibly", async () => {
    const el = await mount<MinervaTabs>(basic());
    const list = $(el, '[role="tablist"]');
    expect(list).toHaveAttribute("aria-label", "Letters");
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    const a = tab("A");
    const panelA = document.querySelector<MinervaTabPanel>(
      'minerva-tab-panel[value="a"]',
    )!;
    expect(a).toHaveAttribute("role", "tab");
    expect(a.slot).toBe("tab");
    expect(a).toHaveAttribute("aria-selected", "true");
    expect(tab("B")).toHaveAttribute("aria-selected", "false");
    expect(a.getAttribute("aria-controls")).toBe(panelA.id);
    expect(panelA).toHaveAttribute("role", "tabpanel");
    expect(panelA.getAttribute("aria-labelledby")).toBe(a.id);
    expect(panelA).toHaveAttribute("tabindex", "0");
    expect(document.getElementById(a.getAttribute("aria-controls")!)).toBe(
      panelA,
    );
    expect(visiblePanels()).toEqual([panelA]);
    expect(a).toHaveAttribute("data-state", "active");
    expect(panelA).toHaveAttribute("data-state", "active");
  });

  it("renders lib-core's classes for variant, color and orientation", async () => {
    const el = await mount<MinervaTabs>(basic());
    expect($(el, ".tabs").classList).toContain("primary");
    expect($(el, '[role="tablist"]').classList).toContain("lineList");
    expect($(tab("A"), ".trigger").classList).toContain("lineTrigger");
    el.variant = "pills";
    el.color = "success";
    el.orientation = "vertical";
    await settle();
    expect(el.getAttribute("variant")).toBe("pills");
    expect($(el, ".tabs").classList).toContain("success");
    expect($(el, ".tabs").classList).toContain("vertical");
    expect($(el, '[role="tablist"]').classList).toContain("pillsList");
    expect($(el, '[role="tablist"]').classList).toContain("verticalList");
    expect($(tab("A"), ".trigger").classList).toContain("pillsTrigger");
    expect($(tab("A"), ".trigger").classList).toContain("verticalTrigger");
    expect(tab("A")).toHaveAttribute("data-orientation", "vertical");
  });

  it("applies per-tab semantic colors", async () => {
    await mount(`<minerva-tabs value="a">
      <minerva-tab value="a" color="danger">A</minerva-tab>
      <minerva-tab value="b">B</minerva-tab></minerva-tabs>`);
    expect($(tab("A"), ".trigger").classList).toContain("danger");
    expect($(tab("A"), ".trigger").classList).toContain("colored");
    expect($(tab("B"), ".trigger").classList).not.toContain("colored");
  });

  it("switches panels on click and reports the value", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaTabs>(basic());
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail),
    );
    await user.click(tab("C"));
    await settle();
    expect(onChange).toHaveBeenCalledWith({ value: "c" });
    expect(el.value).toBe("c");
    expect(el.getAttribute("value")).toBe("c");
    expect(selectedName()).toBe("C");
    expect(visiblePanels().map((p) => p.value)).toEqual(["c"]);
  });

  it("does not select a disabled tab on click", async () => {
    const el = await mount<MinervaTabs>(basic("", { disabled: ["b"] }));
    tab("B").dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, button: 0 }),
    );
    tab("B").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await settle();
    expect(el.value).toBe("a");
    expect(tab("B")).toHaveAttribute("aria-disabled", "true");
    expect(tab("B")).toHaveAttribute("data-disabled", "");
    expect(tab("A")).not.toHaveAttribute("data-disabled");
  });

  it("keeps the selection when minerva-change is canceled (controlled)", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaTabs>(basic());
    el.addEventListener("minerva-change", (e) => e.preventDefault());
    await user.click(tab("B"));
    await settle();
    expect(el.value).toBe("a");
    expect(selectedName()).toBe("A");
    // the parent applies it later
    el.value = "b";
    await settle();
    expect(selectedName()).toBe("B");
  });

  it("does not emit when the value is set programmatically", async () => {
    const el = await mount<MinervaTabs>(basic());
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.value = "d";
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(visiblePanels().map((p) => p.value)).toEqual(["d"]);
  });

  it("warns in development when value matches no tab", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(basic("", { value: "zzz" }));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"zzz"'));
  });

  it("keeps user ids and handles tabs added later", async () => {
    const el = await mount<MinervaTabs>(`<minerva-tabs value="x">
      <minerva-tab value="x" id="my-tab">X</minerva-tab>
      <minerva-tab-panel value="x" id="my-panel">X</minerva-tab-panel>
    </minerva-tabs>`);
    expect(tab("X")).toHaveAttribute("aria-controls", "my-panel");
    const extra = document.createElement("minerva-tab");
    extra.value = "y";
    extra.textContent = "Y";
    el.append(extra);
    await settle();
    expect(extra.slot).toBe("tab");
    expect(extra).toHaveAttribute("aria-selected", "false");
    expect(extra).toHaveAttribute("tabindex", "-1");
  });
});

describe("<minerva-tabs> keyboard, focus and accessibility", () => {
  it("moves with ArrowRight / ArrowLeft horizontally and ignores Up / Down", async () => {
    const user = userEvent.setup();
    await mount(basic());
    await user.tab();
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowUp}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    await settle();
    expect(selectedName()).toBe("A");
  });

  it("moves with ArrowDown / ArrowUp vertically and ignores Left / Right", async () => {
    const user = userEvent.setup();
    await mount(basic('orientation="vertical"'));
    tab("A").focus();
    await user.keyboard("{ArrowDown}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowLeft}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(tab("A")).toHaveFocus();
  });

  it("swaps Left / Right in RTL (dir on the element or an ancestor)", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaTabs>(basic('dir="rtl"'));
    tab("A").focus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
    // direction changes are picked up on the next key
    el.removeAttribute("dir");
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
  });

  it("Home / End jump to the first / last enabled tab", async () => {
    const user = userEvent.setup();
    await mount(basic("", { disabled: ["a", "d"], value: "b" }));
    await user.tab();
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{End}");
    expect(tab("C")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("B")).toHaveFocus();
  });

  it("wraps by default and stops at the ends with no-loop", async () => {
    const user = userEvent.setup();
    await mount(basic());
    tab("A").focus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("D")).toHaveFocus();

    await mount(basic("no-loop"));
    tab("A").focus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{End}{ArrowRight}");
    expect(tab("D")).toHaveFocus();
  });

  it("skips disabled tabs in both directions", async () => {
    const user = userEvent.setup();
    await mount(basic("", { disabled: ["b", "c"] }));
    tab("A").focus();
    await user.keyboard("{ArrowRight}");
    expect(tab("D")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
  });

  it("automatic activation selects the focused tab", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaTabs>(basic());
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail.value),
    );
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("b");
    await settle();
    expect(selectedName()).toBe("B");
    expect(visiblePanels()[0]).toHaveTextContent("Panel b");
  });

  it("manual activation moves focus only; Enter / Space / click select", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaTabs>(basic('activation-mode="manual"'));
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail.value),
    );
    tab("A").focus();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    await settle();
    expect(selectedName()).toBe("A");
    expect(onChange).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    await settle();
    expect(selectedName()).toBe("B");
    await user.keyboard("{ArrowRight}");
    await user.keyboard(" ");
    await settle();
    expect(selectedName()).toBe("C");
    await user.click(tab("D"));
    await settle();
    expect(selectedName()).toBe("D");
    expect(onChange.mock.calls).toEqual([["b"], ["c"], ["d"]]);
  });

  it("selects on primary mouse down only (not right / ctrl click)", async () => {
    const el = await mount<MinervaTabs>(basic('activation-mode="manual"'));
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    const down = (init: MouseEventInit) =>
      tab("B").dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, ...init }),
      );
    down({ button: 2 });
    down({ button: 0, ctrlKey: true });
    expect(onChange).not.toHaveBeenCalled();
    down({ button: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("selects on an assistive-technology click (no mouse down)", async () => {
    await mount(basic('activation-mode="manual"'));
    tab("C").dispatchEvent(
      new MouseEvent("click", { bubbles: true, detail: 0 }),
    );
    await settle();
    expect(selectedName()).toBe("C");
  });

  it("lets consumers cancel built-in key handling with preventDefault", async () => {
    const user = userEvent.setup();
    await mount(basic());
    tab("A").addEventListener("keydown", (e) => e.preventDefault());
    tab("A").focus();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
  });

  it("roves tabindex: only the selected tab, else the first enabled tab, is tabbable", async () => {
    const el = await mount<MinervaTabs>(basic("", { value: "c" }));
    const tabindexes = () =>
      ["A", "B", "C", "D"].map((n) => tab(n).getAttribute("tabindex"));
    expect(tabindexes()).toEqual(["-1", "-1", "0", "-1"]);
    el.value = "b";
    await settle();
    expect(tabindexes()).toEqual(["-1", "0", "-1", "-1"]);

    await mount(basic("", { value: "a", disabled: ["a"] }));
    expect(tabindexes()).toEqual(["-1", "0", "-1", "-1"]);
  });

  it("updates the fallback tab stop when tabs are (un)disabled later", async () => {
    await mount(basic("", { value: "a" }));
    tab("A").disabled = true;
    await settle();
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    tab("A").disabled = false;
    await settle();
    expect(tab("A")).toHaveAttribute("tabindex", "0");
  });

  it("isolates nested tabs: own selection, ids and keyboard", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-tabs value="a" id="outer">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab value="b">B</minerva-tab>
      <minerva-tab-panel value="a">
        <minerva-tabs value="x" id="inner">
          <minerva-tab value="x">X</minerva-tab>
          <minerva-tab value="y">Y</minerva-tab>
          <minerva-tab-panel value="x">PX</minerva-tab-panel>
          <minerva-tab-panel value="y">PY</minerva-tab-panel>
        </minerva-tabs>
      </minerva-tab-panel>
      <minerva-tab-panel value="b">PB</minerva-tab-panel>
    </minerva-tabs>`);
    const outer = document.getElementById("outer") as MinervaTabs;
    const inner = document.getElementById("inner") as MinervaTabs;
    expect(outer.tabs.map((t) => t.value)).toEqual(["a", "b"]);
    expect(inner.tabs.map((t) => t.value)).toEqual(["x", "y"]);
    expect(tab("X").id).not.toBe(tab("A").id);
    tab("X").focus();
    await user.keyboard("{ArrowRight}");
    expect(tab("Y")).toHaveFocus();
    await settle();
    expect(inner.value).toBe("y");
    expect(outer.value).toBe("a");
  });

  it("arrow keys inside a panel do not move the tabs", async () => {
    const user = userEvent.setup();
    await mount(`<minerva-tabs value="a">
      <minerva-tab value="a">A</minerva-tab>
      <minerva-tab value="b">B</minerva-tab>
      <minerva-tab-panel value="a"><input id="field" /></minerva-tab-panel>
    </minerva-tabs>`);
    const input = document.getElementById("field") as HTMLInputElement;
    input.focus();
    await user.keyboard("{ArrowRight}");
    expect(input).toHaveFocus();
  });
});

describe("<minerva-tab-panel> inactive panels (React's unmount / forceMount)", () => {
  const lazy = (attrs = "") => `<minerva-tabs value="a" label="Lazy">
    <minerva-tab value="a">A</minerva-tab><minerva-tab value="b">B</minerva-tab>
    <minerva-tab-panel value="a"><template><input id="field-a" name="a" /></template></minerva-tab-panel>
    <minerva-tab-panel value="b" ${attrs}><template><input id="field-b" name="b" /></template></minerva-tab-panel>
    <minerva-tab-panel value="c"><p id="plain">always mounted</p></minerva-tab-panel>
  </minerva-tabs>`;
  const field = (id: string) => document.getElementById(id);

  it("regular children stay mounted and hidden (React's forceMount)", async () => {
    await mount(lazy());
    const plain = field("plain")!;
    expect(plain.isConnected).toBe(true);
    expect(plain.closest("minerva-tab-panel")!.hidden).toBe(true);
    expect(plain.closest("minerva-tab-panel")!.getAttribute("data-state")).toBe(
      "inactive",
    );
  });

  it("<template> content is mounted only while active (React's default)", async () => {
    const tabs = await mount<MinervaTabs>(lazy());
    expect(field("field-a")).not.toBeNull();
    expect(field("field-b")).toBeNull();
    const a = field("field-a") as HTMLInputElement;
    a.value = "typed";
    tabs.value = "b";
    await settle();
    // unmounted: state reset, nothing left to submit
    expect(a.isConnected).toBe(false);
    expect(field("field-a")).toBeNull();
    expect(field("field-b")).not.toBeNull();
    tabs.value = "a";
    await settle();
    expect((field("field-a") as HTMLInputElement).value).toBe("");
    expect(field("field-b")).toBeNull();
    // the template itself stays for the next activation
    expect(
      document.querySelectorAll("minerva-tab-panel template"),
    ).toHaveLength(2);
  });

  it("force-mount mounts the template content while inactive (hidden), like forceMount", async () => {
    const tabs = await mount<MinervaTabs>(lazy("force-mount"));
    const panelB = document.querySelector<MinervaTabPanel>(
      'minerva-tab-panel[value="b"]',
    )!;
    expect(panelB.forceMount).toBe(true);
    const b = field("field-b") as HTMLInputElement;
    expect(b).not.toBeNull();
    expect(panelB.hidden).toBe(true);
    b.value = "kept";
    tabs.value = "b";
    await settle();
    tabs.value = "a";
    await settle();
    expect(field("field-b")).toBe(b);
    expect(b.value).toBe("kept");
    // turning it off unmounts the inactive content
    panelB.forceMount = false;
    await settle();
    expect(field("field-b")).toBeNull();
  });
});
