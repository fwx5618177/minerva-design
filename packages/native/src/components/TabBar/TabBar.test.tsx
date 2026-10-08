import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { TabBar, TabBarItem } from "./TabBar";

const light = resolveTokens({ design: { preset: "touch" } });

const items = (
  <>
    <TabBarItem value="home" label="Home" icon={<Text>H</Text>} />
    <TabBarItem value="inbox" label="Inbox" badge={5} />
    <TabBarItem value="me" label="Me" dot />
    <TabBarItem value="off" label="Off" disabled />
  </>
);

describe("TabBar", () => {
  it("renders a labelled tablist of tabs, first selected by default", async () => {
    await render(<TabBar>{items}</TabBar>);
    expect(getByRoleDeep("tablist", { name: "Tab bar" })).toBeTruthy();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(screen.getByRole("tab", { name: "Home" })).toBeSelected();
    expect(screen.getByRole("tab", { name: "Inbox, 5" })).not.toBeSelected();
    expect(screen.getByRole("tab", { name: "Off" })).toBeDisabled();
    expect(queryPart("dot", "tab-bar")).toBeTruthy();
  });

  it("uncontrolled: press selects and reports the value", async () => {
    const onChange = vi.fn();
    await render(<TabBar onChange={onChange}>{items}</TabBar>);
    await fireEvent.press(screen.getByRole("tab", { name: "Me" }));
    expect(onChange).toHaveBeenCalledWith("me");
    expect(screen.getByRole("tab", { name: "Me" })).toBeSelected();
    expect(screen.getByRole("tab", { name: "Home" })).not.toBeSelected();
  });

  it("controlled: the prop decides", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <TabBar value="inbox" onChange={onChange}>
        {items}
      </TabBar>,
    );
    await fireEvent.press(screen.getByRole("tab", { name: "Home" }));
    expect(onChange).toHaveBeenCalledWith("home");
    expect(screen.getByRole("tab", { name: "Inbox, 5" })).toBeSelected();
    await rerender(
      <TabBar value="home" onChange={onChange}>
        {items}
      </TabBar>,
    );
    expect(screen.getByRole("tab", { name: "Home" })).toBeSelected();
  });

  it("disabled items ignore presses", async () => {
    const onChange = vi.fn();
    await render(
      <TabBar defaultValue="me" onChange={onChange}>
        {items}
      </TabBar>,
    );
    await fireEvent.press(screen.getByRole("tab", { name: "Off" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("tab", { name: "Me" })).toBeSelected();
  });

  it("caps badges with badgeMax and calls icon render functions", async () => {
    const icon = vi.fn((active: boolean) => (
      <Text>{active ? "on" : "off"}</Text>
    ));
    await render(
      <TabBar defaultValue="a">
        <TabBarItem value="a" label="A" icon={icon} badge={120} />
        <TabBarItem value="b" label="B" icon={icon} />
      </TabBar>,
    );
    expect(screen.getByText("99+")).toBeTruthy();
    expect(screen.getByText("on")).toBeTruthy();
    expect(screen.getByText("off")).toBeTruthy();
    expect(icon).toHaveBeenCalledWith(true, light.colors["primary-color"]);
    expect(icon).toHaveBeenCalledWith(false, light.colors["text-muted-color"]);
  });

  it("active / inactive token colors and overrides", async () => {
    const { rerender } = await render(<TabBar>{items}</TabBar>);
    expect(screen.getByText("Home")).toHaveStyle({
      color: light.colors["primary-color"],
    });
    expect(screen.getByText("Me")).toHaveStyle({
      color: light.colors["text-muted-color"],
    });
    await rerender(
      <TabBar activeColor={light.colors["danger-color"]}>{items}</TabBar>,
    );
    expect(screen.getByText("Home")).toHaveStyle({
      color: light.colors["danger-color"],
    });
  });

  it("bottom safe-area inset, hairline border, dark surface", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    const { rerender } = await render(
      <MinervaProvider theme="dark" insets={{ bottom: 34 }}>
        <TabBar testID="bar">{items}</TabBar>
      </MinervaProvider>,
    );
    expect(screen.getByTestId("bar")).toHaveStyle({
      paddingBottom: 34,
      borderTopWidth: StyleSheet.hairlineWidth,
      backgroundColor: dark.colors["surface-color"],
    });
    await rerender(
      <MinervaProvider theme="dark" insets={{ bottom: 34 }}>
        <TabBar testID="bar" safeAreaInsetBottom={false}>
          {items}
        </TabBar>
      </MinervaProvider>,
    );
    expect(screen.getByTestId("bar")).toHaveStyle({ paddingBottom: 0 });
  });

  it("translates the tab list label", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <TabBar>{items}</TabBar>
      </MinervaProvider>,
    );
    expect(getByRoleDeep("tablist", { name: "标签栏" })).toBeTruthy();
  });

  it("items meet the touch target height", async () => {
    await render(<TabBar>{items}</TabBar>);
    expect(screen.getByRole("tab", { name: "Home" })).toHaveStyle({
      minHeight: light.sizes["control-height-lg"],
    });
  });
});
