import { mount, type VueWrapper } from "@vue/test-utils";
import { h, type Component } from "vue";
import { describe, expect, it, vi } from "vitest";
import AutoComplete from "./AutoComplete.vue";
import Cascader from "./Cascader.vue";
import TagInput from "./TagInput.vue";
import KeyValueEditor from "./KeyValueEditor.vue";
import FormControl from "./FormControl.vue";

const choices = [
  { value: 1, label: "Apple", group: "Fruit", description: "Fresh" },
  { value: 2, label: "Blocked", group: "Other", disabled: true },
  { value: 3, label: "Apricot", group: "Fruit" },
];
const tree = [
  {
    value: 1,
    label: "Asia",
    children: [
      { value: 11, label: "Tokyo" },
      { value: 12, label: "Seoul" },
    ],
  },
  { value: 2, label: "Europe", children: [{ value: 21, label: "Paris" }] },
  {
    value: 3,
    label: "Hidden",
    disabled: true,
    children: [{ value: 31, label: "Tokyo hidden" }],
  },
];
const input = (wrapper: ReturnType<typeof mount>, value: string) =>
  wrapper.find("input").trigger("input", { detail: { value } });
const tap = async (wrapper: ReturnType<typeof mount>, label: string) => {
  const button = wrapper
    .findAll("button")
    .find((b) => b.text().trim() === label);
  expect(button, label).toBeDefined();
  await button!.trigger("click");
};

describe("AutoComplete shared selection semantics", () => {
  it("selects an option object, fills its label, and distinguishes pointer selection", async () => {
    const w = mount(AutoComplete, {
      props: { options: choices, defaultValue: "Ap" },
    });
    expect(w.find("input").element.value).toBe("Ap");
    await w.find("input").trigger("focus");
    await w.findAll('[role="option"]')[0].trigger("click");
    expect(w.emitted("change")).toEqual([["Apple"]]);
    expect(w.emitted("select")).toEqual([[choices[0]]]);
    expect(w.emitted("optionClick")).toEqual([[choices[0]]]);
    expect(w.find("input").element.value).toBe("Apple");
    expect(w.emitted("dropdownVisibleChange")).toEqual([[true], [false]]);
  });
  it("uses controlled text for filtering after owner rejection and external updates", async () => {
    const w = mount(AutoComplete, { props: { options: choices, value: "Ap" } });
    await input(w, "Blocked");
    expect(w.find("input").element.value).toBe("Ap");
    expect(w.findAll('[role="option"]')).toHaveLength(2);
    await w.setProps({ value: "Block" });
    expect(w.findAll('[role="option"]')).toHaveLength(1);
    await w.find('[role="option"]').trigger("click");
    expect(w.emitted("select")).toBeUndefined();
  });
  it("supports fillOnSelect=false, custom filter/sort and adjacent groups", async () => {
    const w = mount(AutoComplete, {
      props: {
        options: choices,
        defaultValue: "query",
        fillOnSelect: false,
        filterOption: () => true,
        sortOption: (a, b) => Number(a.value) - Number(b.value),
        groupBy: (o) => o.group ?? "",
        groupMode: "adjacent",
      },
    });
    await w.find("input").trigger("focus");
    expect(w.findAll('[role="group"]')).toHaveLength(3);
    await w.findAll('[role="option"]')[2].trigger("click");
    expect(w.find("input").element.value).toBe("query");
    expect(w.emitted("change")).toBeUndefined();
    expect(w.emitted("select")).toEqual([[choices[2]]]);
  });
  it("native confirm honors autoHighlight, skips disabled and suppresses IME commit", async () => {
    const w = mount(AutoComplete, {
      props: { options: [choices[1], choices[0]], autoHighlight: true },
    });
    await w.find("input").trigger("focus");
    await w.find("input").trigger("compositionstart");
    await w.find("input").trigger("confirm");
    expect(w.emitted("select")).toBeUndefined();
    await w.find("input").trigger("compositionend");
    await w.find("input").trigger("confirm");
    expect(w.emitted("select")).toEqual([[choices[0]]]);
    expect(w.emitted("optionClick")).toBeUndefined();
  });
  it("submits trimmed free text and renders loading/empty slots", async () => {
    const w = mount(AutoComplete, {
      props: { options: [], defaultValue: "  search  " },
      slots: { empty: "No matches", loading: "Fetching" },
    });
    await w.find("input").trigger("focus");
    expect(w.text()).toContain("No matches");
    await w.find("input").trigger("confirm");
    expect(w.emitted("submit")).toEqual([["search"]]);
    await w.setProps({ loading: true });
    await w.find("input").trigger("focus");
    expect(w.text()).toContain("Fetching");
  });
});

