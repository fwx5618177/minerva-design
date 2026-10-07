// Compat "inputs" group: novel-isr-ui names and prop shapes (copied from
// novel's own tests and from real app usages), under the default "en"
// library language (Chinese defaults are passed explicitly by the adapters).
import { createRef, useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Autocomplete,
  Checkbox,
  MonthCalendar,
  Radio,
  RadioGroup,
  Rating,
  RatingScale,
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  Switch,
  type AutocompleteOption,
  type AutocompleteProps,
  type AutocompleteSize,
  type CheckboxColorScheme,
  type CheckboxProps,
  type CheckboxSize,
  type MonthCalendarEvent,
  type MonthCalendarProps,
  type RadioGroupProps,
  type RadioProps,
  type RadioSize,
  type RatingDimension,
  type RatingProps,
  type RatingScaleProps,
  type RatingSize,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectProps,
  type SelectSeparatorProps,
  type SelectSize,
  type SwitchColorScheme,
  type SwitchProps,
  type SwitchSize,
  type SwitchVariant,
} from "./inputs";
import { FormControl, FormHelperText, FormLabel } from "./forms";

// type-level: novel prop shapes are accepted
const _types: [
  CheckboxSize,
  CheckboxColorScheme,
  RadioSize,
  SwitchSize,
  SwitchVariant,
  SwitchColorScheme,
  SelectSize,
  AutocompleteSize,
  RatingSize,
] = ["sm", "danger", "md", "lg", "segmented", "success", "sm", "md", "lg"];
void _types;
const _props: [
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  SwitchProps,
  SelectProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  AutocompleteProps,
  RatingProps,
  RatingScaleProps,
  MonthCalendarProps,
] = [
  { checked: "indeterminate", onCheckedChange: () => {}, isInvalid: true },
  { value: "a", size: "sm" },
  { value: "a", onValueChange: () => {}, direction: "row" },
  { checked: true, onCheckedChange: () => {}, colorScheme: "danger" },
  { value: "a", onValueChange: () => {}, "aria-label": "x", children: null },
  { value: "a", children: "A", textValue: "A" },
  {},
  {},
  { value: "", onValueChange: () => {}, options: [] },
  { value: 1, size: "sm", title: "t" },
  { dimensions: [] },
  {
    month: new Date(),
    onMonthChange: () => {},
    onValueChange: () => {},
    events: [],
  },
];
void _props;

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("compat Checkbox", () => {
  it("maps size / colorScheme / isInvalid and onCheckedChange (app usage)", async () => {
    const user = setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        size="lg"
        colorScheme="danger"
        isInvalid
        className="consumer"
        onCheckedChange={onCheckedChange}
      >
        Agree
      </Checkbox>,
    );
    const box = screen.getByRole("checkbox", { name: "Agree" });
    expect(box).toHaveClass("ui-checkbox-control");
    expect(box.closest("label")).toHaveClass(
      "ui-checkbox-root",
      "ui-checkbox-size-lg",
      "ui-checkbox-color-danger",
      "ui-checkbox-error",
      "consumer",
    );
    await user.click(screen.getByText("Agree"));
    expect(box).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it("renders checked='indeterminate' as mixed and resolves it on click", async () => {
    const user = setup();
    function App() {
      const [checked, setChecked] = useState<boolean | "indeterminate">(
        "indeterminate",
      );
      return (
        <Checkbox checked={checked} onCheckedChange={setChecked}>
          All
        </Checkbox>
      );
    }
    render(<App />);
    const box = screen.getByRole("checkbox");
    expect(box).toBePartiallyChecked();
    await user.click(box);
    expect(box).toBeChecked();
    expect(box).not.toHaveAttribute("aria-checked");
  });

  it("forwards ref, id, value, required, aria-describedby and FormControl state", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <span id="hint">Hint</span>
        <Checkbox
          ref={ref}
          id="agree"
          value="yes"
          required
          aria-describedby="hint"
          defaultChecked
        >
          A
        </Checkbox>
        <FormControl isInvalid isDisabled>
          <Checkbox>B</Checkbox>
        </FormControl>
      </>,
    );
    const a = screen.getByRole("checkbox", { name: "A" });
    expect(ref.current).toBe(a);
    expect(a).toBeChecked();
    expect(a).toHaveAttribute("id", "agree");
    expect(a).toHaveAttribute("value", "yes");
    expect(a).toBeRequired();
    expect(a).toHaveAccessibleDescription("Hint");
    const b = screen.getByRole("checkbox", { name: "B" });
    expect(b).toBeDisabled();
    expect(b.closest("label")).toHaveClass("ui-checkbox-error");
  });
});

