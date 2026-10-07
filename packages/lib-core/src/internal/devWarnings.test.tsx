import { useState } from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEV_MESSAGE_PREFIX, formatDevMessage } from "@minerva/core";
import {
  controlledSwitchMessage,
  resetWarnings,
  warnControlledProps,
  warnOnce,
} from "./devWarnings";
import { useControllableState } from "./useControllableState";
import { useDisclosure } from "../hooks/useDisclosure";
import {
  Checkbox,
  IconButton,
  Input,
  Menu,
  Modal,
  NumberInput,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Radio,
  Rating,
  Select,
  SelectItem,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Table,
  Textarea,
  Tooltip,
} from "../index";

let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  resetWarnings();
  consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

/** Minerva warnings logged so far (React's own warnings filtered out). */
const warnings = () =>
  consoleError.mock.calls
    .map((args: unknown[]) => String(args[0]))
    .filter((message: string) => message.startsWith("[minerva]"));

const noop = () => {};

describe("channel and format (shared with @minerva/lib-web-components)", () => {
  it("logs with console.error, never console.warn, as `[minerva] <Component>: ...`", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    warnControlledProps("Input", {
      prop: "value",
      value: "a",
      handlerProp: "onChange",
    });
    expect(warn).not.toHaveBeenCalled();
    expect(warnings()).toHaveLength(1);
    expect(warnings()[0].startsWith(`${DEV_MESSAGE_PREFIX} Input: `)).toBe(
      true,
    );
    expect(controlledSwitchMessage("Tabs", "value", "defaultValue", true)).toBe(
      formatDevMessage(
        "Tabs",
        controlledSwitchMessage("Tabs", "value", "defaultValue", true).slice(
          "[minerva] Tabs: ".length,
        ),
      ),
    );
  });
});

describe("warnOnce", () => {
  it("logs a key once until reset", () => {
    warnOnce("k", "[minerva] X: first");
    warnOnce("k", "[minerva] X: second");
    expect(warnings()).toEqual(["[minerva] X: first"]);
    resetWarnings();
    warnOnce("k", "[minerva] X: third");
    expect(warnings()).toEqual(["[minerva] X: first", "[minerva] X: third"]);
  });

  it("is silent in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    warnOnce("k", "[minerva] X: message");
    render(<Checkbox checked label="Terms" />);
    expect(consoleError).not.toHaveBeenCalled();
  });
});