describe("Cascader selected versus expanded paths", () => {
  it("keeps a rejected selected path and reopens from the owner value", async () => {
    const w = mount(Cascader, { props: { options: tree, value: [1, 11] } });
    expect(w.find("input").element.value).toBe("Asia / Tokyo");
    await w.find("input").trigger("click");
    await tap(w, "Europe ›");
    await tap(w, "Paris");
    expect(w.emitted("change")?.[0]).toEqual([
      [2, 21],
      [tree[1], tree[1].children![0]],
    ]);
    expect(w.find("input").element.value).toBe("Asia / Tokyo");
    await w.find("input").trigger("click");
    expect(w.text()).toContain("Tokyo");
    expect(w.text()).not.toContain("Paris");
    await w.setProps({ value: [2, 21] });
    expect(w.find("input").element.value).toBe("Europe / Paris");
  });
  it("searches enabled paths with core semantics and supports custom display and clear", async () => {
    const w = mount(Cascader, {
      props: {
        options: tree,
        defaultValue: [1, 11],
        showSearch: true,
        displayRender: (labels: string[]) => labels.join(" > "),
      },
    });
    expect(w.find("input").element.value).toBe("Asia > Tokyo");
    await input(w, "Tokyo");
    expect(w.findAll("[data-search-result]")).toHaveLength(1);
    await w.find("[data-search-result]").trigger("click");
    expect(w.emitted("change")?.[0]?.[0]).toEqual([1, 11]);
    await w.find('[aria-label="Clear selection"]').trigger("click");
    expect(w.emitted("change")?.at(-1)).toEqual([[], []]);
    expect(w.find("input").element.value).toBe("");
  });
  it("lazy loads once while loading, resolves new children and respects maxLevel", async () => {
    const loadData = vi.fn();
    const root = { value: "root", label: "Root" };
    const w = mount(Cascader, { props: { options: [root], loadData } });
    await w.find("input").trigger("click");
    await tap(w, "Root ›");
    expect(loadData).toHaveBeenCalledWith([root]);
    expect(w.emitted("change")).toBeUndefined();
    await w.setProps({ options: [{ ...root, loading: true }] });
    await tap(w, "Root …");
    expect(loadData).toHaveBeenCalledTimes(1);
    await w.setProps({
      options: [
        { ...root, children: [{ value: "leaf", label: "Leaf", isLeaf: true }] },
      ],
    });
    await tap(w, "Leaf");
    expect(w.emitted("change")?.[0]?.[0]).toEqual(["root", "leaf"]);
    await w.setProps({ options: tree, maxLevel: 1 });
    await w.find("input").trigger("click");
    await tap(w, "Asia ›");
    expect(w.emitted("change")?.at(-1)?.[0]).toEqual([1]);
  });
  it("custom search predicates receive full paths and ignore disabled ancestors", async () => {
    const filter = vi.fn(
      (q: string, path: { value: string | number }[]) =>
        q === "11" && path.at(-1)?.value === 11,
    );
    const w = mount(Cascader, {
      props: { options: tree, showSearch: true, filter },
    });
    await input(w, "11");
    expect(w.findAll("[data-search-result]")).toHaveLength(1);
    expect(filter.mock.calls.every(([, path]) => path[0].value !== 3)).toBe(
      true,
    );
  });
});

