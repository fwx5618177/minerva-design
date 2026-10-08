import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html, type TemplateResult } from "lit";
import { MinervaCascader, type CascaderOption } from "./cascader";
import "../../elements/cascader";
import "../../elements/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, shadow, wait } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const xihu: CascaderOption = { value: "xihu", label: "West Lake" };
const binjiang: CascaderOption = {
  value: "binjiang",
  label: "Binjiang",
  disabled: true,
};
const hangzhou: CascaderOption = {
  value: "hangzhou",
  label: "Hangzhou",
  children: [xihu, binjiang],
};
const ningbo: CascaderOption = { value: "ningbo", label: "Ningbo" };
const zhejiang: CascaderOption = {
  value: "zhejiang",
  label: "Zhejiang",
  children: [hangzhou, ningbo],
};
const nanjing: CascaderOption = { value: "nanjing", label: "Nanjing" };
const jiangsu: CascaderOption = {
  value: "jiangsu",
  label: "Jiangsu",
  children: [nanjing],
};
const tibet: CascaderOption = {
  value: "tibet",
  label: "Tibet",
  disabled: true,
};
const options: CascaderOption[] = [zhejiang, jiangsu, tibet];

/** Mounts a cascader and gives it the options tree (a JS property). */
async function setup(
  attrs = "",
  opts: CascaderOption[] = options,
  before = "",
  after = "",
): Promise<MinervaCascader> {
  const el = await mount<MinervaCascader>(
    `${before}<minerva-cascader label="Area" name="area" ${attrs}></minerva-cascader>${after}`,
    "minerva-cascader",
  );
  el.options = opts;
  await settle();
  return el;
}

const input = (el: MinervaCascader) => $<HTMLInputElement>(el, "input");
const dropdown = (el: MinervaCascader) =>
  shadow(el).querySelector<HTMLElement>(".dropdown");
const columns = (el: MinervaCascader) =>
  Array.from(shadow(el).querySelectorAll<HTMLElement>(".dropdown .column"));
const option = (el: MinervaCascader, name: string) => {
  const found = Array.from(
    shadow(el).querySelectorAll<HTMLElement>('[role="option"]'),
  ).find((o) => (o.querySelector(".label") ?? o).textContent?.trim() === name);
  if (!found) throw new Error(`no option ${name}`);
  return found;
};
const focused = (el: MinervaCascader) => shadow(el).activeElement;

async function openByClick(el: MinervaCascader) {
  await userEvent.click(input(el));
  await settle();
  expect(dropdown(el)).not.toBeNull();
}

async function press(el: MinervaCascader, keys: string) {
  await userEvent.keyboard(keys);
  await settle();
  void el;
}