describe("controlled <-> uncontrolled switch", () => {
  const useHook = ({ value }: { value?: number }) =>
    useControllableState({ value, defaultValue: 0, name: "Thing" });

  it("warns once when an uncontrolled value becomes controlled", () => {
    const { rerender } = renderHook(useHook, { initialProps: {} });
    expect(warnings()).toEqual([]);
    rerender({ value: 1 });
    rerender({});
    rerender({ value: 2 });
    expect(warnings()).toEqual([
      "[minerva] Thing: the component is changing from uncontrolled to controlled `value`. " +
        "This is likely caused by `value` changing from undefined to a defined value, which should not happen. " +
        "Decide between a controlled `value` and an uncontrolled `defaultValue` for the lifetime of the component " +
        '(use `null` rather than `undefined` for "no value" where supported).',
    ]);
  });

  it("warns when a controlled value becomes uncontrolled", () => {
    const { rerender } = renderHook(useHook, {
      initialProps: { value: 1 } as { value?: number },
    });
    rerender({});
    expect(warnings()).toHaveLength(1);
    expect(warnings()[0]).toMatch(
      /^\[minerva\] Thing: the component is changing from controlled to uncontrolled `value`\. .*from a defined value to undefined/,
    );
  });

  it("warns once per component instance", () => {
    const Two = ({ value }: { value?: boolean }) => (
      <>
        <Checkbox checked={value} onChange={noop} label="A" />
        <Checkbox checked={value} onChange={noop} label="B" />
      </>
    );
    const { rerender } = render(<Two />);
    rerender(<Two value />);
    rerender(<Two />);
    rerender(<Two value />);
    expect(warnings()).toHaveLength(2);
    expect(warnings()[0]).toMatch(
      /^\[minerva\] Checkbox: the component is changing from uncontrolled to controlled `checked`\. .*uncontrolled `defaultChecked`/,
    );
  });

  it("does not warn for a stable mode", () => {
    const { rerender } = renderHook(useHook, { initialProps: { value: 1 } });
    rerender({ value: 2 });
    const uncontrolled = renderHook(useHook, { initialProps: {} });
    uncontrolled.rerender({});
    act(() => uncontrolled.result.current[1](5));
    expect(warnings()).toEqual([]);
  });

  it("covers hand-written controlled state (Input, Select)", () => {
    const { rerender } = render(<Input aria-label="Name" onChange={noop} />);
    rerender(<Input aria-label="Name" onChange={noop} value="x" />);
    const select = render(
      <Select aria-label="Lang" onChange={noop}>
        <SelectItem value="en">English</SelectItem>
      </Select>,
    );
    select.rerender(
      <Select aria-label="Lang" onChange={noop} value="en">
        <SelectItem value="en">English</SelectItem>
      </Select>,
    );
    expect(warnings()).toEqual([
      expect.stringMatching(
        /^\[minerva\] Input: the component is changing from uncontrolled to controlled `value`/,
      ),
      expect.stringMatching(
        /^\[minerva\] Select: the component is changing from uncontrolled to controlled `value`/,
      ),
    ]);
  });

  it("names overlay components (Modal `open`)", () => {
    const { rerender } = render(<Modal title="T" onOpenChange={noop} />);
    rerender(<Modal title="T" onOpenChange={noop} open={false} />);
    expect(warnings()).toEqual([
      expect.stringMatching(
        /^\[minerva\] Modal: the component is changing from uncontrolled to controlled `open`\. .*uncontrolled `defaultOpen`/,
      ),
    ]);
  });
});

