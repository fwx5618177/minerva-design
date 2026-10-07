import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Cascader from "./Cascader";
import type { CascaderOption, CascaderProps } from "./types";

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
const nanjing: CascaderOption = {
  value: "nanjing",
  label: "Nanjing",
};
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

const renderCascader = (props: Partial<CascaderProps> = {}) =>
  render(<Cascader label="Area" name="area" options={options} {...props} />);

const getInput = () => screen.getByRole("textbox");
const getDropdown = () => document.querySelector<HTMLElement>(".dropdown");
const getColumns = () =>
  Array.from(document.querySelectorAll<HTMLElement>(".dropdown .column"));

const open = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(getInput());
  expect(getDropdown()).toBeInTheDocument();
};

describe("Cascader", () => {
  it("renders a read-only input with a placeholder and the given name", () => {
    const { container } = renderCascader();

    const input = getInput();
    expect(input).toHaveAttribute("name", "area");
    expect(input).toHaveAttribute("placeholder", "Please select");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveValue("");
    expect(container.firstChild).toHaveStyle({ width: "240px" });
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("applies className, width and a custom placeholder", () => {
    const { container } = renderCascader({
      className: "custom",
      width: 320,
      placeholder: "Choose area",
    });

    expect(container.firstChild).toHaveClass("cascader", "custom");
    expect(container.firstChild).toHaveStyle({ width: "320px" });
    expect(getInput()).toHaveAttribute("placeholder", "Choose area");
  });

  it("opens the dropdown in a portal when the input is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderCascader();

    await open(user);

    const dropdown = getDropdown();
    expect(container).not.toContainElement(dropdown);
    expect(container.querySelector(".selector")).toHaveClass("focused");
    expect(container.querySelector(".arrow")).toHaveClass("open");
    await waitFor(() => expect(dropdown).toBeVisible());

    const columns = getColumns();
    expect(columns).toHaveLength(1);
    expect(
      within(columns[0])
        .getAllByRole("option")
        .map((li) => li.textContent),
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

  it("opens on keyboard focus and closes on a second input click", async () => {
    const user = userEvent.setup();
    renderCascader();

    await user.tab();
    expect(getInput()).toHaveFocus();
    expect(getDropdown()).toBeInTheDocument();

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
    const onChange = vi.fn();
    renderCascader({ onChange });

    await open(user);
    await user.click(screen.getByText("Zhejiang"));
    expect(onChange).not.toHaveBeenCalled();
    expect(getColumns()).toHaveLength(2);

    await user.click(screen.getByText("Hangzhou"));
    expect(getColumns()).toHaveLength(3);

    await user.click(screen.getByText("West Lake"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      ["zhejiang", "hangzhou", "xihu"],
      [zhejiang, hangzhou, xihu],
    );
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");
    expect(getDropdown()).not.toBeInTheDocument();
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
  });

  it("ignores disabled options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCascader({ onChange });

    await open(user);
    const tibetItem = screen.getByText("Tibet").closest("li");
    expect(tibetItem).toHaveClass("disabled");

    await user.click(screen.getByText("Tibet"));
    expect(onChange).not.toHaveBeenCalled();
    expect(getDropdown()).toBeInTheDocument();
  });

  it("expands children on hover when expandTrigger is hover", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCascader({ expandTrigger: "hover", onChange });

    await open(user);
    await user.hover(screen.getByText("Jiangsu"));

    expect(getColumns()).toHaveLength(2);
    expect(screen.getByText("Jiangsu").closest("li")).toHaveClass("hover");

    await user.click(screen.getByText("Nanjing"));
    expect(onChange).toHaveBeenCalledWith(
      ["jiangsu", "nanjing"],
      [jiangsu, nanjing],
    );
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

    // Hangzhou is at the last allowed level, so it shows no expand icon
    const hangzhouItem = screen.getByText("Hangzhou").closest("li");
    expect(hangzhouItem?.querySelector(".expandIcon")).toBeNull();
    expect(
      screen.getByText("Zhejiang").closest("li")?.querySelector(".expandIcon"),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Hangzhou"));
    expect(getColumns()).toHaveLength(2);
  });

  it("displays labels for defaultValue and clears them", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderCascader({
      defaultValue: ["zhejiang", "ningbo"],
      onChange,
    });

    expect(getInput()).toHaveValue("Zhejiang / Ningbo");

    const clear = container.querySelector(".clearIcon") as HTMLElement;
    await user.click(clear);

    expect(onChange).toHaveBeenCalledWith([], []);
    expect(getInput()).toHaveValue("");
    expect(container.querySelector(".clearIcon")).toBeNull();
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("follows controlled value changes after mount", () => {
    const { rerender } = renderCascader({ value: ["jiangsu", "nanjing"] });
    expect(getInput()).toHaveValue("Jiangsu / Nanjing");

    rerender(
      <Cascader
        label="Area"
        name="area"
        options={options}
        value={["zhejiang", "hangzhou", "xihu"]}
      />,
    );
    expect(getInput()).toHaveValue("Zhejiang / Hangzhou / West Lake");

    rerender(
      <Cascader label="Area" name="area" options={options} value={[]} />,
    );
    expect(getInput()).toHaveValue("");
    expect(document.querySelector(".clearIcon")).not.toBeInTheDocument();
  });

  it("resolves labels for a controlled value when options arrive later", () => {
    const { rerender } = render(
      <Cascader label="Area" name="area" options={[]} value={["jiangsu"]} />,
    );
    expect(getInput()).toHaveValue("");
    rerender(
      <Cascader
        label="Area"
        name="area"
        options={options}
        value={["jiangsu"]}
      />,
    );
    expect(getInput()).toHaveValue("Jiangsu");
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
      defaultValue: ["zhejiang", "ningbo"],
    });

    expect(getInput()).toBeDisabled();
    expect(container.querySelector(".selector")).toHaveClass("disabled");
    expect(container.querySelector(".clearIcon")).toBeNull();

    await user.click(container.querySelector(".arrow") as HTMLElement);
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("searches across all levels and selects a search result", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCascader({ showSearch: true, onChange });

    const input = getInput();
    expect(input).not.toHaveAttribute("readonly");

    await user.click(input);
    await user.type(input, "hang", { skipClick: true });

    const results = Array.from(document.querySelectorAll(".searchOption"));
    expect(results.map((r) => r.textContent)).toEqual([
      "Zhejiang / Hangzhou",
      "Zhejiang / Hangzhou / West Lake",
    ]);
    expect(input).toHaveValue("hang");

    await user.click(screen.getByText("Zhejiang / Hangzhou / West Lake"));
    expect(onChange).toHaveBeenCalledWith(
      ["zhejiang", "hangzhou", "xihu"],
      [zhejiang, hangzhou, xihu],
    );
    expect(input).toHaveValue("Zhejiang / Hangzhou / West Lake");
    expect(getDropdown()).not.toBeInTheDocument();
  });

  it("shows an empty message when the search has no results", async () => {
    const user = userEvent.setup();
    renderCascader({ showSearch: true });

    await user.click(getInput());
    await user.type(getInput(), "zzz", { skipClick: true });

    expect(screen.getByText("No results found")).toBeInTheDocument();
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
      Array.from(document.querySelectorAll(".searchOption")).map(
        (r) => r.textContent,
      ),
    ).toEqual(["Jiangsu", "Jiangsu / Nanjing"]);
  });

  it("calls loadData for non-leaf options without children", async () => {
    const user = userEvent.setup();
    const loadData = vi.fn();
    const onChange = vi.fn();
    const lazy: CascaderOption = { value: "lazy", label: "Lazy" };
    const leaf: CascaderOption = {
      value: "leaf",
      label: "Leaf",
      isLeaf: true,
    };
    renderCascader({ options: [lazy, leaf], loadData, onChange });

    await open(user);
    await user.click(screen.getByText("Lazy"));
    expect(loadData).toHaveBeenCalledWith([lazy]);
    // An option without children is also selected immediately
    expect(onChange).toHaveBeenCalledWith(["lazy"], [lazy]);

    await user.click(getInput());
    await user.click(screen.getByText("Leaf"));
    expect(loadData).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(["leaf"], [leaf]);
  });

  it("shows a loading indicator for loading options", async () => {
    const user = userEvent.setup();
    renderCascader({
      options: [{ value: "x", label: "X", loading: true }],
    });

    await open(user);
    const item = screen.getByText("X").closest("li");
    expect(item).toHaveClass("loading");
    expect(within(item as HTMLElement).getByText("...")).toBeInTheDocument();
  });

  it("supports optionRender, optionStyle, dropdownClassName and dropdownStyle", async () => {
    const user = userEvent.setup();
    const optionRender = vi.fn((option: CascaderOption, level: number) => (
      <span>
        {option.label}-L{level}
      </span>
    ));
    renderCascader({
      optionRender,
      optionStyle: { color: "rgb(255, 0, 0)" },
      dropdownClassName: "myDropdown",
      dropdownStyle: { backgroundColor: "rgb(0, 0, 255)" },
    });

    await open(user);

    expect(getDropdown()).toHaveClass("myDropdown");
    expect(getDropdown()).toHaveStyle({ backgroundColor: "rgb(0, 0, 255)" });
    expect(screen.getByText("Zhejiang-L0")).toBeInTheDocument();
    expect(screen.getByText("Zhejiang-L0").closest("li")).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
    expect(optionRender).toHaveBeenCalledWith(zhejiang, 0);
  });
  describe("keyboard / a11y", () => {
    it("exposes options with role=option and selects one with Enter", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Cascader
          label="Area"
          name="area"
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
          ]}
          onChange={onChange}
        />,
      );
      await user.click(screen.getByRole("textbox"));
      const alpha = screen.getByRole("option", { name: "Alpha" });
      expect(alpha).toHaveAttribute("tabindex", "0");
      alpha.focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("option", { name: "Beta" })).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenCalledWith(
        ["b"],
        [expect.objectContaining({ value: "b" })],
      );
    });

    it("closes the dropdown with Escape", async () => {
      const user = userEvent.setup();
      render(
        <Cascader
          label="Area"
          name="area"
          options={[{ value: "a", label: "Alpha" }]}
        />,
      );
      await user.click(screen.getByRole("textbox"));
      expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("option", { name: "Alpha" })).toBeNull();
    });

    it("renders the clear icon as a labelled, keyboard operable button", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Cascader
          label="Area"
          name="area"
          options={[{ value: "a", label: "Alpha" }]}
          defaultValue={["a"]}
          onChange={onChange}
        />,
      );
      const clear = screen.getByRole("button", { name: "Clear" });
      clear.focus();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenCalledWith([], []);
    });
  });
});
