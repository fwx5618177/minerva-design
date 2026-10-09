import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { useState } from "react";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

const t = resolveTokens({ design: { preset: "touch" } });

describe("Checkbox", () => {
  it("renders an unchecked checkbox named by its label", async () => {
    await render(<Checkbox label="Accept terms" />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).not.toBeChecked();
    expect(box).toBeEnabled();
    expect(queryPart("root", "checkbox")!.props.dataSet).toMatchObject({
      shape: "square",
      size: "medium",
      color: "primary",
    });
  });

  it("uncontrolled toggle reports (checked, value)", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(<Checkbox label="A" value="a" onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    await user.press(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(true, "a");
    await user.press(box);
    expect(box).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, "a");
  });

  it("controlled: the prop decides", async () => {
    const onChange = vi.fn();
    await render(<Checkbox label="A" checked={false} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true, undefined);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("controlled with state", async () => {
    function Demo() {
      const [on, setOn] = useState(true);
      return <Checkbox label="A" checked={on} onChange={setOn} />;
    }
    await render(<Demo />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    await fireEvent.press(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("indeterminate is mixed; a press asks for checked", async () => {
    const onChange = vi.fn();
    await render(<Checkbox label="All" indeterminate onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    expect(box).toBePartiallyChecked();
    expect(box.props.accessibilityState.checked).toBe("mixed");
    await fireEvent.press(box);
    expect(onChange).toHaveBeenCalledWith(true, undefined);
  });

  it("disabled ignores presses", async () => {
    const onChange = vi.fn();
    await render(<Checkbox label="A" disabled onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    await fireEvent.press(box);
    expect(onChange).not.toHaveBeenCalled();
    expect(box).not.toBeChecked();
  });

  it("checked box uses the token color of its color", async () => {
    await render(
      <MinervaProvider theme="light">
        <Checkbox label="A" color="success" defaultChecked />
      </MinervaProvider>,
    );
    expect(queryPart("control", "checkbox")).toHaveStyle({
      backgroundColor: t.colors["success-color"],
    });
  });

  it("dark mode unchecked box", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Checkbox label="A" />
      </MinervaProvider>,
    );
    expect(queryPart("control", "checkbox")).toHaveStyle({
      backgroundColor: dark.colors["surface-color"],
      borderColor: dark.colors["border-strong-color"],
    });
  });

  it("error uses the danger border", async () => {
    await render(<Checkbox label="A" error />);
    expect(queryPart("control", "checkbox")).toHaveStyle({
      borderColor: t.colors["danger-color"],
    });
  });

  it.each([
    ["small", 16],
    ["medium", 20],
    ["large", 24],
  ] as const)("size %s box is %ipt with a 44pt hit area", async (size, box) => {
    await render(<Checkbox accessibilityLabel="A" size={size} />);
    expect(queryPart("control", "checkbox")).toHaveStyle({
      width: box,
      height: box,
    });
    const font =
      size === "small"
        ? t.fontSize.sm
        : size === "large"
          ? t.fontSize.lg
          : t.fontSize.md;
    const row = Math.max(box, Math.round(font * (t.lineHeight.base ?? 1.5)));
    const slop = screen.getByRole("checkbox").props.hitSlop;
    expect(slop.top * 2 + row).toBeGreaterThanOrEqual(44);
  });

  it.each([
    ["square", 3],
    ["rounded", t.radius.sm],
    ["circle", 10],
  ] as const)("shape %s", async (shape, radius) => {
    await render(<Checkbox accessibilityLabel="A" shape={shape} />);
    expect(queryPart("control", "checkbox")).toHaveStyle({
      borderRadius: radius,
    });
  });

  it("label placement start reverses the row", async () => {
    await render(<Checkbox label="A" labelPlacement="start" />);
    expect(screen.getByRole("checkbox")).toHaveStyle({
      flexDirection: "row-reverse",
    });
  });

  it("element labels and children", async () => {
    await render(
      <Checkbox accessibilityLabel="Custom">
        <Text>Rich label</Text>
      </Checkbox>,
    );
    expect(screen.getByRole("checkbox", { name: "Custom" })).toBeTruthy();
    expect(screen.getByText("Rich label")).toBeTruthy();
  });
});

describe("CheckboxGroup", () => {
  it("is a named group of checkboxes (uncontrolled)", async () => {
    const onChange = vi.fn();
    await render(
      <CheckboxGroup
        label="Fruits"
        defaultValue={["apple"]}
        onChange={onChange}
        options={["apple", "pear", { label: "Plum", value: "plum" }]}
      />,
    );
    expect(getByRoleDeep("group", { name: "Fruits" })).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: "apple" })).toBeChecked();
    await fireEvent.press(screen.getByRole("checkbox", { name: "Plum" }));
    expect(onChange).toHaveBeenLastCalledWith(["apple", "plum"]);
    expect(screen.getByRole("checkbox", { name: "Plum" })).toBeChecked();
    await fireEvent.press(screen.getByRole("checkbox", { name: "apple" }));
    expect(onChange).toHaveBeenLastCalledWith(["plum"]);
  });

  it("children checkboxes read and write the group; their onChange still fires", async () => {
    const onGroup = vi.fn();
    const onBox = vi.fn();
    await render(
      <CheckboxGroup accessibilityLabel="g" onChange={onGroup}>
        <Checkbox value="a" label="A" onChange={onBox} />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>,
    );
    await fireEvent.press(screen.getByRole("checkbox", { name: "A" }));
    expect(onGroup).toHaveBeenCalledWith(["a"]);
    expect(onBox).toHaveBeenCalledWith(true, "a");
  });

  it("controlled value", async () => {
    const onChange = vi.fn();
    await render(
      <CheckboxGroup
        accessibilityLabel="g"
        value={["a"]}
        onChange={onChange}
        options={["a", "b"]}
      />,
    );
    await fireEvent.press(screen.getByRole("checkbox", { name: "b" }));
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
    expect(screen.getByRole("checkbox", { name: "b" })).not.toBeChecked();
  });

  it("max disables the unchecked boxes once reached", async () => {
    await render(
      <CheckboxGroup
        accessibilityLabel="g"
        max={2}
        options={["a", "b", "c"]}
      />,
    );
    await fireEvent.press(screen.getByRole("checkbox", { name: "a" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "b" }));
    expect(screen.getByRole("checkbox", { name: "c" })).toBeDisabled();
    await fireEvent.press(screen.getByRole("checkbox", { name: "a" }));
    expect(screen.getByRole("checkbox", { name: "c" })).toBeEnabled();
  });

  it("disabled group / disabled option", async () => {
    await render(
      <>
        <CheckboxGroup accessibilityLabel="g1" disabled options={["a"]} />
        <CheckboxGroup
          accessibilityLabel="g2"
          options={[{ label: "x", value: "x", disabled: true }]}
        />
      </>,
    );
    expect(screen.getByRole("checkbox", { name: "a" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "x" })).toBeDisabled();
  });

  it("group size / color / shape override the checkboxes'", async () => {
    await render(
      <CheckboxGroup
        accessibilityLabel="g"
        size="large"
        color="danger"
        shape="circle"
        defaultValue={["a"]}
      >
        <Checkbox value="a" label="A" size="small" />
      </CheckboxGroup>,
    );
    expect(queryPart("control", "checkbox")).toHaveStyle({
      width: 24,
      borderRadius: 12,
      backgroundColor: t.colors["danger-color"],
    });
  });

  it("horizontal direction lays out a wrapping row", async () => {
    await render(
      <CheckboxGroup
        accessibilityLabel="g"
        direction="horizontal"
        options={["a"]}
      />,
    );
    expect(queryPart("items", "checkbox-group")).toHaveStyle({
      flexDirection: "row",
      flexWrap: "wrap",
    });
  });
});
