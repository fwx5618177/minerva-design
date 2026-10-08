import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref } from "vue";
import { Cascader, type CascaderOption, type CascaderProps } from ".";

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

type Props = Partial<CascaderProps> & Record<string, unknown>;

const renderCascader = (props: Props = {}, slots?: Record<string, unknown>) =>
  render(Cascader, {
    props: { label: "Area", name: "area", options, ...props },
    slots: slots as never,
  });

const getInput = () => screen.getByRole("combobox") as HTMLInputElement;
const getDropdown = () => document.querySelector<HTMLElement>(".dropdown");
const getColumns = () =>
  Array.from(document.querySelectorAll<HTMLElement>(".dropdown .column"));

const open = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(getInput());
  expect(getDropdown()).toBeInTheDocument();
};

describe("Cascader", () => {
  it("renders a read-only input with a placeholder, the name and the hooks", () => {
    const { container } = renderCascader();
    const input = getInput();
    expect(input).toHaveAttribute("name", "area");
    expect(input).toHaveAttribute("placeholder", "Please select");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    expect(input).toHaveAttribute("aria-label", "Area");
    expect(input).not.toHaveAttribute("aria-autocomplete");
    expect(input).toHaveValue("");
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("cascader");
    expect(root.style.width).toBe("240px");
    expect(root).toHaveAttribute("data-minerva", "cascader");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-state", "closed");
    expect(container.querySelector('[data-part="control"]')).toHaveClass(
      "selector",
    );
    expect(container.querySelector('[data-part="icon"]')).toHaveClass("arrow");
    expect(input.parentElement).toHaveClass("input", "unstyled");
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("applies class, width (number or string) and a custom placeholder", async () => {
    const { container, rerender } = renderCascader({
      class: "custom",
      width: 320,
      placeholder: "Choose area",
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("cascader", "custom");
    expect(root.style.width).toBe("320px");
    expect(getInput()).toHaveAttribute("placeholder", "Choose area");
    await rerender({ width: "50%" });
    expect(root.style.width).toBe("50%");
  });

  it("opens the dropdown in a portal when the input is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderCascader();
    await open(user);
    const dropdown = getDropdown()!;
    expect(container.contains(dropdown)).toBe(false);
    expect(container.querySelector(".selector")).toHaveClass("focused");
    expect(container.querySelector(".arrow")).toHaveClass("open");
    expect(container.firstElementChild).toHaveAttribute("data-state", "open");
    expect(dropdown).toHaveAttribute("data-minerva", "cascader");
    expect(dropdown).toHaveAttribute("data-part", "content");
    expect(dropdown).toHaveAttribute("data-state", "open");
    expect(dropdown).toHaveAttribute("data-placement");
    const columns = getColumns();
    expect(columns).toHaveLength(1);
    expect(columns[0]).toHaveAttribute("data-part", "column");
    expect(columns[0]).toHaveAttribute("aria-label", "Area, level 1");
    expect(
      within(columns[0])
        .getAllByRole("option")
        .map((li) => li.textContent?.trim()),
    ).toEqual(["Zhejiang", "Jiangsu", "Tibet"]);
  });

  it("toggles the dropdown with the arrow", async () => {
    const user = userEvent.setup();
    const { container } = renderCascader();
    const arrow = container.querySelector(".arrow") as HTMLElement;
    await user.click(arrow);
    expect(getDropdown()).toBeInTheDocument();
    await user.click(arrow);
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("does not open on focus alone; opens with ArrowDown and closes on a second click", async () => {
    const user = userEvent.setup();
    renderCascader();
    await user.tab();
    expect(getInput()).toHaveFocus();
    expect(getDropdown()).not.toBeInTheDocument();
    expect(getInput()).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowDown}");
    expect(getDropdown()).toBeInTheDocument();
    expect(getInput()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
    await user.click(getInput());
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    renderCascader();
    await open(user);
    await user.click(document.body);
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("expands children on click and selects a nested leaf with the full path", async () => {
    const user = userEvent.setup();
    const { emitted } = renderCascader();
    await open(user);
    await user.click(screen.getByText("Zhejiang"));
    expect(emitted("change")).toBeUndefined();
    expect(getColumns()).toHaveLength(2);
    const zj = screen.getByText("Zhejiang").closest("li")!;
    expect(zj).toHaveAttribute("aria-controls", getColumns()[1].id);
    await user.click(screen.getByText("Hangzhou"));
    expect(getColumns()).toHaveLength(3);
    await user.click(screen.getByText("West Lake"));
    expect(emitted("change")).toEqual([
      [
        ["zhejiang", "hangzhou", "xihu"],
        [zhejiang, hangzhou, xihu],
      ],
    ]);
    expect(emitted("update:modelValue")).toEqual([
      [["zhejiang", "hangzhou", "xihu"]],
    ]);
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");
    expect(getDropdown()).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it("highlights the selected path when reopened", async () => {
    const user = userEvent.setup();
    renderCascader();
    await open(user);
    await user.click(screen.getByText("Jiangsu"));
    await user.click(screen.getByText("Nanjing"));
    await user.click(getInput());
    expect(getDropdown()).toBeInTheDocument();
    expect(getColumns()).toHaveLength(2);
    expect(screen.getByText("Jiangsu").closest("li")).toHaveClass("active");
    expect(screen.getByText("Nanjing").closest("li")).toHaveClass("active");
    expect(screen.getByText("Nanjing").closest("li")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("ignores disabled options", async () => {
    const user = userEvent.setup();
    const { emitted } = renderCascader();
    await open(user);
    const tibetItem = screen.getByText("Tibet").closest("li")!;
    expect(tibetItem).toHaveClass("disabled");
    expect(tibetItem).toHaveAttribute("aria-disabled", "true");
    expect(tibetItem).toHaveAttribute("tabindex", "-1");
    await user.click(screen.getByText("Tibet"));
    expect(emitted("change")).toBeUndefined();
    expect(getDropdown()).toBeInTheDocument();
  });

  it("expands children on hover when expandTrigger is hover", async () => {
    const user = userEvent.setup();
    const { emitted } = renderCascader({ expandTrigger: "hover" });
    await open(user);
    await user.hover(screen.getByText("Tibet"));
    expect(getColumns()).toHaveLength(1);
    await user.hover(screen.getByText("Jiangsu"));
    expect(getColumns()).toHaveLength(2);
    const jiangsuOption = screen.getByText("Jiangsu").closest("li");
    expect(jiangsuOption).toHaveAttribute("data-expanded", "");
    expect(jiangsuOption).toHaveAttribute("aria-controls", getColumns()[1].id);
    await user.click(screen.getByText("Nanjing"));
    expect(emitted("change")).toEqual([
      [
        ["jiangsu", "nanjing"],
        [jiangsu, nanjing],
      ],
    ]);
  });

  it("does not expand on hover with the default click trigger", async () => {
    const user = userEvent.setup();
    renderCascader();
    await open(user);
    await user.hover(screen.getByText("Jiangsu"));
    expect(getColumns()).toHaveLength(1);
  });

  it("limits the number of columns with maxLevel", async () => {
    const user = userEvent.setup();
    renderCascader({ maxLevel: 2 });
    await open(user);
    await user.click(screen.getByText("Zhejiang"));
    expect(getColumns()).toHaveLength(2);
    const hangzhouItem = screen.getByText("Hangzhou").closest("li");
    expect(hangzhouItem?.querySelector(".expandIcon")).toBeNull();
    expect(
      screen.getByText("Zhejiang").closest("li")?.querySelector(".expandIcon"),
    ).toBeInTheDocument();
    await user.click(screen.getByText("Hangzhou"));
    expect(getDropdown()).not.toBeInTheDocument();
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou");
  });

  it("does not expand on hover past maxLevel", async () => {
    const user = userEvent.setup();
    renderCascader({ maxLevel: 1, expandTrigger: "hover" });
    await open(user);
    await user.hover(screen.getByText("Jiangsu"));
    expect(getColumns()).toHaveLength(1);
  });

  it("displays labels for defaultValue and clears them", async () => {
    const user = userEvent.setup();
    const { container, emitted } = renderCascader({
      defaultValue: ["zhejiang", "ningbo"],
    });
    expect(getInput()).toHaveValue("Zhejiang / Ningbo");
    const clear = container.querySelector(".clearIcon") as HTMLElement;
    expect(clear).toHaveAttribute("data-part", "clear-button");
    expect(clear).toHaveAttribute("aria-label", "Clear selection");
    await user.click(clear);
    expect(emitted("change")).toEqual([[[], []]]);
    expect(getInput()).toHaveValue("");
    expect(container.querySelector(".clearIcon")).toBeNull();
    expect(getDropdown()).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it("follows controlled value changes after mount", async () => {
    const { rerender } = renderCascader({ modelValue: ["jiangsu", "nanjing"] });
    expect(getInput()).toHaveValue("Jiangsu / Nanjing");
    await rerender({ modelValue: ["zhejiang", "hangzhou", "xihu"] });
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");
    await rerender({ modelValue: [] });
    expect(getInput()).toHaveValue("");
    expect(document.querySelector(".clearIcon")).not.toBeInTheDocument();
  });

  it("resolves labels for a controlled value when options arrive later", async () => {
    const { rerender } = renderCascader({
      options: [],
      modelValue: ["jiangsu"],
    });
    expect(getInput()).toHaveValue("");
    await rerender({ options });
    expect(getInput()).toHaveValue("Jiangsu");
  });

  it("works with v-model", async () => {
    const user = userEvent.setup();
    const value = ref<(string | number)[]>(["jiangsu", "nanjing"]);
    render(
      defineComponent(
        () => () =>
          h(Cascader, {
            label: "Area",
            name: "area",
            options,
            modelValue: value.value,
            "onUpdate:modelValue": (v: (string | number)[]) =>
              (value.value = v),
          }),
      ),
    );
    await open(user);
    await user.click(screen.getByText("Zhejiang"));
    await user.click(screen.getByText("Ningbo"));
    expect(value.value).toEqual(["zhejiang", "ningbo"]);
    expect(getInput()).toHaveValue("Zhejiang / Ningbo");
  });

  it("hides the clear icon when allowClear is false", () => {
    const { container } = renderCascader({
      defaultValue: ["zhejiang", "ningbo"],
      allowClear: false,
    });
    expect(container.querySelector(".clearIcon")).toBeNull();
  });

  it("uses displayRender for the input text", async () => {
    const user = userEvent.setup();
    const displayRender = vi.fn((labels: string[]) => labels.join(" > "));
    renderCascader({ displayRender });
    await open(user);
    await user.click(screen.getByText("Jiangsu"));
    await user.click(screen.getByText("Nanjing"));
    expect(displayRender).toHaveBeenLastCalledWith(
      ["Jiangsu", "Nanjing"],
      [jiangsu, nanjing],
    );
    expect(getInput()).toHaveValue("Jiangsu > Nanjing");
  });

  it("does not open and shows no clear icon when disabled", async () => {
    const user = userEvent.setup();
    const { container } = renderCascader({
      disabled: true,
      invalid: true,
      defaultValue: ["zhejiang", "ningbo"],
    });
    expect(getInput()).toBeDisabled();
    expect(getInput()).toHaveAttribute("aria-invalid", "true");
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("data-disabled", "");
    expect(root).toHaveAttribute("data-invalid", "");
    expect(container.querySelector(".selector")).toHaveClass("disabled");
    expect(container.querySelector(".clearIcon")).toBeNull();
    await user.click(container.querySelector(".arrow") as HTMLElement);
    expect(getDropdown()).not.toBeInTheDocument();
    getInput().focus();
    getInput().dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    await nextTick();
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("does not open while read-only", async () => {
    const user = userEvent.setup();
    const { container } = renderCascader({
      readOnly: true,
      defaultValue: ["zhejiang", "ningbo"],
    });
    expect(container.firstElementChild).toHaveAttribute("data-readonly", "");
    await user.click(getInput());
    expect(getDropdown()).not.toBeInTheDocument();
    expect(container.querySelector(".clearIcon")).toBeNull();
  });

  it("searches across all levels and selects a search result", async () => {
    const user = userEvent.setup();
    const { emitted } = renderCascader({ showSearch: true });
    const input = getInput();
    expect(input).not.toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    await user.click(input);
    await user.type(input, "hang", { skipClick: true });
    const results = Array.from(document.querySelectorAll(".searchOption"));
    expect(results.map((r) => r.textContent?.trim())).toEqual([
      "Zhejiang / Hangzhou",
      "Zhejiang / Hangzhou / West Lake",
    ]);
    expect(results[0]).toHaveAttribute("data-part", "item");
    expect(input).toHaveValue("hang");
    // clicking the field keeps a searchable dropdown open
    await user.click(input);
    expect(getDropdown()).toBeInTheDocument();
    await user.click(screen.getByText("Zhejiang / Hangzhou / West Lake"));
    expect(emitted("change")).toEqual([
      [
        ["zhejiang", "hangzhou", "xihu"],
        [zhejiang, hangzhou, xihu],
      ],
    ]);
    expect(input).toHaveValue("Zhejiang / Hangzhou / West Lake");
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("does not search while read-only", async () => {
    const user = userEvent.setup();
    renderCascader({ showSearch: true, readOnly: true });
    expect(getInput()).toHaveAttribute("aria-readonly", "true");
    await user.type(getInput(), "hang");
    expect(getDropdown()).not.toBeInTheDocument();
    expect(getInput()).toHaveValue("");
  });

  it("shows an empty message when the search has no results", async () => {
    const user = userEvent.setup();
    renderCascader({ showSearch: true });
    await user.click(getInput());
    await user.type(getInput(), "zzz", { skipClick: true });
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveClass("empty");
  });

  it("excludes disabled branches from search and supports a custom filter", async () => {
    const user = userEvent.setup();
    const filter = vi.fn((input: string, path: CascaderOption[]) =>
      path.some((o) => String(o.value) === input),
    );
    renderCascader({ showSearch: true, filter });
    await user.click(getInput());
    await user.type(getInput(), "jiangsu", { skipClick: true });
    expect(filter).toHaveBeenCalledWith("jiangsu", [jiangsu]);
    expect(filter).not.toHaveBeenCalledWith("jiangsu", [tibet]);
    expect(
      Array.from(document.querySelectorAll(".searchOption")).map((r) =>
        r.textContent?.trim(),
      ),
    ).toEqual(["Jiangsu", "Jiangsu / Nanjing"]);
  });

  it("calls loadData for non-leaf options without children", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn();
    const lazy: CascaderOption = { value: "lazy", label: "Lazy" };
    const leaf: CascaderOption = { value: "leaf", label: "Leaf", isLeaf: true };
    const { emitted } = renderCascader({ options: [lazy, leaf], loadData });
    await open(user);
    expect(
      screen.getByText("Lazy").closest("li")?.querySelector(".expandIcon"),
    ).not.toBeNull();
    await user.click(screen.getByText("Lazy"));
    expect(loadData).toHaveBeenCalledWith([lazy]);
    expect(emitted("change")).toBeUndefined();
    expect(getDropdown()).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Lazy" })).toHaveAttribute(
      "data-expanded",
      "",
    );
    await user.click(screen.getByText("Leaf"));
    expect(loadData).toHaveBeenCalledTimes(1);
    expect(emitted("change")).toEqual([[["leaf"], [leaf]]]);
  });

  it("does not call loadData again for a loading option", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn();
    renderCascader({
      options: [{ value: "x", label: "X", loading: true }],
      loadData,
    });
    await open(user);
    const item = screen.getByText("X").closest("li")!;
    expect(item).toHaveAttribute("data-loading", "");
    expect(item).toHaveAttribute("aria-busy", "true");
    expect(within(item).getByText("...")).toBeInTheDocument();
    await user.click(item);
    expect(loadData).not.toHaveBeenCalled();
    expect(item).toHaveAttribute("data-expanded", "");
  });

  it("supports the option slot, optionStyle, dropdownClassName and dropdownStyle", async () => {
    const user = userEvent.setup();
    const optionSlot = vi.fn(
      ({ option, level }: { option: CascaderOption; level: number }) =>
        h("span", `${option.label}-L${level}`),
    );
    renderCascader(
      {
        optionStyle: { color: "rgb(255, 0, 0)" },
        dropdownClassName: "myDropdown",
        dropdownStyle: { backgroundColor: "rgb(0, 0, 255)" },
      },
      { option: optionSlot },
    );
    await open(user);
    expect(getDropdown()).toHaveClass("dropdown", "myDropdown");
    expect(getDropdown()!.style.backgroundColor).toBe("rgb(0, 0, 255)");
    expect(screen.getByText("Zhejiang-L0")).toBeInTheDocument();
    expect(
      (screen.getByText("Zhejiang-L0").closest("li") as HTMLElement).style
        .color,
    ).toBe("rgb(255, 0, 0)");
    expect(optionSlot).toHaveBeenCalledWith(
      expect.objectContaining({ option: zhejiang, level: 0 }),
    );
  });

  it("keeps focus when pressing a non-option area of the dropdown", async () => {
    const user = userEvent.setup();
    renderCascader();
    await open(user);
    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    getColumns()[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    const onOption = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    screen.getByText("Jiangsu").dispatchEvent(onOption);
    expect(onOption.defaultPrevented).toBe(false);
  });

  it("forwards data-* attributes and exposes the input", () => {
    const exposed = ref<{ input: HTMLInputElement; focus: () => void }>();
    render(
      defineComponent(
        () => () =>
          h(Cascader, {
            ref: exposed,
            label: "Area",
            name: "area",
            options,
            "data-testid": "root",
            style: { margin: "4px" },
          }),
      ),
    );
    const root = screen.getByTestId("root");
    expect(root.style.margin).toBe("4px");
    expect(root.style.width).toBe("240px");
    expect(exposed.value!.input).toBe(getInput());
    exposed.value!.focus();
    expect(getInput()).toHaveFocus();
  });

  describe("keyboard / a11y", () => {
    it("exposes options with role=option and selects one with Enter", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader({
        options: [
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ],
      });
      await user.click(getInput());
      const alpha = screen.getByRole("option", { name: "Alpha" });
      expect(alpha).toHaveAttribute("tabindex", "0");
      alpha.focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("option", { name: "Beta" })).toHaveFocus();
      await user.keyboard("{ArrowUp}");
      expect(alpha).toHaveFocus();
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("option", { name: "Beta" })).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(emitted("change")).toEqual([
        [["b"], [expect.objectContaining({ value: "b" })]],
      ]);
    });

    it("closes the dropdown with Escape", async () => {
      const user = userEvent.setup();
      renderCascader({ options: [{ value: "a", label: "Alpha" }] });
      await user.click(getInput());
      expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("option", { name: "Alpha" })).toBeNull();
    });

    it("renders the clear icon as a labelled, keyboard operable button", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader({
        options: [{ value: "a", label: "Alpha" }],
        defaultValue: ["a"],
      });
      const clear = screen.getByRole("button", { name: "Clear selection" });
      clear.focus();
      await user.keyboard("{Enter}");
      expect(emitted("change")).toEqual([[[], []]]);
    });

    it("ignores other keys on the input and on disabled options", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader();
      getInput().focus();
      await user.keyboard("{Tab}");
      getInput().focus();
      await user.keyboard("a");
      expect(getDropdown()).not.toBeInTheDocument();
      await user.keyboard("{Enter}");
      // Enter / Space on an open dropdown keep it open
      getInput().focus();
      await user.keyboard("{Enter} ");
      expect(getDropdown()).toBeInTheDocument();
      const tibetItem = screen.getByRole("option", { name: "Tibet" });
      tibetItem.focus();
      await user.keyboard("{Enter}{ArrowRight}x");
      expect(emitted("change")).toBeUndefined();
      expect(getColumns()).toHaveLength(1);
    });
  });

  describe("regressions", () => {
    const LazyHarness = defineComponent({
      props: {
        loaded: { type: Object as () => Promise<void>, default: undefined },
      },
      emits: ["change"],
      setup(props, { emit }) {
        const opts = ref<CascaderOption[]>([
          { value: "fe", label: "Frontend" },
          { value: "docs", label: "Docs", isLeaf: true },
        ]);
        const loadData = (path: CascaderOption[]) => {
          const target = path[path.length - 1];
          opts.value = opts.value.map((o) =>
            o.value === target.value ? { ...o, loading: true } : o,
          );
          const finish = () => {
            opts.value = opts.value.map((o) =>
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
          };
          if (props.loaded) void props.loaded.then(finish);
          else setTimeout(finish, 20);
        };
        return () =>
          h(Cascader, {
            label: "Team",
            name: "team",
            options: opts.value,
            loadData,
            onChange: (...args: unknown[]) => emit("change", ...args),
          });
      },
    });

    it("loads children of a lazy option instead of selecting it", async () => {
      const user = userEvent.setup();
      let finishLoad!: () => void;
      const loaded = new Promise<void>((resolve) => {
        finishLoad = resolve;
      });
      const { emitted } = render(LazyHarness, { props: { loaded } });
      await open(user);
      await user.click(screen.getByText("Frontend"));
      expect(emitted("change")).toBeUndefined();
      expect(getDropdown()).toBeInTheDocument();
      expect(screen.getByText("Frontend").closest("li")).toHaveAttribute(
        "aria-busy",
        "true",
      );
      finishLoad();
      await screen.findByText("Team B");
      expect(getColumns()).toHaveLength(2);
      await user.click(screen.getByText("Team B"));
      expect((emitted("change") as unknown[][])[0][0]).toEqual(["fe", "b"]);
      expect(getInput()).toHaveValue("Frontend / Team B");
    });

    it("moves focus into a lazily loaded column with ArrowRight", async () => {
      const user = userEvent.setup();
      render(LazyHarness);
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("option", { name: "Frontend" })).toHaveFocus();
      await user.keyboard("{ArrowRight}");
      await waitFor(() =>
        expect(screen.getByRole("option", { name: "Team A" })).toHaveFocus(),
      );
    });

    it("navigates columns with the keyboard and returns focus to the input", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader();
      getInput().focus();
      await user.keyboard("{Enter}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await user.keyboard("{ArrowRight}{ArrowDown}{Enter}");
      expect(emitted("change")).toEqual([
        [
          ["zhejiang", "ningbo"],
          [zhejiang, ningbo],
        ],
      ]);
      expect(getDropdown()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("option", { name: "Ningbo" })).toHaveFocus();
      await user.keyboard("{Escape}");
      expect(getDropdown()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });

    it("moves focus into the panel with ArrowDown after a pointer opening", async () => {
      const user = userEvent.setup();
      renderCascader();
      await open(user);
      expect(getInput()).toHaveFocus();
      await user.keyboard("{ArrowDown}");
      await waitFor(() =>
        expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus(),
      );
    });

    it("stays on the controlled value when the parent rejects a change", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader({
        modelValue: ["jiangsu", "nanjing"],
      });
      await open(user);
      await user.click(screen.getByText("Zhejiang"));
      await user.click(screen.getByText("Ningbo"));
      expect(emitted("change")).toEqual([
        [
          ["zhejiang", "ningbo"],
          [zhejiang, ningbo],
        ],
      ]);
      expect(getInput()).toHaveValue("Jiangsu / Nanjing");
    });

    it("closes when focus leaves with Tab", async () => {
      const user = userEvent.setup();
      render(
        defineComponent(() => () => [
          h(Cascader, { label: "Area", name: "area", options }),
          h("button", { type: "button" }, "Next"),
        ]),
      );
      getInput().focus();
      await user.keyboard("{ArrowDown}");
      expect(getDropdown()).toBeInTheDocument();
      await user.tab();
      expect(getDropdown()).not.toBeInTheDocument();
    });

    it("closes when focus moves to another element", async () => {
      const user = userEvent.setup();
      render(
        defineComponent(() => () => [
          h(Cascader, { label: "Area", name: "area", options }),
          h("button", { type: "button" }, "Next"),
        ]),
      );
      await open(user);
      // focus moving inside the field / dropdown keeps it open
      screen.getByRole("option", { name: "Zhejiang" }).focus();
      expect(getDropdown()).toBeInTheDocument();
      getInput().focus();
      expect(getDropdown()).toBeInTheDocument();
      screen.getByRole("button", { name: "Next" }).focus();
      await nextTick();
      expect(getDropdown()).not.toBeInTheDocument();
    });
  });

  describe("search keyboard", () => {
    it("moves from the input into the results and selects with Enter", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader({ showSearch: true });
      await user.click(getInput());
      await user.type(getInput(), "hang", { skipClick: true });
      await user.keyboard("{ArrowDown}");
      const results = screen.getAllByRole("option");
      expect(results[0]).toHaveFocus();
      await user.keyboard("{ArrowDown}");
      expect(results[1]).toHaveFocus();
      await user.keyboard("{ArrowUp}{ArrowUp}");
      expect(results[1]).toHaveFocus();
      await user.keyboard("x");
      await user.keyboard("{Enter}");
      expect(emitted("change")).toEqual([
        [
          ["zhejiang", "hangzhou", "xihu"],
          [zhejiang, hangzhou, xihu],
        ],
      ]);
      expect(getInput()).toHaveFocus();
    });

    it("selects a result with Space", async () => {
      const user = userEvent.setup();
      const { emitted } = renderCascader({ showSearch: true });
      await user.click(getInput());
      await user.type(getInput(), "nan", { skipClick: true });
      // Space types into a searchable input
      await user.keyboard("{ArrowDown} ");
      expect((emitted("change") as unknown[][])[0][0]).toEqual([
        "jiangsu",
        "nanjing",
      ]);
    });

    it("opens when typing into a closed searchable cascader", async () => {
      const user = userEvent.setup();
      renderCascader({ showSearch: true });
      getInput().focus();
      await user.keyboard("nan");
      expect(getDropdown()).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Jiangsu / Nanjing" }),
      ).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(getDropdown()).not.toBeInTheDocument();
      expect(getInput()).toHaveValue("");
    });

    it("supports Home / End and returns to the input with ArrowLeft on the first column", async () => {
      const user = userEvent.setup();
      renderCascader();
      getInput().focus();
      await user.keyboard(" ");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await user.keyboard("{End}");
      expect(screen.getByRole("option", { name: "Jiangsu" })).toHaveFocus();
      await user.keyboard("{Home}");
      expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
      await user.keyboard("{ArrowLeft}");
      expect(getDropdown()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });

    it("expands to the left in RTL", async () => {
      const user = userEvent.setup();
      render(
        defineComponent(
          () => () =>
            h("div", { dir: "rtl" }, [
              h(Cascader, { label: "Area", name: "area", options }),
            ]),
        ),
      );
      getInput().focus();
      await user.keyboard("{Enter}");
      const zj = screen.getByRole("option", { name: "Zhejiang" });
      expect(zj).toHaveFocus();
      expect(getDropdown()).toHaveAttribute("dir", "rtl");
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
    });
  });
});
