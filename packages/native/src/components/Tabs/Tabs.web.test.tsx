import { fireEvent, render, screen } from "@testing-library/react";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

const Letters = ({ onChange }: { onChange?: (value: string) => void }) => (
  <Tabs defaultValue="a" onChange={onChange}>
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
  </Tabs>
);

describe("Tabs (react-native-web)", () => {
  it("renders the WAI-ARIA tabs roles with the styling hooks", () => {
    render(<Letters />);
    const list = screen.getByRole("tablist", { name: "Letters" });
    expect(list).toHaveAttribute("data-minerva", "tabs");
    expect(list).toHaveAttribute("data-part", "list");
    const alpha = screen.getByRole("tab", { name: "Alpha" });
    expect(alpha).toHaveAttribute("aria-selected", "true");
    expect(alpha).toHaveAttribute("data-part", "tab");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
    expect(screen.queryByText("Panel B")).toBeNull();
  });

  it("clicks select a tab and swap the panel; disabled tabs are ignored", () => {
    const onChange = vi.fn();
    render(<Letters onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Panel B")).toBeTruthy();
    expect(screen.queryByText("Panel A")).toBeNull();

    const gamma = screen.getByRole("tab", { name: "Gamma" });
    expect(gamma).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(gamma);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("arrow keys move the selection", () => {
    const onChange = vi.fn();
    render(<Letters onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("b");
    // Gamma is disabled: wraps around to Alpha
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("a");
  });
});
