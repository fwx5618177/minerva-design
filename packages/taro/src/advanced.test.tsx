import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Taro from "@tarojs/taro";
import { expect, it, vi } from "vitest";
import * as M from "./index";
it("pagination size changes emit one combined request and controlled owner rejection preserves display", () => {
  const change = vi.fn();
  render(
    <M.Pagination
      total={100}
      current={3}
      pageSize={10}
      showSizeChanger
      onChange={change}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "20 / page" }));
  expect(change.mock.calls).toEqual([[1, 20]]);
  expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
it("pagination hideEdges, visible totals, custom items and default jump ranges follow the React contract", () => {
  const total = vi.fn((n, range) => `${range[0]}–${range[1]} of ${n}`);
  render(
    <M.Pagination
      total={100}
      defaultCurrent={5}
      pageSize={10}
      hideEdges
      showTotal
      totalRender={total}
      itemRender={(page, type) =>
        type === "page" ? <M.Box>Item {page}</M.Box> : "Jump"
      }
    />,
  );
  expect(
    screen.queryByRole("button", { name: "Next page" }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("41–50 of 100")).toBeInTheDocument();
  expect(screen.getByText("Item 5")).toBeInTheDocument();
});
it("pagination clamps visible range after total shrinks and size changes fire one event", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.Pagination
      total={100}
      defaultCurrent={5}
      showSizeChanger
      showTotal
      onChange={change}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "20 / page" }));
  expect(change.mock.calls).toEqual([[1, 20]]);
  rerender(
    <M.Pagination
      total={0}
      showTotal
      totalRender={(total, range) => `${range.join("-")} of ${total}`}
    />,
  );
  expect(screen.getByText("0-0 of 0")).toBeInTheDocument();
});
it("autocomplete groups and sorts options, respects custom input props and emits option click", () => {
  const selected = vi.fn(),
    clicked = vi.fn();
  const { container } = render(
    <M.AutoComplete
      options={[
        { value: 2, label: "Beta", group: "People" },
        { value: 1, label: "Alpha", group: "People" },
        { value: 3, label: "Blocked", group: "People", disabled: true },
      ]}
      groupBy={(o) => o.group ?? ""}
      sortOption={(a, b) => a.label.localeCompare(b.label)}
      onSelect={selected}
      onOptionClick={clicked}
      inputProps={{ "aria-label": "Search people" }}
    />,
  );
  fireEvent.focus(screen.getByLabelText("Search people"));
  expect(screen.getByText("People")).toBeInTheDocument();
  expect(screen.getAllByRole("option")[0]).toHaveTextContent("Alpha");
  fireEvent.click(screen.getByRole("option", { name: "Alpha" }));
  expect(selected).toHaveBeenCalledWith({
    value: 1,
    label: "Alpha",
    group: "People",
  });
  expect(clicked).toHaveBeenCalledTimes(1);
  expect(container.querySelector("input")).toHaveValue("Alpha");
});
it("cascader searches enabled leaf paths and emits both native values and original option path", () => {
  const change = vi.fn();
  const leaf = { value: 2, label: "Shanghai" },
    parent = { value: 1, label: "China", children: [leaf] };
  const { container } = render(
    <M.Cascader
      showSearch
      label="Location"
      options={[
        parent,
        {
          value: 9,
          label: "Locked",
          disabled: true,
          children: [{ value: 10, label: "Shanghai locked" }],
        },
      ]}
      onChange={change}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Please select" }));
  fireEvent.input(container.querySelector("input")!, {
    target: { value: "Shanghai" },
  });
  expect(screen.getAllByRole("option")).toHaveLength(1);
  fireEvent.click(screen.getByRole("option", { name: "China / Shanghai" }));
  expect(change).toHaveBeenCalledWith([1, 2], [parent, leaf]);
});
it("cascader handles rejected lazy loads without unhandled promise and permits retry", async () => {
  const load = vi
    .fn()
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValue(undefined);
  render(
    <M.Cascader
      options={[{ value: "root", label: "Root", isLeaf: false }]}
      loadData={load}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Please select" }));
  fireEvent.click(screen.getByRole("option", { name: "Root" }));
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("offline"),
  );
  fireEvent.click(screen.getByRole("option", { name: "Root" }));
  await waitFor(() => expect(load).toHaveBeenCalledTimes(2));
});
it("responsive grid measures its native container and updates breakpoint columns after resize", () => {
  let width = 600;
  let resize: (() => void) | undefined;
  vi.spyOn(Taro, "onWindowResize").mockImplementation((callback) => {
    resize = () =>
      callback({ size: { windowWidth: width, windowHeight: 800 } });
  });
  const off = vi.spyOn(Taro, "offWindowResize");
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(
    () =>
      ({
        select: () => ({
          boundingClientRect: (
            callback: (rect: { width: number }) => void,
          ) => ({ exec: () => callback({ width }) }),
        }),
      }) as unknown as ReturnType<typeof Taro.createSelectorQuery>,
  );
  const { container, unmount } = render(
    <M.ResponsiveGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      Grid
    </M.ResponsiveGrid>,
  );
  expect(container.firstElementChild).toHaveStyle({
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  });
  width = 900;
  act(() => resize?.());
  expect(container.firstElementChild).toHaveStyle({
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  });
  unmount();
  expect(off).toHaveBeenCalledTimes(1);
});
it("SplitLayout respects collapseBelow and keeps the main slot before its aside", () => {
  vi.mocked(Taro.createSelectorQuery).mockReset();
  vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
    windowWidth: 900,
    windowHeight: 800,
  } as ReturnType<typeof Taro.getSystemInfoSync>);
  const { container, rerender } = render(
    <M.SplitLayout
      collapseBelow="lg"
      aside={<M.Box>Aside</M.Box>}
      asideWidth={320}
    >
      Main
    </M.SplitLayout>,
  );
  expect(container.firstElementChild).toHaveStyle({ flexDirection: "column" });
  expect(container.firstElementChild?.firstElementChild).toHaveTextContent(
    "Main",
  );
  rerender(
    <M.SplitLayout collapseBelow="md" aside={0} asideWidth={320}>
      Main
    </M.SplitLayout>,
  );
  expect(container.firstElementChild).toHaveStyle({ flexDirection: "row" });
  expect(screen.getByText("0")).toBeInTheDocument();
});
it("pagination simple draft rolls back when controlled owner rejects and invalid drafts never request a page", () => {
  const change = vi.fn();
  render(
    <M.Pagination
      total={100}
      current={3}
      pageSize={10}
      simple
      onChange={change}
    />,
  );
  const input = screen.getByLabelText("Current page");
  fireEvent.input(input, { target: { value: "8" } });
  fireEvent.blur(input);
  expect(change).toHaveBeenCalledWith(8, 10);
  expect(input).toHaveValue(3);
  change.mockClear();
  fireEvent.input(input, { target: { value: "" } });
  fireEvent.blur(input);
  expect(change).not.toHaveBeenCalled();
  expect(input).toHaveValue(3);
});
it("tooltip provider schedules enter and leave, skips delay between siblings, and cleans pending callbacks", () => {
  vi.useFakeTimers();
  try {
    const change = vi.fn();
    const { unmount } = render(
      <M.TooltipProvider enterDelay={200} leaveDelay={100} skipDelay={300}>
        <M.Tooltip content="First hint" onOpenChange={change}>
          <M.Box>First trigger</M.Box>
        </M.Tooltip>
        <M.Tooltip content="Second hint">
          <M.Box>Second trigger</M.Box>
        </M.Tooltip>
      </M.TooltipProvider>,
    );
    fireEvent.click(screen.getByText("First trigger"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole("tooltip")).toHaveTextContent("First hint");
    fireEvent.click(screen.getByText("First trigger"));
    act(() => vi.advanceTimersByTime(99));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Second trigger"));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Second hint");
    act(() => vi.advanceTimersByTime(400));
    fireEvent.click(screen.getByText("First trigger"));
    unmount();
    act(() => vi.runAllTimers());
    expect(change.mock.calls).toEqual([[true], [false]]);
  } finally {
    vi.useRealTimers();
  }
});
it("NavTree responds to later active paths while explicit collapse persists and renderLink receives React state", () => {
  const sections = [
    {
      items: [
        {
          id: "branch",
          label: "Settings",
          children: [{ id: "profile", label: "Profile", href: "/profile" }],
        },
      ],
    },
  ];
  const link = vi.fn(
    (
      item: M.NavTreeItem,
      content: React.ReactNode,
      state: M.NavTreeItemState,
    ) => <M.Box className={state.className}>{content}</M.Box>,
  );
  const { rerender } = render(
    <M.NavTree sections={sections} renderLink={link} />,
  );
  expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  rerender(
    <M.NavTree sections={sections} activeId="profile" renderLink={link} />,
  );
  expect(screen.getByText("Profile")).toBeInTheDocument();
  expect(link.mock.calls.at(-1)?.[2]).toMatchObject({
    active: true,
    ancestorActive: false,
    expanded: false,
    depth: 1,
    collapsed: false,
    hasChildren: false,
    disabled: false,
  });
  fireEvent.click(screen.getByRole("treeitem", { name: "Settings" }));
  expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  rerender(
    <M.NavTree sections={sections} activeId="profile" renderLink={link} />,
  );
  expect(screen.queryByText("Profile")).not.toBeInTheDocument();
});
it("CommandDialog includes React command group and description content and filters by group", () => {
  render(
    <M.CommandDialog
      open
      items={[
        {
          id: "profile",
          title: "Profile",
          group: "Accounts",
          description: "Edit your profile",
        },
        { id: "export", title: "Export", group: "Files" },
      ]}
    />,
  );
  expect(
    screen.getByRole("option", { name: "Profile Edit your profile Accounts" }),
  ).toBeInTheDocument();
  fireEvent.input(screen.getByRole("textbox"), {
    target: { value: "Accounts" },
  });
  expect(screen.queryByText("Export")).not.toBeInTheDocument();
  expect(screen.getByText("Edit your profile")).toBeInTheDocument();
});
it("tooltip overrides provider delay, preserves controlled refusal and cancels when disabled", () => {
  vi.useFakeTimers();
  try {
    const change = vi.fn();
    const { rerender } = render(
      <M.TooltipProvider enterDelay={200}>
        <M.Tooltip
          open={false}
          enterDelay={20}
          onOpenChange={change}
          content="Hint"
        >
          <M.Box>Trigger</M.Box>
        </M.Tooltip>
      </M.TooltipProvider>,
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => vi.advanceTimersByTime(20));
    expect(change).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    change.mockClear();
    fireEvent.click(screen.getByText("Trigger"));
    rerender(
      <M.TooltipProvider enterDelay={200}>
        <M.Tooltip
          disabled
          open={false}
          enterDelay={20}
          onOpenChange={change}
          content="Hint"
        >
          <M.Box>Trigger</M.Box>
        </M.Tooltip>
      </M.TooltipProvider>,
    );
    act(() => vi.advanceTimersByTime(200));
    expect(change).not.toHaveBeenCalled();
  } finally {
    vi.useRealTimers();
  }
});
