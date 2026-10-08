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
import { queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Input } from "./Input";

const light = resolveTokens({ design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });

describe("Input", () => {
  it("renders a text field named by its label", async () => {
    await render(<Input label="Email" placeholder="you@example.com" />);
    const field = screen.getByLabelText("Email");
    expect(field).toHaveDisplayValue("");
    expect(field.props.placeholder).toBe("you@example.com");
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it("accessibilityLabel wins over the label", async () => {
    await render(<Input label="Email" accessibilityLabel="Work email" />);
    expect(screen.getByLabelText("Work email")).toBeTruthy();
  });

  it("uncontrolled: typing updates the text and reports onChange / onChangeText", async () => {
    const onChange = vi.fn();
    const onChangeText = vi.fn();
    const user = userEvent.setup();
    await render(
      <Input
        accessibilityLabel="Name"
        defaultValue="A"
        onChange={onChange}
        onChangeText={onChangeText}
      />,
    );
    const field = screen.getByLabelText("Name");
    await user.type(field, "bc");
    expect(field).toHaveDisplayValue("Abc");
    expect(onChange).toHaveBeenLastCalledWith("Abc");
    expect(onChangeText).toHaveBeenLastCalledWith("Abc");
  });

  it("controlled: the value prop decides", async () => {
    const onChange = vi.fn();
    await render(
      <Input accessibilityLabel="Name" value="fixed" onChange={onChange} />,
    );
    const field = screen.getByLabelText("Name");
    await fireEvent.changeText(field, "other");
    expect(onChange).toHaveBeenCalledWith("other");
    expect(field).toHaveDisplayValue("fixed");
  });

  it("controlled with state follows the edits", async () => {
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <>
          <Input accessibilityLabel="Name" value={value} onChange={setValue} />
          <Text>{`value:${value}`}</Text>
        </>
      );
    }
    await render(<Controlled />);
    await fireEvent.changeText(screen.getByLabelText("Name"), "Ada");
    expect(screen.getByText("value:Ada")).toBeTruthy();
  });

  it("disabled and read-only fields are not editable", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <>
        <Input accessibilityLabel="A" disabled onChange={onChange} />
        <Input accessibilityLabel="B" readOnly onChange={onChange} />
      </>,
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("A").props.editable).toBe(false);
    expect(screen.getByLabelText("B").props.editable).toBe(false);
    await user.type(screen.getByLabelText("B"), "x");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("clear button empties the field (i18n label, hit slop)", async () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    await render(
      <Input
        accessibilityLabel="Q"
        clearable
        defaultValue="hello"
        onChange={onChange}
        onClear={onClear}
      />,
    );
    const clear = screen.getByRole("button", { name: "Clear" });
    expect(clear.props.hitSlop).toEqual({
      top: 13,
      bottom: 13,
      left: 13,
      right: 13,
    });
    await fireEvent.press(clear);
    expect(onChange).toHaveBeenCalledWith("");
    expect(onClear).toHaveBeenCalled();
    expect(screen.getByLabelText("Q")).toHaveDisplayValue("");
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
  });

  it("no clear button when empty, disabled or read-only", async () => {
    await render(
      <>
        <Input accessibilityLabel="a" clearable />
        <Input accessibilityLabel="b" clearable disabled defaultValue="x" />
        <Input accessibilityLabel="c" clearable readOnly defaultValue="x" />
      </>,
    );
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
  });

  it("password: hidden text with a show / hide toggle", async () => {
    await render(<Input accessibilityLabel="Password" type="password" />);
    const field = screen.getByLabelText("Password");
    expect(field.props.secureTextEntry).toBe(true);
    await fireEvent.press(
      screen.getByRole("button", { name: "Show password" }),
    );
    expect(field.props.secureTextEntry).toBe(false);
    await fireEvent.press(
      screen.getByRole("button", { name: "Hide password" }),
    );
    expect(field.props.secureTextEntry).toBe(true);
  });

  it("translates the built-in labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Input
          accessibilityLabel="p"
          type="password"
          clearable
          defaultValue="x"
        />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "清除" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "显示密码" })).toBeTruthy();
  });

  it("character count with maxLength", async () => {
    await render(
      <Input
        accessibilityLabel="Bio"
        showCharCount
        maxLength={10}
        defaultValue="abc"
      />,
    );
    expect(screen.getByText("3/10")).toBeTruthy();
    expect(screen.getByLabelText("Bio").props.maxLength).toBe(10);
    await fireEvent.changeText(screen.getByLabelText("Bio"), "abcde");
    expect(screen.getByText("5/10")).toBeTruthy();
  });

  it("renders prefix and suffix", async () => {
    await render(
      <Input accessibilityLabel="Price" prefix="$" suffix={<Text>USD</Text>} />,
    );
    expect(screen.getByText("$")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();
  });

  it("border colors: default, focused (primary), invalid", async () => {
    await render(
      <MinervaProvider theme="light">
        <Input accessibilityLabel="a" testID="a" />
      </MinervaProvider>,
    );
    const wrapper = () => queryPart("wrapper", "input")!;
    expect(wrapper()).toHaveStyle({
      borderColor: light.colors["border-strong-color"],
    });
    await fireEvent(screen.getByLabelText("a"), "focus");
    expect(wrapper()).toHaveStyle({
      borderColor: light.colors["primary-color"],
    });
    expect(wrapper().props.dataSet.focused).toBe("");
    await fireEvent(screen.getByLabelText("a"), "blur");
    expect(wrapper()).toHaveStyle({
      borderColor: light.colors["border-strong-color"],
    });
  });

  it("invalid uses the danger color", async () => {
    await render(<Input accessibilityLabel="a" invalid />);
    expect(queryPart("wrapper", "input")).toHaveStyle({
      borderColor: light.colors["danger-color"],
    });
    expect(queryPart("root", "input")!.props.dataSet.invalid).toBe("");
  });

  it.each(["small", "medium", "large"] as const)(
    "size %s takes its control height",
    async (size) => {
      await render(<Input accessibilityLabel="a" size={size} />);
      const step = { small: "sm", medium: "md", large: "lg" } as const;
      expect(queryPart("wrapper", "input")).toHaveStyle({
        minHeight: light.sizes[`control-height-${step[size]}`],
      });
    },
  );

  it.each(["outline", "filled", "unstyled"] as const)(
    "variant %s renders",
    async (variant) => {
      await render(<Input accessibilityLabel="a" variant={variant} />);
      const wrapper = queryPart("wrapper", "input")!;
      if (variant === "filled") {
        expect(wrapper).toHaveStyle({
          backgroundColor: light.colors["surface-muted-color"],
        });
      } else if (variant === "unstyled") {
        expect(wrapper).toHaveStyle({ borderWidth: 0 });
      } else {
        expect(wrapper).toHaveStyle({ borderWidth: 1 });
      }
      expect(queryPart("root", "input")!.props.dataSet.variant).toBe(
        `variant-${variant}`,
      );
    },
  );

  it("follows the dark mode tokens", async () => {
    await render(
      <MinervaProvider theme="dark">
        <Input accessibilityLabel="a" />
      </MinervaProvider>,
    );
    expect(queryPart("wrapper", "input")).toHaveStyle({
      backgroundColor: dark.colors["surface-color"],
      borderColor: dark.colors["border-strong-color"],
    });
  });
});
