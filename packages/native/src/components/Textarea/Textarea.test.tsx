import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { hostElements, queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Textarea } from "./Textarea";

const t = resolveTokens({ design: { preset: "touch" } });
const line = Math.round(t.fontSize.md * (t.lineHeight.base ?? 1.5));
const rowsHeight = (n: number) => n * line + t.space["2"] * 2;

const grow = (height: number) =>
  fireEvent(screen.getByLabelText("Notes"), "contentSizeChange", {
    nativeEvent: { contentSize: { width: 200, height } },
  });

describe("Textarea", () => {
  it("renders a multiline field named by its label", async () => {
    await render(<Textarea label="Notes" />);
    const field = screen.getByLabelText("Notes");
    expect(field.props.multiline).toBe(true);
    expect(field.props.numberOfLines).toBe(3);
    expect(field).toHaveStyle({ height: rowsHeight(3) });
  });

  it("uncontrolled typing calls onChange", async () => {
    const onChange = vi.fn();
    await render(
      <Textarea
        accessibilityLabel="Notes"
        defaultValue="a"
        onChange={onChange}
      />,
    );
    await fireEvent.changeText(screen.getByLabelText("Notes"), "a\nb");
    expect(onChange).toHaveBeenCalledWith("a\nb");
    expect(screen.getByLabelText("Notes")).toHaveDisplayValue("a\nb");
  });

  it("controlled: keeps the prop value", async () => {
    const onChange = vi.fn();
    await render(
      <Textarea accessibilityLabel="Notes" value="x" onChange={onChange} />,
    );
    await fireEvent.changeText(screen.getByLabelText("Notes"), "y");
    expect(onChange).toHaveBeenCalledWith("y");
    expect(screen.getByLabelText("Notes")).toHaveDisplayValue("x");
  });

  it("rows set the height", async () => {
    await render(<Textarea accessibilityLabel="Notes" rows={5} />);
    expect(screen.getByLabelText("Notes")).toHaveStyle({
      height: rowsHeight(5),
    });
  });

  it("autoSize grows between minRows and maxRows", async () => {
    await render(
      <Textarea
        accessibilityLabel="Notes"
        autoSize={{ minRows: 2, maxRows: 4 }}
      />,
    );
    const field = () => screen.getByLabelText("Notes");
    expect(field()).toHaveStyle({ height: rowsHeight(2) });
    await grow(line * 3);
    expect(field()).toHaveStyle({ height: line * 3 + t.space["2"] * 2 });
    await grow(line * 10);
    expect(field()).toHaveStyle({ height: rowsHeight(4) });
  });

  it("character count", async () => {
    await render(
      <Textarea
        accessibilityLabel="Notes"
        showCharCount
        maxLength={140}
        defaultValue="hello"
      />,
    );
    expect(screen.getByText("5/140")).toBeTruthy();
  });

  it("disabled / readOnly are not editable", async () => {
    await render(
      <>
        <Textarea accessibilityLabel="A" disabled />
        <Textarea accessibilityLabel="B" readOnly />
      </>,
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("B").props.editable).toBe(false);
  });

  it("invalid and focused border colors (dark mode)", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Textarea accessibilityLabel="Notes" />
        <Textarea accessibilityLabel="Bad" invalid />
      </MinervaProvider>,
    );
    await fireEvent(screen.getByLabelText("Notes"), "focus");
    expect(queryPart("wrapper", "textarea")).toHaveStyle({
      borderColor: dark.colors["primary-color"],
    });
    const frames = hostElements().filter(
      (n) => n.props.dataSet?.part === "wrapper",
    );
    expect(frames[1]).toHaveStyle({ borderColor: dark.colors["danger-color"] });
  });

  it.each(["outline", "filled", "unstyled"] as const)(
    "variant %s",
    async (variant) => {
      await render(<Textarea accessibilityLabel="Notes" variant={variant} />);
      expect(queryPart("root", "textarea")!.props.dataSet.variant).toBe(
        `variant-${variant}`,
      );
    },
  );

  it.each(["small", "medium", "large"] as const)("size %s", async (size) => {
    await render(<Textarea accessibilityLabel="Notes" size={size} />);
    const fontSize =
      size === "small"
        ? t.fontSize.sm
        : size === "large"
          ? t.fontSize.lg
          : t.fontSize.md;
    expect(screen.getByLabelText("Notes")).toHaveStyle({ fontSize });
  });
});
