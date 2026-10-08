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
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { Tab, TabList, TabPanel, Tabs, type TabsVariant } from "./Tabs";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });

const Letters = (props: Partial<Parameters<typeof Tabs>[0]>) => (
  <Tabs defaultValue="a" {...props}>
    <TabList aria-label="Letters">
      <Tab value="a">Alpha</Tab>
      <Tab value="b">Beta</Tab>
      <Tab value="c" disabled>
        Gamma
      </Tab>
    </TabList>
    <TabPanel value="a">
      <Text>Panel A</Text>
    </TabPanel>
    <TabPanel value="b">
      <Text>Panel B</Text>
    </TabPanel>
    <TabPanel value="c">
      <Text>Panel C</Text>
    </TabPanel>
  </Tabs>
);

describe("Tabs", () => {
  it("renders a labelled tab list with the selected tab and its panel", async () => {
    await render(<Letters />);
    expect(getByRoleDeep("tablist", { name: "Letters" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Alpha" })).toBeSelected();
    expect(screen.getByRole("tab", { name: "Beta" })).not.toBeSelected();
    expect(screen.getByText("Panel A")).toBeTruthy();
    expect(screen.queryByText("Panel B")).toBeNull();
    expect(getByRoleDeep("tabpanel")).toBeTruthy();
  });

  it("pressing a tab emits onChange and swaps the panels", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(<Letters onChange={onChange} />);
    await user.press(screen.getByRole("tab", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("tab", { name: "Beta" })).toBeSelected();
    expect(screen.getByText("Panel B")).toBeTruthy();
    expect(screen.queryByText("Panel A")).toBeNull();
  });

  it("does not select disabled tabs", async () => {
    const onChange = vi.fn();
    await render(<Letters onChange={onChange} />);
    const gamma = screen.getByRole("tab", { name: "Gamma" });
    expect(gamma).toBeDisabled();
    await fireEvent.press(gamma);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Panel C")).toBeNull();
  });

  it("controlled: requests only, the value prop decides", async () => {
    const onChange = vi.fn();
    const { rerender } = await render(
      <Letters defaultValue={undefined} value="a" onChange={onChange} />,
    );
    await fireEvent.press(screen.getByRole("tab", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tab", { name: "Alpha" })).toBeSelected();
    await rerender(
      <Letters defaultValue={undefined} value="b" onChange={onChange} />,
    );
    expect(screen.getByRole("tab", { name: "Beta" })).toBeSelected();
    expect(screen.getByText("Panel B")).toBeTruthy();
  });

  it("works controlled through state", async () => {
    function Controlled() {
      const [value, setValue] = useState("b");
      return (
        <>
          <Letters defaultValue={undefined} value={value} onChange={setValue} />
          <Text>value:{value}</Text>
        </>
      );
    }
    await render(<Controlled />);
    await fireEvent.press(screen.getByRole("tab", { name: "Alpha" }));
    expect(screen.getByText("value:a")).toBeTruthy();
    expect(screen.getByText("Panel A")).toBeTruthy();
  });

  it("selects the first enabled tab without a default value", async () => {
    await render(
      <Tabs>
        <TabList>
          <Tab value="x" disabled>
            X
          </Tab>
          <Tab value="y">Y</Tab>
        </TabList>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Y" })).toBeSelected();
  });

  it("forceMount keeps hidden panels mounted and hidden", async () => {
    await render(
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">
          <Text>Panel A</Text>
        </TabPanel>
        <TabPanel value="b" forceMount testID="panel-b">
          <Text>Panel B</Text>
        </TabPanel>
      </Tabs>,
    );
    const hidden = screen.getByTestId("panel-b", {
      includeHiddenElements: true,
    });
    expect(hidden).toHaveStyle({ display: "none" });
    expect(hidden.props.accessibilityElementsHidden).toBe(true);
    expect(screen.queryByText("Panel B")).toBeNull();
    expect(
      screen.getByText("Panel B", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("data API: renders its own tab list, badges and panels", async () => {
    const onChange = vi.fn();
    await render(
      <Tabs
        listLabel="Sections"
        onChange={onChange}
        items={[
          {
            value: "inbox",
            label: "Inbox",
            badge: 3,
            content: <Text>Mail</Text>,
          },
          { value: "sent", label: "Sent", content: <Text>Sent mail</Text> },
          { value: "spam", label: "Spam", disabled: true },
        ]}
      />,
    );
    expect(getByRoleDeep("tablist", { name: "Sections" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: /Inbox/ })).toBeSelected();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText("Mail")).toBeTruthy();
    await fireEvent.press(screen.getByRole("tab", { name: "Sent" }));
    expect(onChange).toHaveBeenCalledWith("sent");
    expect(screen.getByText("Sent mail")).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Spam" })).toBeDisabled();
  });

  it("scrolls when there are many tabs", async () => {
    const items = ["a", "b", "c", "d", "e", "f"].map((value) => ({
      value,
      label: value.toUpperCase(),
    }));
    await render(<Tabs items={items} />);
    expect(queryPart("scroller", "tabs")).not.toBeNull();
  });

  it.each<TabsVariant>(["line", "pills", "soft", "enclosed"])(
    "renders the %s variant with token colors",
    async (variant) => {
      await render(
        <MinervaProvider theme="light">
          <Letters variant={variant} />
        </MinervaProvider>,
      );
      const tab = screen.getByRole("tab", { name: "Alpha" });
      expect(tab.props.dataSet).toMatchObject({ part: "tab", selected: "" });
      if (variant === "pills")
        expect(tab).toHaveStyle({
          backgroundColor: light.colors["primary-color"],
        });
      if (variant === "soft")
        expect(tab).toHaveStyle({
          backgroundColor: light.colors["primary-color-subtle"],
        });
      if (variant === "enclosed")
        expect(tab).toHaveStyle({
          backgroundColor: light.colors["surface-color"],
        });
    },
  );

  it("line variant: the underline follows the selected tab", async () => {
    await render(
      <MinervaProvider theme="light" reducedMotion>
        <Letters color="success" />
      </MinervaProvider>,
    );
    const alpha = screen.getByRole("tab", { name: "Alpha" });
    const beta = screen.getByRole("tab", { name: "Beta" });
    await fireEvent(alpha, "layout", {
      nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 44 } },
    });
    await fireEvent(beta, "layout", {
      nativeEvent: { layout: { x: 100, y: 0, width: 80, height: 44 } },
    });
    const indicator = () => queryPart("indicator", "tabs");
    expect(indicator()).toHaveStyle({
      left: 0,
      width: 100,
      backgroundColor: light.colors["success-color"],
    });
    await fireEvent.press(beta);
    expect(indicator()).toHaveStyle({ left: 100, width: 80 });
  });

  it("tabs reach the 44pt touch target", async () => {
    await render(<Letters variant="enclosed" />);
    const tab = screen.getByRole("tab", { name: "Alpha" });
    expect(tab).toHaveStyle({ minHeight: 36 });
    expect(tab.props.hitSlop).toEqual({ top: 4, bottom: 4, left: 0, right: 0 });
  });

  it("throws outside Tabs", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(render(<Tab value="a">A</Tab>)).rejects.toThrow(
      /inside <Tabs>/,
    );
  });
});