describe("<minerva-cascader>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-cascader")).toBe(MinervaCascader);
  });

  it("renders lib-core's structure: a read-only combobox with placeholder and name", async () => {
    const el = await setup();
    expect($(el, ".cascader > .selector > .input > input.field")).toBe(
      input(el),
    );
    expect($(el, ".selector .arrow")).toHaveAttribute("aria-hidden", "true");
    expect(input(el)).toHaveAttribute("role", "combobox");
    expect(input(el)).toHaveAttribute("aria-haspopup", "listbox");
    expect(input(el)).toHaveAttribute("aria-expanded", "false");
    expect(input(el)).toHaveAttribute("aria-label", "Area");
    expect(input(el)).toHaveAttribute("name", "area");
    expect(input(el)).toHaveAttribute("placeholder", "Please select");
    expect(input(el)).toHaveAttribute("readonly");
    expect(input(el).value).toBe("");
    expect(dropdown(el)).toBeNull();
  });

  it("has defaults and reflects state attributes", async () => {
    const el = await setup();
    expect(el.open).toBe(false);
    expect(el.value).toEqual([]);
    expect(el.expandTrigger).toBe("click");
    expect(el.maxLevel).toBe(6);
    expect(el.showSearch).toBe(false);
    expect(el.hideClearButton).toBe(false);
    el.invalid = true;
    el.readOnly = true;
    el.showSearch = true;
    el.expandTrigger = "hover";
    el.placeholder = "Choose area";
    el.width = 320;
    await settle();
    expect(el).toHaveAttribute("invalid");
    expect(el).toHaveAttribute("readonly");
    expect(el).toHaveAttribute("show-search");
    expect(el.getAttribute("expand-trigger")).toBe("hover");
    expect(input(el)).toHaveAttribute("aria-invalid", "true");
    expect(input(el)).toHaveAttribute("aria-readonly", "true");
    expect(input(el)).toHaveAttribute("aria-autocomplete", "list");
    expect(input(el)).toHaveAttribute("placeholder", "Choose area");
    expect(el.style.width).toBe("320px");
  });

  it("opens on click with the first column; arrow and selector get open classes", async () => {
    const el = await setup();
    await openByClick(el);
    expect($(el, ".selector").classList).toContain("focused");
    expect($(el, ".arrow").classList).toContain("open");
    expect(el.open).toBe(true);
    expect(dropdown(el)).toHaveAttribute("popover", "manual");
    expect(columns(el)).toHaveLength(1);
    expect(
      Array.from(columns(el)[0].querySelectorAll('[role="option"]')).map((li) =>
        li.textContent?.trim(),
      ),
    ).toEqual(["Zhejiang", "Jiangsu", "Tibet"]);
    expect(columns(el)[0]).toHaveAttribute("aria-label", "Area, level 1");
  });

  it("toggles with the arrow", async () => {
    const el = await setup();
    await userEvent.click($(el, ".arrow"));
    await settle();
    expect(dropdown(el)).not.toBeNull();
    await userEvent.click($(el, ".arrow"));
    await settle();
    expect(dropdown(el)).toBeNull();
  });

  it("closes when clicking outside", async () => {
    const el = await setup("", options, "", "<button>Out</button>");
    await openByClick(el);
    await wait(5); // dismissable layers ignore the opening pointer for one tick
    await userEvent.click(document.querySelector("button")!);
    await settle();
    expect(dropdown(el)).toBeNull();
  });

  it("expands children on click and selects a nested leaf with the full path", async () => {
    const el = await setup();
    const onChange = vi.fn();
    const onNative = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("change", onNative);
    await openByClick(el);
    await userEvent.click(option(el, "Zhejiang"));
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(columns(el)).toHaveLength(2);
    expect(option(el, "Zhejiang")).toHaveAttribute(
      "aria-controls",
      columns(el)[1].id,
    );
    expect(shadow(el).getElementById(columns(el)[1].id)).toBe(columns(el)[1]);
    await userEvent.click(option(el, "Hangzhou"));
    await settle();
    expect(columns(el)).toHaveLength(3);
    await userEvent.click(option(el, "West Lake"));
    await settle();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: ["zhejiang", "hangzhou", "xihu"],
      selectedOptions: [zhejiang, hangzhou, xihu],
    });
    expect(onNative).toHaveBeenCalledTimes(1);
    expect(el.value).toEqual(["zhejiang", "hangzhou", "xihu"]);
    expect(input(el).value).toBe("Zhejiang / Hangzhou / West Lake");
    expect(dropdown(el)).toBeNull();
  });

  it("highlights the selected path when reopened", async () => {
    const el = await setup();
    el.value = ["jiangsu", "nanjing"];
    await openByClick(el);
    expect(columns(el)).toHaveLength(2);
    expect(option(el, "Jiangsu").classList).toContain("active");
    expect(option(el, "Nanjing").classList).toContain("active");
    expect(option(el, "Nanjing")).toHaveAttribute("aria-selected", "true");
    expect(option(el, "Zhejiang")).toHaveAttribute("aria-selected", "false");
  });

  it("ignores disabled options", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await openByClick(el);
    const item = option(el, "Tibet");
    expect(item.classList).toContain("disabled");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item).toHaveAttribute("tabindex", "-1");
    await userEvent.click(item);
    await settle();
    expect(onChange).not.toHaveBeenCalled();
    expect(dropdown(el)).not.toBeNull();
  });

  it("expands on hover with expand-trigger=hover only", async () => {
    const el = await setup('expand-trigger="hover"');
    await openByClick(el);
    await userEvent.hover(option(el, "Jiangsu"));
    await settle();
    expect(columns(el)).toHaveLength(2);
    expect(option(el, "Jiangsu")).toHaveAttribute("data-expanded", "");

    const plain = await setup();
    await openByClick(plain);
    await userEvent.hover(option(plain, "Jiangsu"));
    await settle();
    expect(columns(plain)).toHaveLength(1);
  });

  it("limits the columns with max-level and selects at the last level", async () => {
    const el = await setup('max-level="2"');
    await openByClick(el);
    await userEvent.click(option(el, "Zhejiang"));
    await settle();
    expect(columns(el)).toHaveLength(2);
    expect(option(el, "Hangzhou").querySelector(".expandIcon")).toBeNull();
    expect(option(el, "Zhejiang").querySelector(".expandIcon")).not.toBeNull();
    await userEvent.click(option(el, "Hangzhou"));
    await settle();
    expect(dropdown(el)).toBeNull();
    expect(input(el).value).toBe("Zhejiang / Hangzhou");
  });

  it("the value attribute is the default path; clear empties it", async () => {
    const el = await setup('value="zhejiang,ningbo"');
    expect(el.value).toEqual(["zhejiang", "ningbo"]);
    expect(input(el).value).toBe("Zhejiang / Ningbo");
    const onChange = vi.fn();
    const onClear = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("minerva-clear", onClear);
    const clear = $<HTMLButtonElement>(el, ".clearIcon");
    expect(clear).toHaveAttribute("aria-label", "Clear selection");
    await userEvent.click(clear);
    await settle();
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: [],
      selectedOptions: [],
    });
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(input(el).value).toBe("");
    expect(shadow(el).querySelector(".clearIcon")).toBeNull();
    expect(dropdown(el)).toBeNull();
    expect(focused(el)).toBe(input(el));
  });

  it("parses a JSON value attribute (keeps numbers)", async () => {
    const el = await setup(`value='[1, 2]'`, [
      { value: 1, label: "One", children: [{ value: 2, label: "Two" }] },
    ]);
    expect(el.value).toEqual([1, 2]);
    expect(input(el).value).toBe("One / Two");
  });

  it("follows programmatic value changes without emitting; resolves labels when options arrive later", async () => {
    const el = await setup("", []);
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.value = ["jiangsu"];
    await settle();
    expect(input(el).value).toBe("");
    el.options = options;
    await settle();
    expect(input(el).value).toBe("Jiangsu");
    el.value = ["zhejiang", "hangzhou", "xihu"];
    await settle();
    expect(input(el).value).toBe("Zhejiang / Hangzhou / West Lake");
    el.value = [];
    await settle();
    expect(input(el).value).toBe("");
    expect(shadow(el).querySelector(".clearIcon")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("hides the clear button with hide-clear-button", async () => {
    const el = await setup('hide-clear-button value="zhejiang,ningbo"');
    expect(shadow(el).querySelector(".clearIcon")).toBeNull();
  });

  it("uses displayRender for the field text", async () => {
    const el = await setup();
    const displayRender = vi.fn((labels: string[]) => labels.join(" > "));
    el.displayRender = displayRender;
    await openByClick(el);
    await userEvent.click(option(el, "Jiangsu"));
    await settle();
    await userEvent.click(option(el, "Nanjing"));
    await settle();
    expect(displayRender).toHaveBeenLastCalledWith(
      ["Jiangsu", "Nanjing"],
      [jiangsu, nanjing],
    );
    expect(input(el).value).toBe("Jiangsu > Nanjing");
  });

  it("does not open and shows no clear button when disabled", async () => {
    const el = await setup('disabled value="zhejiang,ningbo"');
    expect(input(el).disabled).toBe(true);
    expect($(el, ".selector").classList).toContain("disabled");
    expect(shadow(el).querySelector(".clearIcon")).toBeNull();
    await userEvent.click($(el, ".arrow"));
    await settle();
    expect(dropdown(el)).toBeNull();
  });

  it("does not open or clear while read-only", async () => {
    const el = await setup('readonly value="zhejiang,hangzhou"');
    await userEvent.click(input(el));
    await settle();
    expect(dropdown(el)).toBeNull();
    expect(shadow(el).querySelector(".clearIcon")).toBeNull();
  });

  it("searches across all levels, emits minerva-input and selects a result", async () => {
    const el = await setup("show-search");
    const onChange = vi.fn();
    const onInput = vi.fn();
    el.addEventListener("minerva-change", onChange);
    el.addEventListener("minerva-input", onInput);
    expect(input(el)).not.toHaveAttribute("readonly");
    await userEvent.click(input(el));
    await userEvent.type(input(el), "hang", { skipClick: true });
    await settle();
    expect(onInput.mock.calls.at(-1)![0].detail).toEqual({ value: "hang" });
    const results = Array.from(
      shadow(el).querySelectorAll<HTMLElement>(".searchOption"),
    );
    expect(results.map((r) => r.textContent?.trim())).toEqual([
      "Zhejiang / Hangzhou",
      "Zhejiang / Hangzhou / West Lake",
    ]);
    expect(input(el).value).toBe("hang");
    await userEvent.click(results[1]);
    await settle();
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: ["zhejiang", "hangzhou", "xihu"],
      selectedOptions: [zhejiang, hangzhou, xihu],
    });
    expect(input(el).value).toBe("Zhejiang / Hangzhou / West Lake");
    expect(dropdown(el)).toBeNull();
  });

  it("shows a localized empty message when the search has no results", async () => {
    const el = await setup("show-search");
    await userEvent.click(input(el));
    await userEvent.type(input(el), "zzz", { skipClick: true });
    await settle();
    expect($(el, ".empty")).toHaveAttribute("role", "status");
    expect($(el, ".empty").textContent?.trim()).toBe("No results found");
  });

  it("excludes disabled branches from search and supports a custom filter", async () => {
    const el = await setup("show-search");
    const filter = vi.fn((text: string, path: CascaderOption[]) =>
      path.some((o) => String(o.value) === text),
    );
    el.filter = filter;
    await userEvent.click(input(el));
    await userEvent.type(input(el), "jiangsu", { skipClick: true });
    await settle();
    expect(filter).toHaveBeenCalledWith("jiangsu", [jiangsu]);
    expect(filter).not.toHaveBeenCalledWith("jiangsu", [tibet]);
    expect(
      Array.from(shadow(el).querySelectorAll(".searchOption")).map((r) =>
        r.textContent?.trim(),
      ),
    ).toEqual(["Jiangsu", "Jiangsu / Nanjing"]);
  });

  it("calls loadData for non-leaf options without children instead of selecting them", async () => {
    const lazy: CascaderOption = { value: "lazy", label: "Lazy" };
    const leaf: CascaderOption = { value: "leaf", label: "Leaf", isLeaf: true };
    const el = await setup("", [lazy, leaf]);
    const loadData = vi.fn();
    const onChange = vi.fn();
    el.loadData = loadData;
    el.addEventListener("minerva-change", onChange);
    await openByClick(el);
    await userEvent.click(option(el, "Lazy"));
    await settle();
    expect(loadData).toHaveBeenCalledWith([lazy]);
    expect(onChange).not.toHaveBeenCalled();
    expect(option(el, "Lazy")).toHaveAttribute("data-expanded", "");
    await userEvent.click(option(el, "Leaf"));
    await settle();
    expect(loadData).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].detail.value).toEqual(["leaf"]);
  });

  it("shows a loading indicator and aria-busy for loading options", async () => {
    const el = await setup("", [{ value: "x", label: "X", loading: true }]);
    await openByClick(el);
    const item = shadow(el).querySelector<HTMLElement>(".option")!;
    expect(item.classList).toContain("loading");
    expect(item).toHaveAttribute("aria-busy", "true");
    expect(item.querySelector(".loadingIndicator")?.textContent).toBe("...");
  });

  it("supports optionRender (string or template)", async () => {
    const el = await setup();
    const optionRender = vi.fn(
      (o: CascaderOption, level: number): TemplateResult =>
        html`<em>${o.label}-L${level}</em>`,
    );
    el.optionRender = optionRender;
    await openByClick(el);
    expect(optionRender).toHaveBeenCalledWith(zhejiang, 0);
    expect(shadow(el).querySelector("li em")?.textContent).toBe("Zhejiang-L0");
  });

  it("minerva-open-change is cancelable (preventDefault keeps the state)", async () => {
    const el = await setup();
    const onOpenChange = vi.fn((e: Event) => e.preventDefault());
    el.addEventListener("minerva-open-change", onOpenChange);
    await userEvent.click(input(el));
    await settle();
    expect((onOpenChange.mock.calls[0][0] as CustomEvent).detail).toEqual({
      open: true,
    });
    expect(el.open).toBe(false);
    expect(dropdown(el)).toBeNull();

    el.removeEventListener("minerva-open-change", onOpenChange);
    await openByClick(el);
    const keepOpen = vi.fn((e: Event) => e.preventDefault());
    el.addEventListener("minerva-open-change", keepOpen);
    await press(el, "{Escape}");
    expect((keepOpen.mock.calls[0][0] as CustomEvent).detail).toEqual({
      open: false,
    });
    expect(el.open).toBe(true);
    expect(dropdown(el)).not.toBeNull();
  });

  it("show() / hide() and the open attribute drive the panel without events", async () => {
    const el = await setup('value="jiangsu,nanjing"');
    const onOpenChange = vi.fn();
    el.addEventListener("minerva-open-change", onOpenChange);
    el.show();
    await settle();
    expect(columns(el)).toHaveLength(2);
    expect(input(el)).toHaveAttribute("aria-expanded", "true");
    el.hide();
    await settle();
    expect(dropdown(el)).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("forwards host aria-label / <label for> to the combobox", async () => {
    const el = await setup(
      'id="region"',
      options,
      '<label for="region">Region</label>',
    );
    expect(input(el)).toHaveAttribute("aria-label", "Region");
    el.setAttribute("aria-label", "Shipping region");
    await settle();
    expect(input(el)).toHaveAttribute("aria-label", "Shipping region");
  });

  it("re-renders built-in texts with the language (lang / minerva-config)", async () => {
    const el = await mount<MinervaCascader>(
      `<div lang="fr"><minerva-cascader></minerva-cascader></div>`,
      "minerva-cascader",
    );
    el.options = options;
    el.value = ["jiangsu"];
    await settle();
    expect(input(el)).toHaveAttribute("placeholder", "Veuillez choisir");
    expect($(el, ".clearIcon")).toHaveAttribute(
      "aria-label",
      "Effacer la sélection",
    );
    await openByClick(el);
    expect(columns(el)[0]).toHaveAttribute("aria-label", "Options, niveau 1");
    el.parentElement!.setAttribute("lang", "en");
    await settle();
    expect($(el, ".clearIcon")).toHaveAttribute(
      "aria-label",
      "Clear selection",
    );

    const configured = await mount<MinervaCascader>(
      `<minerva-config locale="fr"><minerva-cascader></minerva-cascader></minerva-config>`,
      "minerva-cascader",
    );
    expect(input(configured)).toHaveAttribute(
      "placeholder",
      "Veuillez choisir",
    );
  });
});

