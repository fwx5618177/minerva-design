import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TabBar, TabBarItem } from "./TabBar";

describe("TabBar (react-native-web)", () => {
  it("renders a DOM tablist with aria-selected tabs and styling hooks", () => {
    render(
      <TabBar>
        <TabBarItem value="home" label="Home" />
        <TabBarItem value="me" label="Me" />
      </TabBar>,
    );
    const list = screen.getByRole("tablist", { name: "Tab bar" });
    expect(list).toHaveAttribute("data-minerva", "tab-bar");
    const home = screen.getByRole("tab", { name: "Home" });
    expect(home).toHaveAttribute("aria-selected", "true");
    expect(home).toHaveAttribute("data-part", "item");
    expect(home).toHaveAttribute("data-selected", "");
  });

  it("clicks select a tab and report the value", () => {
    const onChange = vi.fn();
    render(
      <TabBar onChange={onChange}>
        <TabBarItem value="home" label="Home" />
        <TabBarItem value="me" label="Me" />
        <TabBarItem value="off" label="Off" disabled />
      </TabBar>,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Me" }));
    expect(onChange).toHaveBeenCalledWith("me");
    expect(screen.getByRole("tab", { name: "Me" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.click(screen.getByRole("tab", { name: "Off" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
