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
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const t = resolveTokens({ design: { preset: "touch" } });

describe("RadioGroup", () => {
  it("is a named radiogroup container (not an accessibility element)", async () => {
    await render(
      <RadioGroup label="Plan" options={["Free", "Pro"]} defaultValue="Pro" />,
    );
    const group = getByRoleDeep("radiogroup", { name: "Plan" });
    expect(group.props.accessible).toBeFalsy();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
    expect(group.props.dataSet).toMatchObject({ direction: "vertical" });
  });

  it("uncontrolled selection reports the value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <RadioGroup accessibilityLabel="Plan" onChange={onChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    await user.press(screen.getByRole("radio", { name: "Pro" }));
    expect(onChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    await user.press(screen.getByRole("radio", { name: "Free" }));
    expect(onChange).toHaveBeenLastCalledWith("free");
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeChecked();
    // pressing the checked radio again changes nothing
    await user.press(screen.getByRole("radio", { name: "Free" }));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("controlled: requests only", async () => {
    const onChange = vi.fn();
    await render(
      <RadioGroup
        accessibilityLabel="g"
        value="a"
        onChange={onChange}
        options={["a", "b"]}
      />,
    );
    await fireEvent.press(screen.getByRole("radio", { name: "b" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("radio", { name: "a" })).toBeChecked();
  });

  it("controlled with state", async () => {
    function Demo() {
      const [v, setV] = useState<string | null>(null);
      return (
        <>
          <RadioGroup
            accessibilityLabel="g"
            value={v}
            onChange={setV}
            options={["a", "b"]}
          />
          <Text>{`picked:${v}`}</Text>
        </>
      );
    }
    await render(<Demo />);
    await fireEvent.press(screen.getByRole("radio", { name: "b" }));
    expect(screen.getByText("picked:b")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "b" })).toBeChecked();
  });

  it("disabled group, disabled option, read-only group", async () => {
    const onChange = vi.fn();
    await render(
      <>
        <RadioGroup
          accessibilityLabel="g1"
          disabled
          options={["a"]}
          onChange={onChange}
        />
        <RadioGroup
          accessibilityLabel="g2"
          options={[{ label: "b", value: "b", disabled: true }]}
          onChange={onChange}
        />
        <RadioGroup
          accessibilityLabel="g3"
          readOnly
          options={["c"]}
          onChange={onChange}
        />
      </>,
    );
    expect(screen.getByRole("radio", { name: "a" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "b" })).toBeDisabled();
    await fireEvent.press(screen.getByRole("radio", { name: "a" }));
    await fireEvent.press(screen.getByRole("radio", { name: "c" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "c" })).not.toBeChecked();
  });

  it("horizontal direction", async () => {
    await render(
      <RadioGroup
        accessibilityLabel="g"
        direction="horizontal"
        options={["a", "b"]}
      />,
    );
    expect(queryPart("items", "radio-group")).toHaveStyle({
      flexDirection: "row",
    });
  });

  it("group size and color override the radios'", async () => {
    await render(
      <RadioGroup
        accessibilityLabel="g"
        size="large"
        color="success"
        defaultValue="a"
      >
        <Radio value="a" label="A" size="small" color="danger" />
      </RadioGroup>,
    );
    expect(queryPart("control", "radio")).toHaveStyle({
      width: 24,
      borderColor: t.colors["success-color"],
    });
  });

  it("error uses the danger border on unchecked radios", async () => {
    await render(<RadioGroup accessibilityLabel="g" error options={["a"]} />);
    expect(queryPart("control", "radio")).toHaveStyle({
      borderColor: t.colors["danger-color"],
    });
  });
});

describe("Radio", () => {
  it("standalone: a press checks it and reports (true, value)", async () => {
    const onChange = vi.fn();
    await render(<Radio label="Yes" value="yes" onChange={onChange} />);
    const radio = screen.getByRole("radio", { name: "Yes" });
    expect(radio).not.toBeChecked();
    await fireEvent.press(radio);
    expect(radio).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, "yes");
    await fireEvent.press(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("standalone controlled", async () => {
    const onChange = vi.fn();
    await render(<Radio label="Yes" checked={false} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalledWith(true, undefined);
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it.each([
    ["small", 16],
    ["medium", 20],
    ["large", 24],
  ] as const)("size %s", async (size, box) => {
    await render(<Radio accessibilityLabel="r" size={size} />);
    expect(queryPart("control", "radio")).toHaveStyle({
      width: box,
      height: box,
    });
    expect(screen.getByRole("radio").props.hitSlop).toBeTruthy();
  });

  it.each(["primary", "success", "warning", "danger"] as const)(
    "checked color %s from the tokens (dark mode)",
    async (color) => {
      const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
      await render(
        <MinervaProvider theme="dark">
          <Radio accessibilityLabel="r" color={color} defaultChecked />
        </MinervaProvider>,
      );
      expect(queryPart("control", "radio")).toHaveStyle({
        borderColor: dark.colors[`${color}-color`],
      });
    },
  );
});
