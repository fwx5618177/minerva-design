import { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ContextMenu,
  Menu,
  PageTab,
  PageTabs,
  ToastProvider,
  Tooltip,
  TooltipProvider,
  __toastStoreForTesting,
  toast,
  useToast,
  type ContextMenuProps,
  type MenuAction,
  type MenuEntry,
  type MenuProps,
  type PageTabProps,
  type PageTabsProps,
  type ToastOptions,
  type ToastPosition,
  type ToastProviderProps,
  type ToastStatus,
  type TooltipAlign,
  type TooltipProps,
  type TooltipProviderProps,
  type TooltipSide,
  type TooltipTone,
} from "./feedback";

afterEach(() => {
  __toastStoreForTesting.reset();
  vi.useRealTimers();
});

describe("compat Tooltip", () => {
  it("renders novel props (label, side, align, tone, showArrow, className, ref) without a wrapper", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    const side: TooltipSide = "bottom";
    const align: TooltipAlign = "start";
    const props: TooltipProps = {
      label: "Save draft",
      side,
      align,
      showArrow: true,
      className: "extra",
      tone: "auto",
      children: <button type="button">Save</button>,
    };
    const { container } = render(<Tooltip ref={ref} {...props} />);
    const trigger = screen.getByRole("button", { name: "Save" });
    expect(container.firstElementChild).toBe(trigger);
    await user.tab();
    const tooltip = await screen.findByRole("tooltip");
    expect(ref.current).toBe(tooltip);
    expect(tooltip).toHaveTextContent("Save draft");
    expect(tooltip).toHaveClass(
      "ui-tooltip-content",
      "ui-tooltip-tone-auto",
      "extra",
    );
    expect(tooltip).toHaveAttribute("data-side", "bottom");
    expect(tooltip).toHaveAttribute("data-align", "start");
    expect(tooltip.querySelector(".ui-tooltip-arrow")).not.toBeNull();
    expect(trigger).toHaveAccessibleDescription("Save draft");
  });

  it.each<[TooltipTone, string]>([
    ["auto", "auto"],
    ["dark", "dark"],
    ["light", "light"],
    ["default", "auto"],
    ["inverse", "dark"],
  ])("maps tone=%s to the %s tone class", async (tone, expected) => {
    const user = userEvent.setup();
    render(
      <Tooltip label="L" tone={tone}>
        <button type="button">T</button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveClass(
      `ui-tooltip-tone-${expected}`,
    );
  });

  it("app usage: sidebar toggle with side=right tone=dark, and disabled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tooltip label="展开菜单" side="right" align="center" tone="dark">
          <button type="button" aria-label="展开菜单" aria-expanded={false}>
            ≡
          </button>
        </Tooltip>
        <Tooltip label="Never" disabled>
          <button type="button">Plain</button>
        </Tooltip>
      </>,
    );
    await user.tab();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveAttribute("data-side", "right");
    expect(tooltip).toHaveAttribute("data-align", "center");
    expect(tooltip).toHaveClass("ui-tooltip-tone-dark");
    await user.tab();
    expect(screen.getByRole("button", { name: "Plain" })).not.toHaveAttribute(
      "data-state",
    );
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("uses novel's per-tooltip 300ms default (even inside a provider) or the explicit delayDuration", () => {
    vi.useFakeTimers();
    const providerProps: TooltipProviderProps = {
      delayDuration: 180,
      skipDelayDuration: 0,
      disableHoverableContent: true,
      children: (
        <Tooltip label="In provider">
          <button type="button">P</button>
        </Tooltip>
      ),
    };
    render(
      <>
        <Tooltip label="Default">
          <button type="button">D</button>
        </Tooltip>
        <Tooltip label="Explicit" delayDuration={50}>
          <button type="button">E</button>
        </Tooltip>
        <TooltipProvider {...providerProps} />
      </>,
    );
    const hover = (name: string) =>
      fireEvent.mouseEnter(screen.getByRole("button", { name }));
    const leave = (name: string) =>
      fireEvent.mouseLeave(screen.getByRole("button", { name }));

    hover("D");
    act(() => vi.advanceTimersByTime(299));
    expect(screen.queryByRole("tooltip")).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Default");
    leave("D");
    act(() => vi.advanceTimersByTime(1));

    hover("E");
    act(() => vi.advanceTimersByTime(50));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Explicit");
    leave("E");
    act(() => vi.advanceTimersByTime(1));

    // As in @novel-isr/ui, the per-tooltip 300ms default wins over the
    // provider's delayDuration
    hover("P");
    act(() => vi.advanceTimersByTime(180));
    expect(screen.queryByRole("tooltip")).toBeNull();
    act(() => vi.advanceTimersByTime(120));
    expect(screen.getByRole("tooltip")).toHaveTextContent("In provider");
  });
});

const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { type: "separator", key: "sep" },
  {
    type: "group",
    key: "danger",
    label: "Danger zone",
    items: [{ key: "delete", label: "Delete" }],
  },
];