describe("compat RadioGroup / Radio", () => {
  it("selects with onValueChange, direction='row' and per-item size override", async () => {
    const user = setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        aria-label="Size"
        size="lg"
        direction="row"
        defaultValue="s"
        onValueChange={onValueChange}
      >
        <Radio value="s">Small</Radio>
        <Radio value="l" size="sm" className="consumer">
          Large
        </Radio>
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: "Size" });
    expect(group).toHaveClass("ui-radio-group");
    expect(group).toHaveAttribute("data-direction", "row");
    expect(
      screen.getByRole("radio", { name: "Small" }).closest("label"),
    ).toHaveClass("ui-radio-size-lg");
    expect(
      screen.getByRole("radio", { name: "Large" }).closest("label"),
    ).toHaveClass("ui-radio-size-sm");
    await user.click(screen.getByText("Large"));
    expect(onValueChange).toHaveBeenLastCalledWith("l");
  });

  it("respects a controlled value (app usage) and FormControl disabled", async () => {
    const user = setup();
    function App() {
      const [v, setV] = useState("a");
      return (
        <RadioGroup value={v} onValueChange={setV} aria-label="g">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>
      );
    }
    render(
      <>
        <App />
        <FormControl isDisabled>
          <RadioGroup aria-label="d">
            <Radio value="x">X</Radio>
          </RadioGroup>
        </FormControl>
      </>,
    );
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "X" })).toBeDisabled();
  });
});