describe("<minerva-cascader> keyboard", () => {
  const genres: CascaderOption[] = [
    {
      value: "fiction",
      label: "Fiction",
      children: [
        { value: "fantasy", label: "Fantasy" },
        { value: "scifi", label: "Science fiction" },
      ],
    },
    { value: "poetry", label: "Poetry" },
    { value: "essays", label: "Essays" },
  ];

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
  ])(
    "%s opens from the input and focuses the first option",
    async (_, keys) => {
      const el = await setup("", genres);
      input(el).focus();
      expect(focused(el)).toBe(input(el));
      await press(el, keys);
      expect(input(el)).toHaveAttribute("aria-expanded", "true");
      expect(focused(el)).toBe(option(el, "Fiction"));
    },
  );

  it("does not open on focus alone", async () => {
    const el = await setup();
    input(el).focus();
    await settle();
    expect(dropdown(el)).toBeNull();
  });

  it("Home / End / arrows move within a column, Enter picks a leaf and returns focus", async () => {
    const el = await setup("", genres);
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    input(el).focus();
    await press(el, "{Enter}{End}");
    expect(focused(el)).toBe(option(el, "Essays"));
    await press(el, "{Home}");
    expect(focused(el)).toBe(option(el, "Fiction"));
    await press(el, "{ArrowUp}");
    expect(focused(el)).toBe(option(el, "Essays")); // wraps
    await press(el, "{ArrowDown}");
    await press(el, "{ArrowRight}");
    await press(el, "{ArrowDown}");
    expect(focused(el)).toBe(option(el, "Science fiction"));
    await press(el, "{Enter}");
    expect(onChange.mock.calls[0][0].detail.value).toEqual([
      "fiction",
      "scifi",
    ]);
    expect(focused(el)).toBe(input(el));
    expect(input(el)).toHaveAttribute("aria-expanded", "false");
  });

  it("navigates columns, reopens on the selected path, Escape returns focus", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    input(el).focus();
    await press(el, "{Enter}");
    expect(focused(el)).toBe(option(el, "Zhejiang"));
    await press(el, "{ArrowRight}");
    expect(focused(el)).toBe(option(el, "Hangzhou"));
    await press(el, "{ArrowLeft}");
    expect(focused(el)).toBe(option(el, "Zhejiang"));
    await press(el, "{ArrowRight}");
    await press(el, "{ArrowDown}");
    await press(el, "{Enter}");
    expect(onChange.mock.calls[0][0].detail).toEqual({
      value: ["zhejiang", "ningbo"],
      selectedOptions: [zhejiang, ningbo],
    });
    expect(dropdown(el)).toBeNull();
    expect(focused(el)).toBe(input(el));

    await press(el, "{ArrowDown}");
    expect(focused(el)).toBe(option(el, "Ningbo"));
    await press(el, "{Escape}");
    expect(dropdown(el)).toBeNull();
    expect(focused(el)).toBe(input(el));
  });

  it("exposes the item states as part names (expanded, selected, disabled, loading)", async () => {
    const lazy: CascaderOption = {
      value: "lazy",
      label: "Lazy",
      isLeaf: false,
      loading: true,
    };
    const el = await setup("", [...options, lazy]);
    input(el).focus();
    await press(el, "{Enter}");
    const part = (name: string) => option(el, name).getAttribute("part");
    expect(part("Zhejiang")).toBe("item");
    expect(part("Tibet")).toBe("item item--disabled");
    expect(part("Lazy")).toBe("item item--loading");
    await press(el, "{ArrowRight}");
    expect(part("Zhejiang")).toBe("item item--expanded");
    expect(option(el, "Zhejiang")).toHaveAttribute("data-expanded", "");
    await press(el, "{ArrowDown}{Enter}");
    // reopens on the selected path
    await press(el, "{ArrowDown}");
    expect(part("Zhejiang")).toBe("item item--selected item--expanded");
    expect(part("Ningbo")).toBe("item item--selected");
    expect(focused(el)).toBe(option(el, "Ningbo"));
    expect(part("Hangzhou")).toBe("item");
  });

  it("ArrowLeft on the first column closes and returns to the input", async () => {
    const el = await setup();
    input(el).focus();
    await press(el, " ");
    await press(el, "{ArrowLeft}");
    expect(dropdown(el)).toBeNull();
    expect(focused(el)).toBe(input(el));
  });

  it("swaps ArrowLeft / ArrowRight in RTL", async () => {
    const el = await setup("", options, '<div dir="rtl">', "</div>");
    input(el).focus();
    await press(el, "{Enter}");
    await press(el, "{ArrowLeft}");
    expect(focused(el)).toBe(option(el, "Hangzhou"));
    await press(el, "{ArrowRight}");
    expect(focused(el)).toBe(option(el, "Zhejiang"));
  });

  it("moves focus into a lazily loaded column with ArrowRight", async () => {
    const el = await setup("", [
      { value: "fe", label: "Frontend" },
      { value: "docs", label: "Docs", isLeaf: true },
    ]);
    el.loadData = (path) => {
      const target = path[path.length - 1];
      el.options = el.options.map((o) =>
        o.value === target.value ? { ...o, loading: true } : o,
      );
      setTimeout(() => {
        el.options = el.options.map((o) =>
          o.value === target.value
            ? {
                ...o,
                loading: false,
                children: [
                  { value: "a", label: "Team A", isLeaf: true },
                  { value: "b", label: "Team B", isLeaf: true },
                ],
              }
            : o,
        );
      }, 20);
    };
    input(el).focus();
    await press(el, "{ArrowDown}");
    expect(focused(el)).toBe(option(el, "Frontend"));
    await press(el, "{ArrowRight}");
    expect(option(el, "Frontend")).toHaveAttribute("aria-busy", "true");
    await wait(40);
    await settle();
    expect(focused(el)).toBe(option(el, "Team A"));
  });

  it("Tab on an option closes the panel", async () => {
    const el = await setup();
    input(el).focus();
    await press(el, "{ArrowDown}");
    expect(dropdown(el)).not.toBeNull();
    await press(el, "{Tab}");
    expect(dropdown(el)).toBeNull();
  });

  it("search: ArrowDown moves into the results, arrows wrap, Enter selects", async () => {
    const el = await setup("show-search");
    const onChange = vi.fn();
    el.addEventListener("minerva-change", onChange);
    await userEvent.click(input(el));
    await userEvent.type(input(el), "hang", { skipClick: true });
    await settle();
    await press(el, "{ArrowDown}");
    const results = Array.from(
      shadow(el).querySelectorAll<HTMLElement>('[role="option"]'),
    );
    expect(focused(el)).toBe(results[0]);
    await press(el, "{ArrowDown}");
    expect(focused(el)).toBe(results[1]);
    await press(el, "{ArrowUp}{ArrowUp}");
    expect(focused(el)).toBe(results[1]);
    await press(el, "{Enter}");
    expect(onChange.mock.calls[0][0].detail.value).toEqual([
      "zhejiang",
      "hangzhou",
      "xihu",
    ]);
    expect(focused(el)).toBe(input(el));
  });

  it("search: typing opens a closed cascader; Escape closes and clears the text", async () => {
    const el = await setup("show-search");
    input(el).focus();
    await press(el, "nan");
    expect(dropdown(el)).not.toBeNull();
    expect(option(el, "Jiangsu / Nanjing")).toBeTruthy();
    await press(el, "{Escape}");
    expect(dropdown(el)).toBeNull();
    expect(input(el).value).toBe("");
  });

  it("inside a modal, Escape closes only the panel, then the modal", async () => {
    document.body.innerHTML = `<minerva-modal open label="Filter"><minerva-cascader label="Genre" name="genre"></minerva-cascader></minerva-modal>`;
    await settle();
    const modal = document.querySelector("minerva-modal")!;
    const el = document.querySelector<MinervaCascader>("minerva-cascader")!;
    el.options = genres;
    await settle();
    const onOpenChange = vi.fn();
    modal.addEventListener("minerva-open-change", (e) => {
      if (e.target === modal) onOpenChange((e as CustomEvent).detail.open);
    });
    input(el).focus();
    await press(el, "{ArrowDown}");
    expect(focused(el)).toBe(option(el, "Fiction"));
    await press(el, "{Escape}");
    expect(input(el)).toHaveAttribute("aria-expanded", "false");
    expect(focused(el)).toBe(input(el));
    expect(onOpenChange).not.toHaveBeenCalled();
    await press(el, "{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("<minerva-cascader> forms", () => {
  it("submits the displayed text under name (like lib-core's input), resets to the default path", async () => {
    document.body.innerHTML = `<form><minerva-cascader name="area" value="zhejiang,ningbo"></minerva-cascader></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaCascader>("minerva-cascader")!;
    el.options = options;
    await settle();
    expect(new FormData(form).get("area")).toBe("Zhejiang / Ningbo");

    el.value = ["jiangsu", "nanjing"];
    await settle();
    expect(new FormData(form).get("area")).toBe("Jiangsu / Nanjing");

    form.reset();
    await settle();
    expect(el.value).toEqual(["zhejiang", "ningbo"]);
    expect(input(el).value).toBe("Zhejiang / Ningbo");
  });

  it("required: an empty selection is valueMissing with the localized select message", async () => {
    document.body.innerHTML = `<form lang="fr"><minerva-cascader name="area" required></minerva-cascader></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaCascader>("minerva-cascader")!;
    el.options = options;
    await settle();
    expect(input(el)).toHaveAttribute("aria-required", "true");
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe(
      "Veuillez sélectionner un élément de la liste.",
    );
    expect(form.checkValidity()).toBe(false);
    el.value = ["jiangsu", "nanjing"];
    await settle();
    expect(el.checkValidity()).toBe(true);
  });

  it("uses the English select message by default", async () => {
    const el = await setup("required");
    expect(el.validationMessage).toBe("Please select an item in the list.");
  });

  it("is disabled by a disabled fieldset and not submitted", async () => {
    document.body.innerHTML = `<form><fieldset disabled><minerva-cascader name="area" value="jiangsu" required></minerva-cascader></fieldset></form>`;
    await settle();
    const el = document.querySelector<MinervaCascader>("minerva-cascader")!;
    el.options = options;
    el.formDisabledCallback(true); // the polyfill does not observe fieldsets
    await settle();
    expect(input(el).disabled).toBe(true);
    expect(
      new FormData(document.querySelector("form")!).get("area"),
    ).toBeNull();
    expect(el.checkValidity()).toBe(true);
    await userEvent.click($(el, ".arrow"));
    await settle();
    expect(dropdown(el)).toBeNull();
  });

  it("restores the saved path (bfcache / autofill)", async () => {
    const el = await setup();
    el.formStateRestoreCallback(JSON.stringify(["jiangsu", "nanjing"]));
    await settle();
    expect(el.value).toEqual(["jiangsu", "nanjing"]);
    expect(input(el).value).toBe("Jiangsu / Nanjing");
  });
});

describe("<minerva-cascader> dev warnings", () => {
  it("warns when the value is not a path of the options", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await setup();
    el.value = ["zhejiang", "nowhere"];
    await settle();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("is not a path of the options tree"),
    );
  });

  it("warns about duplicate sibling values", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup("", [
      { value: "a", label: "A" },
      { value: "a", label: "A again" },
    ]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('duplicate option value "a"'),
    );
  });

  it("does not warn for a valid tree and value", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup('value="zhejiang,hangzhou,xihu"');
    expect(warn).not.toHaveBeenCalled();
  });
});
