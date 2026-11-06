import { Profiler } from "react";
import { act, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Tabs, Tab, TabList, TabPanel } from "./Tabs";

it("does not commit selection consumers while only manual tab focus changes", () => {
  const commits = vi.fn();
  render(
    <Profiler id="tabs" onRender={commits}>
      <Tabs defaultValue="a" activationMode="manual">
        <TabList>
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>
    </Profiler>,
  );
  commits.mockClear();
  const tabs = screen.getAllByRole("tab");
  act(() => tabs[0].focus());
  act(() => tabs[1].focus());
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  console.log(
    JSON.stringify({
      metric: "manual-tab-focus-commits",
      commits: commits.mock.calls.length,
    }),
  );
  expect(commits).not.toHaveBeenCalled();
  act(() => tabs[1].click());
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
});
