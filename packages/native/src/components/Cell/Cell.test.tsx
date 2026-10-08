import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Switch, Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, hostElements, queryPart } from "../../../test/queries";
import { Cell, CellGroup } from "./Cell";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
const borders = () =>
  hostElements().filter(
    (el) =>
      el.props.dataSet?.minerva === "cell" &&
      el.props.dataSet?.part === "border",
  );

describe("Cell", () => {
  it("static row: one text element with title, label and value", async () => {
    await render(
      <Cell title="Version" label="Build 42" value="1.0.3" testID="row" />,
    );
    const row = screen.getByTestId("row");
    expect(row.props.accessible).toBe(true);
    expect(row.props.accessibilityRole).toBe("text");
    expect(row).toHaveTextContent("VersionBuild 421.0.3");
    expect(screen.getByText("1.0.3")).toHaveStyle({
      color: light.colors["text-secondary-color"],
      textAlign: "right",
    });
    expect(screen.queryByRole("button")).toBeNull();
    expect(row).toHaveStyle({ minHeight: 48, paddingHorizontal: 16 });
  });

  it("pressable rows are buttons; isLink shows a chevron", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(<Cell title="Account" isLink onPress={onPress} />);
    const row = screen.getByRole("button", { name: "Account" });
    await user.press(row);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(row.props.dataSet).toMatchObject({ link: "", clickable: "" });
  });

  it("clickable rows without handler are still buttons; disabled ignores presses", async () => {
    const onPress = vi.fn();
    await render(
      <>
        <Cell title="A" clickable />
        <Cell title="B" disabled onPress={onPress} />
      </>,
    );
    expect(screen.getByRole("button", { name: "A" })).toBeEnabled();
    const b = screen.getByRole("button", { name: "B" });
    expect(b).toBeDisabled();
    await fireEvent.press(b);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("required mark, icon, right icon and custom right content", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Cell
          title="Name"
          required
          icon={<Text>@</Text>}
          rightIcon={<Text>&gt;</Text>}
        >
          <Switch accessibilityLabel="Toggle" value={false} />
        </Cell>
      </MinervaProvider>,
    );
    expect(screen.getByText("*")).toHaveStyle({
      color: light.colors["danger-color"],
    });
    expect(screen.getByLabelText("必填")).toBeTruthy();
    expect(screen.getByText("@")).toBeTruthy();
    expect(screen.getByText(">")).toBeTruthy();
    // holds its own control: not merged into one element
    expect(screen.getByRole("switch", { name: "Toggle" })).toBeTruthy();
    expect(queryPart("root", "cell")?.props.accessible).toBe(false);
  });

  it("large size and top alignment", async () => {
    await render(<Cell title="T" size="large" center={false} testID="row" />);
    expect(screen.getByTestId("row")).toHaveStyle({
      minHeight: 56,
      alignItems: "flex-start",
    });
    expect(screen.getByText("T")).toHaveStyle({ fontSize: light.fontSize.lg });
  });

  it("pressed background uses the hover token", async () => {
    await render(
      <Cell title="P" onPress={() => {}} {...{ testOnly_pressed: true }} />,
    );
    const row = screen.getByRole("button");
    expect(row).toHaveStyle({ backgroundColor: light.colors["hover-color"] });
  });
});

describe("CellGroup", () => {
  it("renders a titled list with hairlines between rows only", async () => {
    await render(
      <CellGroup title="General" footer="Changes apply at once">
        <Cell title="One" />
        <Cell title="Two" />
        <Cell title="Three" />
      </CellGroup>,
    );
    expect(getByRoleDeep("list", { name: "General" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "General" })).toBeTruthy();
    expect(screen.getByText("Changes apply at once")).toBeTruthy();
    expect(borders()).toHaveLength(2);
    expect(borders()[0]).toHaveStyle({
      backgroundColor: light.colors["border-color"],
      left: 16,
    });
  });

  it("border={false} removes the separators", async () => {
    await render(
      <CellGroup border={false}>
        <Cell title="One" />
        <Cell title="Two" />
      </CellGroup>,
    );
    expect(borders()).toHaveLength(0);
  });

  it("inset: rounded card with margins, in dark mode", async () => {
    await render(
      <MinervaProvider theme="dark">
        <CellGroup inset>
          <Cell title="One" />
        </CellGroup>
      </MinervaProvider>,
    );
    expect(queryPart("body", "cell-group")).toHaveStyle({
      marginHorizontal: 16,
      borderRadius: dark.radius.lg,
      backgroundColor: dark.colors["surface-color"],
    });
  });
});