describe("compat Menu / ContextMenu", () => {
  it("maps size sm/md and keeps side/align and onSelect(original item)", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelect = vi.fn<(item: MenuAction) => void>();
    const props: MenuProps = {
      items,
      onSelect,
      size: "sm",
      side: "top",
      align: "start",
      children: <button type="button">Actions</button>,
    };
    render(<Menu {...props} />);
    await user.click(screen.getByRole("button", { name: "Actions" }));
    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("ui-menu-content", "ui-menu-size-sm");
    expect(menu).toHaveAttribute("data-side", "top");
    expect(menu).toHaveAttribute("data-align", "start");
    await user.click(within(menu).getByRole("menuitem", { name: /Edit/ }));
    expect(onSelect).toHaveBeenCalledWith(items[0]);
  });

  it("defaults to md and supports controlled open", () => {
    const onOpenChange = vi.fn();
    render(
      <Menu items={items} open onOpenChange={onOpenChange}>
        <button type="button">C</button>
      </Menu>,
    );
    expect(screen.getByRole("menu")).toHaveClass("ui-menu-size-md");
  });

  it("opens the context menu on right click", async () => {
    const onSelect = vi.fn();
    const props: ContextMenuProps = {
      items,
      onSelect,
      size: "sm",
      children: <div>Row</div>,
    };
    render(<ContextMenu {...props} />);
    fireEvent.contextMenu(screen.getByText("Row"));
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveClass("ui-menu-size-sm");
  });

  it("context menu defaults to md", async () => {
    render(
      <ContextMenu items={items}>
        <div>Area</div>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("Area"));
    expect(await screen.findByRole("menu")).toHaveClass("ui-menu-size-md");
  });
});

describe("compat Toast", () => {
  it("keeps the store semantics (same id replaces) and exposes the test store", () => {
    const opts: ToastOptions = { id: "k", duration: 0 };
    toast.error("first", opts);
    toast.error("second", opts);
    expect(__toastStoreForTesting.peek()).toHaveLength(1);
    expect(__toastStoreForTesting.peek()[0]?.title).toBe("second");
  });

  it("app usage: ToastProvider position=top-right with toast.success / error / warning / info", () => {
    const position: ToastPosition = "top-right";
    const props: ToastProviderProps = {
      position,
      children: <main>app</main>,
    };
    render(<ToastProvider {...props} />);
    act(() => {
      toast.success("欢迎回来");
      toast.error("登录失败");
      toast.warning("注意");
      toast.info("请输入双重验证代码");
    });
    // novel-isr-ui's Chinese built-in strings, under lib-core's default "en"
    const region = screen.getByRole("region", { name: "通知" });
    expect(region).toHaveAttribute("data-position", "top-right");
    expect(
      within(region).getAllByRole("button", { name: "关闭" }),
    ).toHaveLength(4);
    expect(region).toHaveClass("ui-toast-viewport");
    expect(within(region).getByRole("alert")).toHaveClass(
      "ui-toast-status-danger",
    );
    expect(within(region).getAllByRole("status")).toHaveLength(3);
  });

  it("maps every novel position and defaults to top-right", () => {
    const positions: ToastPosition[] = [
      "top-left",
      "top-center",
      "bottom-right",
      "bottom-left",
      "bottom-center",
    ];
    for (const position of positions) {
      const { unmount } = render(
        <ToastProvider position={position}>
          <span />
        </ToastProvider>,
      );
      expect(screen.getByRole("region")).toHaveAttribute(
        "data-position",
        position,
      );
      unmount();
    }
    render(
      <ToastProvider>
        <span />
      </ToastProvider>,
    );
    expect(screen.getByRole("region")).toHaveAttribute(
      "data-position",
      "top-right",
    );
  });

  it("useToast returns the toast function with all shortcuts", () => {
    let api: ReturnType<typeof useToast> | undefined;
    function Probe() {
      api = useToast();
      return null;
    }
    render(<Probe />);
    expect(api).toBe(toast);
    const status: ToastStatus = "warning";
    const id = api!({ status, title: "t" });
    api!.dismiss(id);
    expect(__toastStoreForTesting.peek()[0]?.state).toBe("closing");
  });
});

describe("compat PageTabs", () => {
  it("maps label / scrollLabels and keeps PageTab as is", async () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(600);
    const select = vi.fn();
    const ref = createRef<HTMLDivElement>();
    const tab: PageTabProps = {
      value: "article",
      label: "Article",
      active: true,
      onSelect: select,
      ref,
    };
    const props: PageTabsProps = {
      label: "Open pages",
      activeValue: "article",
      scrollLabels: { left: "左", right: "右" },
      children: <PageTab {...tab} />,
    };
    render(<PageTabs {...props} />);
    expect(screen.getByRole("navigation", { name: "Open pages" })).toHaveClass(
      "ui-page-tabs",
    );
    expect(screen.getByRole("button", { name: "左" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "右" })).toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: "Article" });
    expect(trigger).toHaveAttribute("aria-current", "page");
    expect(ref.current?.dataset.value).toBe("article");
    fireEvent.click(trigger);
    expect(select).toHaveBeenCalledTimes(1);
    vi.restoreAllMocks();
  });

  it("defaults the scroll labels to novel's English strings", async () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(600);
    render(
      <PageTabs label="Pages" activeValue="a">
        <PageTab value="a" label="A" />
      </PageTabs>,
    );
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Scroll pages right" }),
      ).toBeInTheDocument(),
    );
    vi.restoreAllMocks();
  });
});