describe("controlled prop without its handler", () => {
  it("Checkbox `checked` without onChange", () => {
    render(<Checkbox checked label="A" />);
    render(<Checkbox checked label="B" />);
    expect(warnings()).toEqual([
      "[minerva] Checkbox: `checked` was provided without an `onChange` handler, so user changes are ignored. " +
        "Add `onChange`, or use `defaultChecked` for an uncontrolled component, or set `disabled`.",
    ]);
  });

  it("does not warn with a handler, when disabled or uncontrolled", () => {
    render(<Checkbox checked onChange={noop} label="A" />);
    render(<Checkbox checked disabled label="B" />);
    render(<Checkbox defaultChecked label="C" />);
    render(<Switch checked disabled aria-label="S" />);
    render(<Input value="x" readOnly aria-label="I" />);
    render(<NumberInput value={1} disabled aria-label="N" />);
    render(<Pagination current={2} total={50} disabled />);
    render(
      <Tooltip open content="Tip">
        {<button type="button">T</button>}
      </Tooltip>,
    );
    expect(warnings()).toEqual([]);
  });

  it.each([
    ["Switch", () => <Switch checked aria-label="S" />, "checked", "onChange"],
    ["Input", () => <Input value="x" aria-label="I" />, "value", "onChange"],
    [
      "NumberInput",
      () => <NumberInput value={1} aria-label="N" />,
      "value",
      "onChange",
    ],
    [
      "RadioGroup",
      () => (
        <RadioGroup value="a" aria-label="R">
          <Radio value="a">A</Radio>
        </RadioGroup>
      ),
      "value",
      "onChange",
    ],
    [
      "Select",
      () => (
        <Select value="en" aria-label="L">
          <SelectItem value="en">English</SelectItem>
        </Select>
      ),
      "value",
      "onChange",
    ],
    [
      "Tabs",
      () => (
        <Tabs value="a">
          <TabList aria-label="T">
            <Tab value="a">A</Tab>
          </TabList>
          <TabPanel value="a">Panel</TabPanel>
        </Tabs>
      ),
      "value",
      "onChange",
    ],
    [
      "Pagination",
      () => <Pagination current={2} total={50} />,
      "current",
      "onChange",
    ],
    [
      "Popover",
      () => (
        <Popover open={false}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent aria-label="P">Body</PopoverContent>
        </Popover>
      ),
      "open",
      "onOpenChange",
    ],
    ["Modal", () => <Modal open={false} title="T" />, "open", "onOpenChange"],
    [
      "Menu",
      () => (
        <Menu open={false} items={[{ key: "a", label: "A" }]}>
          <button type="button">Actions</button>
        </Menu>
      ),
      "open",
      "onOpenChange",
    ],
    [
      "Table",
      () => (
        <Table
          columns={[{ key: "name", header: "Name", render: (row) => row.name }]}
          data={[{ name: "A" }]}
          sortState={null}
        />
      ),
      "sortState",
      "onSortChange",
    ],
  ] as const)("%s", (name, ui, prop, handler) => {
    render(ui());
    expect(warnings()).toEqual([
      expect.stringMatching(
        new RegExp(
          `^\\[minerva\\] ${name}: \`${prop}\` was provided without an \`${handler}\` handler`,
        ),
      ),
    ]);
  });

  it("IconButton `pressed` accepts onPressedChange or onClick", () => {
    render(<IconButton label="Bold" pressed icon="B" />);
    expect(warnings()).toEqual([
      expect.stringMatching(
        /^\[minerva\] IconButton: `pressed` was provided without an `onPressedChange` handler/,
      ),
    ]);
    resetWarnings();
    consoleError.mockClear();
    render(<IconButton label="Bold" pressed icon="B" onClick={noop} />);
    render(<IconButton label="Bold" pressed icon="B" onPressedChange={noop} />);
    expect(warnings()).toEqual([]);
  });

  it("Menu checkbox items", () => {
    render(
      <Menu
        defaultOpen
        items={[
          { type: "checkbox", key: "wrap", label: "Wrap", checked: true },
        ]}
      >
        <button type="button">View</button>
      </Menu>,
    );
    expect(warnings()).toEqual([
      expect.stringMatching(
        /^\[minerva\] Menu: `checked` was provided without an `onCheckedChange` handler/,
      ),
    ]);
  });

  it("useDisclosure `isOpen` without onChange", () => {
    renderHook(() => useDisclosure({ isOpen: true }));
    renderHook(() => useDisclosure({ isOpen: true, onChange: noop }));
    expect(warnings()).toEqual([
      "[minerva] useDisclosure: `isOpen` was provided without an `onChange` handler, so user changes are ignored. " +
        "Add `onChange`, or use `defaultIsOpen` for an uncontrolled component.",
    ]);
  });
});

describe("controlled and default props together", () => {
  it("warns once per component and prop", () => {
    render(<Checkbox checked defaultChecked onChange={noop} label="A" />);
    render(<Checkbox checked defaultChecked onChange={noop} label="B" />);
    render(<NumberInput value={1} defaultValue={2} onChange={noop} />);
    render(
      <Tooltip open defaultOpen content="Tip">
        <button type="button">T</button>
      </Tooltip>,
    );
    expect(warnings()).toEqual([
      "[minerva] Checkbox: both `checked` and `defaultChecked` were provided. " +
        "A component is either controlled (`checked`) or uncontrolled (`defaultChecked`); " +
        "`defaultChecked` is ignored while `checked` is set. Remove one of them.",
      expect.stringMatching(
        /^\[minerva\] NumberInput: both `value` and `defaultValue` were provided/,
      ),
      expect.stringMatching(
        /^\[minerva\] Tooltip: both `open` and `defaultOpen` were provided/,
      ),
    ]);
  });

  it("does not count component defaults as passed props", () => {
    render(<Checkbox checked onChange={noop} label="A" />);
    render(<Pagination current={1} total={50} onChange={noop} />);
    render(<Modal open onOpenChange={noop} title="T" />);
    render(<NumberInput value={null} onChange={noop} aria-label="N" />);
    render(
      <Table
        columns={[{ key: "name", header: "Name", render: (row) => row.name }]}
        data={[{ name: "A" }]}
        sortState={null}
        onSortChange={noop}
      />,
    );
    expect(warnings()).toEqual([]);
  });
});