describe("TagInput tag parsing and suggestions", () => {
  it("splits typed separators, trims/deduplicates and retains the remainder", async () => {
    const w = mount(TagInput, {
      props: { defaultValue: ["alpha"], separators: [";", "Enter"] },
    });
    await input(w, " alpha ; beta ;tail");
    expect(w.emitted("change")).toEqual([[["alpha", "beta"]]]);
    expect(w.find("input").element.value).toBe("tail");
    await w.find("input").trigger("confirm");
    expect(w.emitted("change")?.at(-1)).toEqual([["alpha", "beta", "tail"]]);
  });
  it("deduplicates suggestions, hides selected tags and adds chosen suggestions", async () => {
    const w = mount(TagInput, {
      props: {
        defaultValue: ["Apple"],
        options: ["Apple", "Pear", " Pear ", "Peach"],
      },
    });
    await input(w, "Pe");
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual([
      'Add "Pe"',
      "Pear",
      "Peach",
    ]);
    await w.findAll('[role="option"]')[1].trigger("click");
    expect(w.emitted("change")?.at(-1)).toEqual([["Apple", "Pear"]]);
  });
  it("commits blur by default, supports opt-out and clear-all", async () => {
    const w = mount(TagInput);
    await input(w, " first ");
    await w.find("input").trigger("blur");
    expect(w.emitted("change")).toEqual([[["first"]]]);
    await w.setProps({ commitOnBlur: false });
    await input(w, "second");
    await w.find("input").trigger("blur");
    expect(w.emitted("change")).toHaveLength(1);
    await w.find('[aria-label="Clear tags"]').trigger("click");
    expect(w.emitted("change")?.at(-1)).toEqual([[]]);
    expect(w.find("input").element.value).toBe("");
  });
  it("does not commit IME text and removes the last tag only from an empty draft", async () => {
    const w = mount(TagInput, { props: { defaultValue: ["one", "two"] } });
    await w.find("input").trigger("compositionstart");
    await input(w, "中文,");
    await w.find("input").trigger("confirm");
    expect(w.emitted("change")).toBeUndefined();
    await w.find("input").trigger("compositionend");
    await input(w, "");
    await w.find("input").trigger("keydown", { key: "Backspace" });
    expect(w.emitted("change")).toEqual([[["one"]]]);
  });
  it("preserves owner state on rejection and disabled/readOnly block edits", async () => {
    const w = mount(TagInput, { props: { value: ["owner"] } });
    await input(w, "new");
    await w.find("input").trigger("confirm");
    expect(w.findAll("[data-tag]")).toHaveLength(1);
    await w.setProps({ readOnly: true });
    expect(w.findAll("button")).toHaveLength(0);
    await input(w, "blocked");
    await w.find("input").trigger("confirm");
    expect(w.emitted("change")).toHaveLength(1);
  });
  it("pasted separators commit all tokens while respecting selection and maxTags", async () => {
    const w = mount(TagInput, { props: { maxTags: 3, defaultValue: ["one"] } });
    await input(w, "replace");
    w.find("input").element.setSelectionRange(0, 7);
    await w.find("input").trigger("paste", {
      clipboardData: { getData: () => "two\nthree,four" },
    });
    expect(w.emitted("change")?.at(-1)).toEqual([["one", "two", "three"]]);
  });
});

describe("KeyValueEditor stable entries", () => {
  it("uses entries/defaultEntries, preserves multiline whitespace and stable ids", async () => {
    const entries = [
      { id: "a", key: "duplicate", value: "one" },
      { id: "b", key: "duplicate", value: "two" },
    ];
    const w = mount(KeyValueEditor, { props: { defaultEntries: entries } });
    expect(w.findAll("textarea")).toHaveLength(4);
    await w
      .findAll("textarea")[2]
      .trigger("input", { detail: { value: "  key\n " } });
    expect(w.emitted("change")?.[0]).toEqual([
      [entries[0], { ...entries[1], key: "  key\n " }],
    ]);
    await w.find('[aria-label="Remove entry 1"]').trigger("click");
    expect(w.emitted("change")?.at(-1)?.[0]).toEqual([
      { ...entries[1], key: "  key\n " },
    ]);
    await tap(w, "Add entry");
    const next = w.emitted("change")?.at(-1)?.[0] as typeof entries;
    expect(next[1].id).toBeTruthy();
    expect(next[1].id).not.toBe("b");
  });
  it("errors stay attached to entry ids after reorder, custom labels and controlled rejection", async () => {
    const a = { id: "a", key: "first", value: "1" },
      b = { id: "b", key: "second", value: "2" };
    const w = mount(KeyValueEditor, {
      props: {
        entries: [a, b],
        errors: { a: { key: "Duplicate key" } },
        keyLabel: "Header",
        valueLabel: "Content",
        addLabel: "New row",
        removeLabel: "Delete row",
      },
    });
    await w.setProps({ entries: [b, a] });
    expect(w.findAll("[data-entry-id]")[1].text()).toContain("Duplicate key");
    expect(w.findAll("textarea")[2].attributes("aria-label")).toBe("Header 2");
    await w
      .findAll("textarea")[2]
      .trigger("input", { detail: { value: "replacement" } });
    expect(w.emitted("change")?.[0]?.[0]).toEqual([
      b,
      { ...a, key: "replacement" },
    ]);
    expect(w.findAll("textarea")[2].element.value).toBe("first");
    await w.find('[aria-label="Delete row 1"]').trigger("click");
    expect(w.findAll("[data-entry-id]")).toHaveLength(2);
  });
});

