import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { autoComplete, cascader, tagInput, keyValueEditor } from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
});
function mount(c: typeof autoComplete, props: Record<string, unknown> = {}) {
  const id = simulate.load({
    tagName: "advanced-field",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("autocomplete supports instance filters/groups/sort while preserving numeric option identity and controlled text", async () => {
  const w = mount(autoComplete, {
    value: "unmatched",
    options: [
      { value: 2, label: "Beta", group: "People" },
      { value: 1, label: "Alpha", group: "People" },
      { value: 3, label: "Locked", disabled: true },
    ],
  });
  const selected: unknown[] = [],
    changed: unknown[] = [];
  w.addEventListener("select", (e) => selected.push(e.detail));
  w.addEventListener("change", (e) => changed.push(e.detail));
  const filter = vi.fn(() => true);
  w.instance.configure({
    filterOption: filter,
    groupBy: (o: { group?: string }) => o.group ?? "Other",
    sortOption: (a: { label: string }, b: { label: string }) =>
      a.label.localeCompare(b.label),
  });
  w.querySelector(".mn-input")!.dispatchEvent("focus");
  await tick();
  expect(w.dom!.textContent).toContain("People");
  expect(
    w.querySelectorAll(".mn-option").map((o) => o.dom!.textContent),
  ).toEqual(["Alpha", "Beta", "Locked"]);
  w.querySelectorAll(".mn-option")[0].dispatchEvent("tap");
  await tick();
  expect(changed).toEqual([{ value: "Alpha" }]);
  expect(selected).toEqual([
    { value: 1, option: { value: 1, label: "Alpha", group: "People" } },
  ]);
  expect(w.instance.data.value).toBe("unmatched");
  expect(filter).toHaveBeenCalled();
});
it("cascader separates browsing from controlled selected path and searches enabled leaves", async () => {
  const options = [
    {
      value: 1,
      label: "China",
      children: [
        { value: 2, label: "Shanghai" },
        { value: 3, label: "Beijing" },
      ],
    },
    {
      value: 9,
      label: "Blocked",
      disabled: true,
      children: [{ value: 10, label: "Shanghai locked" }],
    },
  ];
  const w = mount(cascader, {
    options,
    value: [1, 2],
    showSearch: true,
    changeOnSelect: true,
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelectorAll(".mn-option")[3].dispatchEvent("tap");
  await tick();
  expect(w.instance.data.value).toEqual([1, 2]);
  expect(w.instance.data.path).toEqual([1, 2]);
  expect(events).toEqual([
    { value: [1, 3], selectedOptions: [options[0], options[0].children[1]] },
  ]);
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "Shanghai" },
  });
  await tick();
  expect(w.querySelectorAll(".mn-search-result")).toHaveLength(1);
  expect(w.dom!.textContent).toContain("China / Shanghai");
});
it("cascader browsing a rejected intermediate selection does not overwrite the committed owner path", async () => {
  const w = mount(cascader, {
    value: [],
    changeOnSelect: true,
    options: [
      { value: "a", label: "A", children: [{ value: "b", label: "B" }] },
    ],
  });
  w.querySelector(".mn-option")!.dispatchEvent("tap");
  await tick();
  expect(w.instance.data.path).toEqual([]);
  expect(w.instance.data.browsePath).toEqual(["a"]);
  expect(w.querySelectorAll(".mn-cascader-level")).toHaveLength(2);
  w.setData({ value: ["a", "b"] });
  await tick();
  expect(w.instance.data.path).toEqual(["a", "b"]);
});
it("tag input splits native pasted input on configured separators, deduplicates and respects owner rejection", async () => {
  const w = mount(tagInput, { value: ["alpha"], separators: [",", "Enter"] });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "beta,alpha\ngamma," },
  });
  await tick();
  expect(events).toEqual([{ value: ["alpha", "beta", "gamma"] }]);
  expect(w.instance.data.value).toEqual(["alpha"]);
  expect(w.instance.data.draft).toBe("");
});
it("tag suggestions exclude selected duplicates, commit blur, clear all and guard readonly", async () => {
  const w = mount(tagInput, {
    value: ["alpha"],
    options: ["alpha", "beta", "beta", "gamma"],
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("focus");
  await tick();
  expect(w.querySelectorAll(".mn-suggestion")).toHaveLength(2);
  w.querySelector(".mn-suggestion")!.dispatchEvent("tap");
  await tick();
  expect(events.pop()).toEqual({ value: ["alpha", "beta"] });
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "delta" },
  });
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await tick();
  expect(events.pop()).toEqual({ value: ["alpha", "delta"] });
  w.querySelector(".mn-clear")!.dispatchEvent("tap");
  await tick();
  expect(events.pop()).toEqual({ value: [] });
  w.setData({ readOnly: true });
  w.querySelector(".mn-clear")!.dispatchEvent("tap");
  await tick();
  expect(events).toEqual([]);
});
it("key value object input normalizes stable ids and entry errors are keyed by id across reorder", async () => {
  const w = mount(keyValueEditor, {
    value: { Accept: "json", Token: "secret" },
  });
  expect(w.instance.data.rows.map((r: { key: string }) => r.key)).toEqual([
    "Accept",
    "Token",
  ]);
  const first = w.instance.data.rows[0];
  expect(first.id).toEqual(expect.any(String));
  w.setData({ value: { Token: "new", Accept: "xml" } });
  await tick();
  expect(w.instance.data.rows[1].id).toBe(first.id);
  const rows = [
    { id: "token", key: "Token", value: "secret" },
    { id: "accept", key: "Accept", value: "json" },
  ];
  w.setData({
    entries: rows,
    errors: { accept: { key: "Duplicate", value: "Required" } },
  });
  await tick();
  expect(w.querySelectorAll(".mn-row")[1].dom!.textContent).toContain(
    "Duplicate",
  );
  expect(w.querySelectorAll(".mn-row")[1].dom!.textContent).toContain(
    "Required",
  );
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.querySelectorAll(".mn-input")[2].dispatchEvent("input", {
    detail: { value: "Accept-2" },
  });
  await tick();
  expect(changes).toEqual([
    {
      value: [rows[0], { ...rows[1], key: "Accept-2" }],
      entries: [rows[0], { ...rows[1], key: "Accept-2" }],
    },
  ]);
  expect(w.instance.data.rows[1].key).toBe("Accept");
});
it("suggestion pointer activation does not commit a partial draft on blur before selecting", async () => {
  const w = mount(tagInput, { value: ["alpha"], options: ["beta"] });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "be" },
  });
  await tick();
  const suggestion = w.querySelector(".mn-suggestion")!;
  suggestion.dispatchEvent("touchstart");
  await tick();
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await tick();
  suggestion.dispatchEvent("tap");
  await tick();
  expect(events).toEqual([{ value: ["alpha", "beta"] }]);
});
it("native tag paste method preserves insertion selection, literal separator tails, and Enter opt-out", async () => {
  const w = mount(tagInput, { defaultValue: ["base"], separators: [";"] });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "one;two" },
  });
  await tick();
  expect(w.instance.data.tags).toEqual(["base", "one"]);
  expect(w.instance.data.draft).toBe("two");
  w.querySelector(".mn-input")!.dispatchEvent("confirm");
  await tick();
  expect(w.instance.data.tags).toEqual(["base", "one"]);
  w.instance.paste("three;four", 0, 3);
  await tick();
  expect(w.instance.data.tags).toEqual(["base", "one", "three", "four"]);
  expect(events).toHaveLength(2);
});
it("clear pointer action discards the draft without blur submitting it first", async () => {
  const w = mount(tagInput, { value: ["alpha"] });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "uncommitted" },
  });
  await tick();
  const clear = w.querySelector(".mn-clear")!;
  clear.dispatchEvent("touchstart");
  await tick();
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await tick();
  clear.dispatchEvent("tap");
  await tick();
  expect(events).toEqual([{ value: [] }]);
  expect(w.instance.data.draft).toBe("");
});