describe("compat Switch", () => {
  it("toggles with onCheckedChange and maps size / colorScheme (app usage)", async () => {
    const user = setup();
    function App() {
      const [on, setOn] = useState(false);
      return (
        <Switch
          checked={on}
          onCheckedChange={setOn}
          size="sm"
          colorScheme="danger"
          aria-label="Dark"
          className="c"
        />
      );
    }
    render(<App />);
    const sw = screen.getByRole("switch", { name: "Dark" });
    const root = sw.closest(".ui-switch-root")!;
    expect(root).toHaveClass(
      "ui-switch-size-sm",
      "ui-switch-color-danger",
      "c",
    );
    await user.click(sw);
    expect(sw).toBeChecked();
    expect(root).toHaveAttribute("data-state", "checked");
  });

  it("segmented variant with offLabel / onLabel (app usage)", async () => {
    const user = setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch
        variant="segmented"
        offLabel="BFF"
        onLabel="Mock"
        defaultChecked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    expect(screen.queryByRole("switch")).toBeNull();
    expect(screen.getByRole("group")).toHaveClass(
      "ui-switch-segmented",
      "ui-switch-segmented-size-md",
    );
    await user.click(screen.getByRole("button", { name: "Mock" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "Mock" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("compat Select", () => {
  it("renders the novel API with onValueChange (app usage)", async () => {
    const user = setup();
    const onValueChange = vi.fn();
    render(
      <Select
        aria-label="Language"
        placeholder="Pick one"
        size="sm"
        isInvalid
        onValueChange={onValueChange}
      >
        <SelectItem value="zh">Chinese</SelectItem>
        <SelectSeparator data-testid="sep" />
        <SelectGroup>
          <SelectLabel>Experimental</SelectLabel>
          <SelectItem value="en">English</SelectItem>
        </SelectGroup>
      </Select>,
    );
    const t = screen.getByRole("combobox", { name: "Language" });
    expect(t).toHaveClass(
      "ui-select-trigger",
      "ui-select-size-sm",
      "ui-select-error",
    );
    expect(t).toHaveTextContent("Pick one");
    await user.click(t);
    expect(screen.getByText("Experimental")).toHaveClass("ui-select-label");
    expect(screen.getByTestId("sep")).toHaveClass("ui-select-separator");
    await user.click(await screen.findByRole("option", { name: "English" }));
    expect(onValueChange).toHaveBeenCalledWith("en");
    expect(t).toHaveTextContent("English");
  });

  it("wires FormControl label, helper text and required", () => {
    render(
      <FormControl id="genre" isRequired>
        <FormLabel>Genre</FormLabel>
        <Select placeholder="Pick">
          <SelectItem value="a">A</SelectItem>
        </Select>
        <FormHelperText>Shown on the book page</FormHelperText>
      </FormControl>,
    );
    const t = screen.getByRole("combobox", { name: /Genre/ });
    expect(t).toHaveAttribute("id", "genre");
    expect(t).toHaveAccessibleDescription("Shown on the book page");
    expect(t).toHaveAttribute("aria-required", "true");
  });
});

describe("compat Autocomplete", () => {
  const OPTIONS: AutocompleteOption[] = [
    { id: "1", label: "诡秘之主", hint: "爱潜水的乌贼" },
    { id: "2", label: "雪中悍刀行", hint: "烽火戏诸侯" },
    { id: "3", label: "Go to settings", filterValue: "设置", group: "命令" },
  ];
  const input = () => screen.getByRole("combobox", { name: "search" });
  const key = (k: string) =>
    act(() => {
      input().dispatchEvent(
        new KeyboardEvent("keydown", { key: k, bubbles: true }),
      );
    });

  it("header search usage: highlight + Enter selects the novel option, typing is controlled", () => {
    const onSelect = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        value=""
        onValueChange={onValueChange}
        options={OPTIONS}
        onSelect={onSelect}
        onSubmit={vi.fn()}
        placeholder="搜书名 / 作者 / tag"
        aria-label="search"
        emptyText="无匹配建议，回车搜索"
      />,
    );
    act(() => input().focus());
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByText("命令")).toHaveClass("ui-autocomplete-group");
    key("ArrowDown");
    key("Enter");
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("filters by label / hint / filterValue and submits unmatched text", () => {
    const onSubmit = vi.fn();
    const { rerender } = render(
      <Autocomplete
        value="乌贼"
        onValueChange={vi.fn()}
        options={OPTIONS}
        aria-label="search"
      />,
    );
    act(() => input().focus());
    expect(screen.getAllByRole("option")).toHaveLength(1);
    rerender(
      <Autocomplete
        value="设置"
        onValueChange={vi.fn()}
        options={OPTIONS}
        aria-label="search"
      />,
    );
    expect(screen.getAllByRole("option")[0]).toHaveTextContent(
      "Go to settings",
    );
    rerender(
      <Autocomplete
        value="不存在的书名"
        onValueChange={vi.fn()}
        options={OPTIONS}
        onSubmit={onSubmit}
        aria-label="search"
      />,
    );
    expect(screen.getByText("无匹配项")).toHaveClass("ui-autocomplete-empty");
    key("Enter");
    expect(onSubmit).toHaveBeenCalledWith("不存在的书名");
  });

  it("disabled / readOnly never open; onOpenChange notifies", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Autocomplete
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        aria-label="search"
        onOpenChange={onOpenChange}
        size="sm"
      />,
    );
    act(() => input().focus());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    rerender(
      <Autocomplete
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        aria-label="search"
        disabled
      />,
    );
    expect(input()).toBeDisabled();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    rerender(
      <Autocomplete
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        aria-label="search"
        readOnly
      />,
    );
    act(() => input().click());
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
});

describe("compat Rating / RatingScale", () => {
  it("app usages: size='sm' showValue, size='lg', passthrough attributes", () => {
    const { container } = render(
      <>
        <Rating value={8.64} size="sm" showValue data-testid="r" />
        <Rating value={9} size="lg" />
      </>,
    );
    const r = screen.getByTestId("r");
    expect(r).toHaveClass("ui-rating", "ui-rating-size-sm");
    expect(r).toHaveAttribute("aria-label", "8.6 / 10");
    expect(container.querySelectorAll(".ui-rating-size-lg")).toHaveLength(1);
    expect(r.querySelector(".ui-rating-value strong")).toHaveTextContent("8.6");
  });

  it("interactive rating and scale", async () => {
    const user = setup();
    const onChange = vi.fn();
    const dims: RatingDimension[] = [{ key: "plot", label: "剧情", value: 8 }];
    render(
      <>
        <Rating value={3} max={5} onChange={onChange} />
        <RatingScale dimensions={dims} onChange={onChange} size="sm" />
      </>,
    );
    screen.getByRole("slider", { name: "3.0 / 5" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
    screen.getByRole("slider", { name: "剧情 8.0 / 10" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("plot", 9);
  });
});

describe("compat MonthCalendar", () => {
  const events: MonthCalendarEvent[] = [
    { id: "a", date: "2024-02-29", title: "Release" },
  ];

  it("uses novel's Chinese strings under the default en language", () => {
    const onMonthChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <MonthCalendar
        month={new Date(2024, 1, 29)}
        onMonthChange={onMonthChange}
        value="2024-02-29"
        onValueChange={onValueChange}
        events={events}
      />,
    );
    expect(screen.getByRole("region", { name: "月历" })).toHaveClass(
      "ui-month-calendar",
    );
    expect(screen.getByRole("grid", { name: "2024年2月" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("一");
    expect(
      screen.getByRole("button", { name: "2024-02-29，1 项日程" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("region", { name: "2024-02-29 日程" }),
    ).toHaveTextContent("Release");
    act(() => screen.getByRole("button", { name: "下个月" }).click());
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2024, 2, 1));
    expect(screen.getByRole("button", { name: "上个月" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "今天" })).toBeInTheDocument();
    act(() => screen.getByRole("button", { name: "2024-02-10" }).click());
    expect(onValueChange).toHaveBeenCalledWith("2024-02-10");
  });

  it("shows 暂无日程 and accepts a custom aria-label", () => {
    render(
      <MonthCalendar
        month={new Date(2024, 1, 1)}
        onMonthChange={vi.fn()}
        value="2024-02-12"
        onValueChange={vi.fn()}
        events={events}
        aria-label="日程表"
      />,
    );
    expect(screen.getByRole("region", { name: "日程表" })).toBeInTheDocument();
    expect(screen.getByText("暂无日程")).toBeInTheDocument();
  });
});

describe("compat parity", () => {
  it("Autocomplete: loading row, adjacent groups, aria-describedby and composition handlers", () => {
    const onCompositionStart = vi.fn();
    const onCompositionEnd = vi.fn();
    render(
      <>
        <span id="hint">按书名搜索</span>
        <Autocomplete
          value=""
          onValueChange={vi.fn()}
          aria-label="search"
          aria-describedby="hint"
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          loading
          options={[
            { id: "1", label: "A", group: "最近" },
            { id: "2", label: "B", group: "热门" },
            { id: "3", label: "C", group: "最近" },
          ]}
        />
      </>,
    );
    const input = screen.getByRole("combobox", { name: "search" });
    expect(input).toHaveAccessibleDescription("按书名搜索");
    fireEvent.compositionStart(input);
    fireEvent.compositionEnd(input);
    expect(onCompositionStart).toHaveBeenCalledTimes(1);
    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
    act(() => input.focus());
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByText("加载中…")).toHaveClass("ui-autocomplete-loading");
    expect(
      Array.from(document.querySelectorAll(".ui-autocomplete-group")).map(
        (el) => el.textContent,
      ),
    ).toEqual(["最近", "热门", "最近"]);
  });

  it("RadioGroup value={null} stays controlled with no selection", async () => {
    const user = setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup value={null} onValueChange={onValueChange} aria-label="g">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
    screen.getAllByRole("radio").forEach((r) => expect(r).not.toBeChecked());
  });

  it("Autocomplete renders the empty text inside the controlled listbox", () => {
    render(
      <Autocomplete
        value="不存在的书名"
        onValueChange={vi.fn()}
        options={[{ id: "1", label: "诡秘之主" }]}
        aria-label="search"
      />,
    );
    const input = screen.getByRole("combobox", { name: "search" });
    act(() => input.focus());
    const listbox = screen.getByRole("listbox");
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(listbox).toHaveTextContent("无匹配项");
  });
});
