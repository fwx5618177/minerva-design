import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Collapse, CollapseItem } from "./Collapse";

const items = (
  <>
    <CollapseItem
      name="a"
      title="Shipping"
      value="Free"
      icon={<View testID="icon" />}
    >
      Ships in 2 days
    </CollapseItem>
    <CollapseItem name="b" title="Returns" label="30 days">
      <Text>Return policy</Text>
    </CollapseItem>
    <CollapseItem name="c" title="Locked" disabled>
      Hidden
    </CollapseItem>
  </>
);

const header = (name: string) => screen.getByRole("button", { name });

describe("Collapse", () => {
  it("renders collapsed header buttons with hints", async () => {
    await render(<Collapse>{items}</Collapse>);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(header("Shipping Free")).not.toBeExpanded();
    expect(header("Shipping Free").props.accessibilityHint).toBe("Expand");
    expect(header("Locked")).toBeDisabled();
    expect(screen.queryByText("Ships in 2 days")).toBeNull();
    expect(screen.getByText("30 days")).toBeTruthy();
  });

  it("uncontrolled multiple: items toggle independently", async () => {
    const onChange = vi.fn();
    await render(<Collapse onChange={onChange}>{items}</Collapse>);
    await fireEvent.press(header("Shipping Free"));
    expect(onChange).toHaveBeenLastCalledWith(["a"]);
    await fireEvent.press(header("Returns 30 days"));
    expect(onChange).toHaveBeenLastCalledWith(["a", "b"]);
    expect(header("Shipping Free")).toBeExpanded();
    expect(header("Shipping Free").props.accessibilityHint).toBe("Collapse");
    expect(screen.getByText("Ships in 2 days")).toBeTruthy();
    expect(screen.getByText("Return policy")).toBeTruthy();
    await fireEvent.press(header("Shipping Free"));
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
    expect(screen.queryByText("Ships in 2 days")).toBeNull();
  });

  it("accordion: one item at a time, string values", async () => {
    const onChange = vi.fn();
    await render(
      <Collapse accordion defaultValue="a" onChange={onChange}>
        {items}
      </Collapse>,
    );
    expect(header("Shipping Free")).toBeExpanded();
    await fireEvent.press(header("Returns 30 days"));
    expect(onChange).toHaveBeenLastCalledWith("b");
    expect(header("Shipping Free")).not.toBeExpanded();
    expect(header("Returns 30 days")).toBeExpanded();
    await fireEvent.press(header("Returns 30 days"));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(header("Returns 30 days")).not.toBeExpanded();
  });

  it("controlled: the prop decides", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <Collapse value={["b"]} onChange={onChange}>
        {items}
      </Collapse>,
    );
    await fireEvent.press(header("Shipping Free"));
    expect(onChange).toHaveBeenCalledWith(["b", "a"]);
    expect(header("Shipping Free")).not.toBeExpanded();
    await rerender(
      <Collapse value={["a"]} onChange={onChange}>
        {items}
      </Collapse>,
    );
    expect(header("Shipping Free")).toBeExpanded();
    expect(header("Returns 30 days")).not.toBeExpanded();
  });

  it("controlled accordion with a string value", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <Collapse accordion value="a" onChange={onChange}>
        {items}
      </Collapse>,
    );
    expect(header("Shipping Free")).toBeExpanded();
    await fireEvent.press(header("Returns 30 days"));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(header("Shipping Free")).toBeExpanded();
    await rerender(
      <Collapse accordion value="" onChange={onChange}>
        {items}
      </Collapse>,
    );
    expect(header("Shipping Free")).not.toBeExpanded();
  });

  it("disabled items ignore presses", async () => {
    const onChange = vi.fn();
    await render(<Collapse onChange={onChange}>{items}</Collapse>);
    await fireEvent.press(header("Locked"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("translates the hints and uses the token colors (dark)", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <Collapse testID="list">{items}</Collapse>
      </MinervaProvider>,
    );
    expect(header("Shipping Free").props.accessibilityHint).toBe("展开");
    expect(screen.getByTestId("list")).toHaveStyle({
      backgroundColor: dark.colors["surface-color"],
    });
    expect(screen.getByText("Locked")).toHaveStyle({
      color: dark.colors["text-disabled-color"],
    });
    expect(header("Locked")).toHaveStyle({
      minHeight: dark.sizes["control-height-lg"],
    });
  });
});