it.each([AutoComplete, Cascader, TagInput, KeyValueEditor])(
  "advanced controls obey inherited readOnly under synthetic native events",
  async (component) => {
    const w = mount(FormControl, {
      props: { readOnly: true },
      slots: {
        default: () =>
          h(component as Component, {
            options:
              component === Cascader
                ? tree
                : component === TagInput
                  ? ["one"]
                  : choices,
          }),
      },
    });
    const child = w.findComponent(component as Component) as VueWrapper;
    const field = w.find("input,textarea");
    if (field.exists()) {
      await field.trigger("input", { detail: { value: "blocked" } });
      await field.trigger("confirm");
    }
    for (const button of w.findAll("button")) await button.trigger("click");
    expect(child.emitted("change")).toBeUndefined();
  },
);

it("AutoComplete first grouping follows sorted display order and option slots", async () => {
  const w = mount(AutoComplete, {
    props: {
      options: choices,
      filterOption: () => true,
      sortOption: (a, b) => Number(b.value) - Number(a.value),
      groupBy: (o) => o.group ?? "",
    },
    slots: { option: ({ option }) => h("span", `Suggestion ${option.label}`) },
  });
  await w.find("input").trigger("focus");
  expect(
    w.findAll('[role="group"]').map((g) => g.attributes("aria-label")),
  ).toEqual(["Fruit", "Other"]);
  expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual([
    "Suggestion Apricot",
    "Suggestion Apple",
    "Suggestion Blocked",
  ]);
  await w.find("input").trigger("keydown", { key: "ArrowDown" });
  await w.find("input").trigger("keydown", { key: "Enter" });
  expect(w.emitted("select")).toEqual([[choices[2]]]);
});
it("AutoComplete inputProps state overrides inherited form locking and v-model updates filter", async () => {
  const w = mount(FormControl, {
    props: { disabled: true },
    slots: {
      default: () =>
        h(AutoComplete, {
          modelValue: "Ap",
          options: choices,
          inputProps: { disabled: false, clearable: true },
        }),
    },
  });
  const child = w.getComponent(AutoComplete);
  await w.find("input").trigger("focus");
  expect(w.findAll('[role="option"]')).toHaveLength(2);
  await w.findAll('[role="option"]')[0].trigger("click");
  expect(child.emitted("update:modelValue")).toEqual([["Apple"]]);
  expect(w.find("input").element.value).toBe("Ap");
});
it("TagInput Enter opt-out still allows explicit suggestion navigation and custom labels", async () => {
  const w = mount(TagInput, {
    props: {
      separators: [";"],
      options: ["Pear"],
      createLabel: (t) => `Create ${t}`,
      removeLabel: (t) => `Delete ${t}`,
      addLabel: "Insert",
      clearLabel: "Reset",
    },
  });
  await input(w, "Pe");
  await w.find("input").trigger("confirm");
  expect(w.emitted("change")).toBeUndefined();
  await w.find("input").trigger("keydown", { key: "ArrowDown" });
  await w.find("input").trigger("confirm");
  expect(w.emitted("change")).toEqual([[["Pear"]]]);
  expect(w.find('[aria-label="Delete Pear"]').exists()).toBe(true);
  expect(w.find('[aria-label="Insert"]').exists()).toBe(true);
  await w.find('[aria-label="Reset"]').trigger("click");
  expect(w.emitted("change")?.at(-1)).toEqual([[]]);
});
it("KeyValueEditor rejected native edits reset the visible textarea", async () => {
  const w = mount(KeyValueEditor, {
    props: { entries: [{ id: "owner", key: "Name", value: "Saved" }] },
  });
  const field = w.findAll("textarea")[1];
  field.element.value = "Rejected";
  await field.trigger("input", { detail: { value: "Rejected" } });
  await w.vm.$nextTick();
  expect(field.element.value).toBe("Saved");
});
it("TagInput native clear/remove touch does not first commit the unfinished draft on blur", async () => {
  const w = mount(TagInput, { props: { defaultValue: ["saved"] } });
  await input(w, "unfinished");
  const clear = w.find('[aria-label="Clear tags"]');
  await clear.trigger("touchstart");
  await w.find("input").trigger("blur");
  await clear.trigger("click");
  expect(w.emitted("change")).toEqual([[[]]]);
});
it("Cascader keyboard browses enabled columns and selects the active leaf", async () => {
  const w = mount(Cascader, { props: { options: tree } });
  const field = w.find("input");
  await field.trigger("keydown", { key: "ArrowDown" });
  await field.trigger("keydown", { key: "ArrowRight" });
  await field.trigger("keydown", { key: "ArrowRight" });
  expect(w.emitted("change")).toBeUndefined();
  await field.trigger("keydown", { key: "ArrowDown" });
  await field.trigger("keydown", { key: "Enter" });
  expect(w.emitted("change")?.[0]?.[0]).toEqual([1, 12]);
});