describe("invalid prop values", () => {
  it("NumberInput min > max and non-positive step", () => {
    render(<NumberInput aria-label="N" min={10} max={1} step={0} />);
    render(<NumberInput aria-label="N" min={10} max={1} />);
    expect(warnings()).toEqual([
      "[minerva] NumberInput: `min` (10) is greater than `max` (1); clamping cannot satisfy both. Swap or fix the bounds.",
      "[minerva] NumberInput: `step` must be a positive number, got 0.",
    ]);
  });

  it("Input / Textarea minLength > maxLength", () => {
    render(<Input aria-label="I" minLength={5} maxLength={2} />);
    render(<Textarea aria-label="T" minLength={5} maxLength={2} />);
    render(<Input aria-label="I" minLength={2} maxLength={5} />);
    expect(warnings()).toEqual([
      "[minerva] Input: `minLength` (5) is greater than `maxLength` (2), so no value can be valid. Fix the bounds.",
      "[minerva] Textarea: `minLength` (5) is greater than `maxLength` (2), so no value can be valid. Fix the bounds.",
    ]);
  });

  it("Pagination page out of range (known total only)", () => {
    render(<Pagination defaultCurrent={1} total={50} />);
    render(<Pagination defaultCurrent={3} />); // total not loaded yet
    expect(warnings()).toEqual([]);
    render(<Pagination defaultCurrent={9} total={50} />);
    expect(warnings()).toEqual([
      "[minerva] Pagination: the current page (9) is out of range 1..5 (total 50, page size 10). " +
        "Clamp `current` / `defaultCurrent` to a valid page.",
    ]);
  });

  it("IconButton without an accessible name", () => {
    render(<IconButton label="Close" icon="x" />);
    render(<IconButton aria-label="Close" icon="x" />);
    render(
      <>
        <span id="lbl">Close</span>
        <IconButton aria-labelledby="lbl" icon="x" />
      </>,
    );
    expect(warnings()).toEqual([]);
    render(<IconButton icon="x" />);
    expect(warnings()).toEqual([
      expect.stringMatching(
        /^\[minerva\] IconButton: an icon-only button needs an accessible name/,
      ),
    ]);
  });

  it("Rating max <= 0 and value out of range", () => {
    render(<Rating value={5} max={10} />);
    expect(warnings()).toEqual([]);
    render(<Rating value={1} max={0} />);
    render(<Rating value={12} max={10} />);
    expect(warnings()).toEqual([
      "[minerva] Rating: `max` must be a positive number, got 0.",
      "[minerva] Rating: `value` (12) should be between 0 and `max` (10).",
    ]);
  });

  it("Tabs value not matching any tab", async () => {
    const Demo = () => {
      const [value, setValue] = useState("a");
      return (
        <Tabs value={value} onChange={setValue}>
          <TabList aria-label="T">
            <Tab value="a">A</Tab>
            <Tab value="b">B</Tab>
          </TabList>
        </Tabs>
      );
    };
    render(<Demo />);
    await userEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(warnings()).toEqual([]);
    render(
      <Tabs value="missing" onChange={noop}>
        <TabList aria-label="T">
          <Tab value="a">A</Tab>
        </TabList>
      </Tabs>,
    );
    expect(warnings()).toEqual([
      '[minerva] Tabs: `value` "missing" does not match any Tab. Pass the `value` of one of the rendered tabs.',
    ]);
  });
});
