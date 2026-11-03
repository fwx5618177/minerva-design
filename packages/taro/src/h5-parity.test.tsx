import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useState } from "react";
import { afterEach, expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";

// Port of the former Chromium H5 fixture specs (date-picker, h5, styles) for
// the parts not already covered by h5-completion, native-navigation,
// date-picker and final-api-audit tests: roles, state transitions, classes
// and measurement lifecycles observable without a real layout engine.
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.body.style.overflow = "";
});

function countMeasurements() {
  const counter = { total: 0 };
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
    const query = {
      select: () => query,
      boundingClientRect: (cb: (rect: unknown) => void) => {
        counter.total++;
        cb({
          width: 80,
          height: 30,
          left: 100,
          top: 100,
          right: 180,
          bottom: 130,
        });
        return query;
      },
      exec: (cb?: () => void) => cb?.(),
    };
    return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
  });
  return counter;
}

it("DatePicker exposes a labelled dialog with disabled out-of-range cells and removes it after selection", () => {
  render(
    <M.DatePicker
      label="Start date"
      defaultValue="2026-10-15"
      minDate="2026-10-10"
      maxDate="2026-10-20"
    />,
  );
  const input = screen.getByRole("textbox", { name: "Start date" });
  fireEvent.click(input);
  const panel = screen.getByRole("dialog", { name: "Start date" });
  expect(
    within(panel).getByRole("gridcell", { name: "2026-10-09" }),
  ).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(within(panel).getByRole("gridcell", { name: "2026-10-16" }));
  expect(input).toHaveValue("2026-10-16");
  expect(screen.queryByRole("dialog", { name: "Start date" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Clear date" }));
  expect(input).toHaveValue("");
});

it("triggered Drawer locks scrolling, closes on Escape and returns focus to its trigger", async () => {
  render(
    <M.Drawer title="Locked drawer" trigger={<M.Button>Open drawer</M.Button>}>
      <M.Button>Inside drawer</M.Button>
    </M.Drawer>,
  );
  const trigger = screen.getByRole("button", { name: "Open drawer" });
  trigger.focus();
  fireEvent.click(trigger);
  const drawer = screen.getByRole("dialog", { name: "Locked drawer" });
  await act(async () => {});
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(document.activeElement ?? drawer, { key: "Escape" });
  await act(async () => {});
  expect(screen.queryByRole("dialog", { name: "Locked drawer" })).toBeNull();
  expect(document.body.style.overflow).not.toBe("hidden");
  await waitFor(() => expect(trigger).toHaveFocus());
});

it("compound bottom Drawer and xlarge Modal render their sections and close through their close actions", () => {
  render(
    <>
      <M.Drawer
        trigger={<M.Button>Open audit drawer</M.Button>}
        title={<span>Audit drawer</span>}
        size="large"
        side="bottom"
      >
        <M.DrawerBody>Drawer contents</M.DrawerBody>
        <M.DrawerFooter>
          <M.DrawerClose>Finish drawer</M.DrawerClose>
        </M.DrawerFooter>
      </M.Drawer>
      <M.Modal
        trigger={<M.Button>Open wide modal</M.Button>}
        title={<span>Wide modal</span>}
        size="xlarge"
      >
        <M.ModalBody>Wide content</M.ModalBody>
        <M.ModalFooter>
          <M.ModalClose>Finish modal</M.ModalClose>
        </M.ModalFooter>
      </M.Modal>
    </>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Open audit drawer" }));
  const drawer = screen.getByRole("dialog", { name: "Audit drawer" });
  expect(drawer.querySelector(".mn-drawer__footer")).toHaveTextContent(
    "Finish drawer",
  );
  fireEvent.click(screen.getByRole("button", { name: "Finish drawer" }));
  expect(screen.queryByRole("dialog", { name: "Audit drawer" })).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Open wide modal" }));
  const modal = screen.getByRole("dialog", { name: "Wide modal" });
  expect(modal.className).toMatch(/xlarge/);
  expect(modal).toHaveTextContent("Wide content");
  fireEvent.click(screen.getByRole("button", { name: "Finish modal" }));
  expect(screen.queryByRole("dialog", { name: "Wide modal" })).toBeNull();
});

it("controlled 12-hour TimePicker commits a typed value on Enter, keeps focus and switches the period", () => {
  function Fixture() {
    const [time, setTime] = useState<Date | undefined>(
      new Date(2025, 0, 1, 13, 15),
    );
    return (
      <M.TimePicker
        value={time}
        onChange={setTime}
        use12Hours
        format="hh:mm:ss a"
        showSecond={false}
        minuteStep={15}
      />
    );
  }
  const { container } = render(<Fixture />);
  const input = screen.getByRole("textbox", { name: "Time" });
  input.focus();
  fireEvent.input(input, { target: { value: "02:30 PM" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(input).toHaveFocus();
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(input).toHaveValue("02:30 PM");

  fireEvent.click(input);
  expect(
    within(screen.getByRole("listbox", { name: "Minutes" })).getAllByRole(
      "option",
    ),
  ).toHaveLength(4);
  expect(screen.queryByRole("listbox", { name: "Seconds" })).toBeNull();
  fireEvent.click(screen.getByRole("option", { name: "AM" }));
  expect(input).toHaveValue("02:30 AM");
  fireEvent.click(container.querySelector(".mn-time-backdrop")!);
  expect(screen.queryByRole("listbox")).toBeNull();
});

it("PageTabs marks an externally activated page as current", () => {
  function Fixture() {
    const [active, setActive] = useState("page-0");
    return (
      <>
        <M.Button onClick={() => setActive("page-11")}>Go last page</M.Button>
        <M.PageTabs
          activeValue={active}
          onChange={setActive}
          aria-label="Open pages"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <M.PageTab key={i} value={`page-${i}`} label={`Page ${i + 1}`} />
          ))}
        </M.PageTabs>
      </>
    );
  }
  render(<Fixture />);
  expect(screen.getByRole("tab", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  fireEvent.click(screen.getByRole("button", { name: "Go last page" }));
  expect(screen.getByRole("tab", { name: "Page 12" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(screen.getByRole("tab", { name: "Page 1" })).not.toHaveAttribute(
    "aria-current",
  );
});

it("edge Popover with an arrow stops measuring after PopoverClose and after its owner unmounts", () => {
  vi.useFakeTimers();
  const measurements = countMeasurements();
  function Fixture() {
    const [mounted, setMounted] = useState(true);
    return mounted ? (
      <M.Popover>
        <M.PopoverTrigger>
          <M.Button>Edge details</M.Button>
        </M.PopoverTrigger>
        <M.PopoverContent
          side="bottom"
          align="end"
          arrow
          aria-label="Edge details panel"
        >
          <M.PopoverClose>
            <M.Button>Close panel</M.Button>
          </M.PopoverClose>
          <M.Button onClick={() => setMounted(false)}>Unmount panel</M.Button>
        </M.PopoverContent>
      </M.Popover>
    ) : null;
  }
  const { container } = render(<Fixture />);
  fireEvent.click(screen.getByRole("button", { name: "Edge details" }));
  const panel = screen.getByRole("dialog", { name: "Edge details panel" });
  expect(panel).toHaveStyle({ position: "fixed" });
  expect(panel).toHaveAttribute("data-side");
  expect(container.querySelector(".mn-floating-arrow")).toBeInTheDocument();
  expect(measurements.total).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole("button", { name: "Close panel" }));
  expect(
    screen.queryByRole("dialog", { name: "Edge details panel" }),
  ).toBeNull();
  const closed = measurements.total;
  act(() => vi.advanceTimersByTime(300));
  expect(measurements.total).toBe(closed);

  fireEvent.click(screen.getByRole("button", { name: "Edge details" }));
  fireEvent.click(screen.getByRole("button", { name: "Unmount panel" }));
  expect(screen.queryByRole("button", { name: "Edge details" })).toBeNull();
  const unmounted = measurements.total;
  act(() => vi.advanceTimersByTime(300));
  expect(measurements.total).toBe(unmounted);
});

it("nested Menu opens two submenu levels, selects the deep item and closes every level", () => {
  vi.useFakeTimers();
  countMeasurements();
  const selected = vi.fn();
  render(
    <M.Menu
      defaultOpen
      size="small"
      aria-label="Root actions"
      items={[
        {
          key: "more",
          label: "More actions",
          children: [
            {
              key: "advanced",
              label: "Advanced",
              children: [{ key: "deep", label: "Deep action" }],
            },
          ],
        },
      ]}
      onSelect={(item) => selected(item.key)}
    >
      <M.Button>Nested actions</M.Button>
    </M.Menu>,
  );
  expect(
    screen.getByRole("menu", { name: "Root actions" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("menuitem", { name: "More actions" }));
  expect(screen.getByRole("menu", { name: "More actions" })).toHaveStyle({
    position: "fixed",
  });
  fireEvent.click(screen.getByRole("menuitem", { name: "Advanced" }));
  expect(screen.getByRole("menu", { name: "Advanced" })).toHaveStyle({
    position: "fixed",
  });
  fireEvent.click(screen.getByRole("menuitem", { name: "Deep action" }));
  expect(selected).toHaveBeenCalledWith("deep");
  expect(screen.queryByRole("menu")).toBeNull();
});

it("theme toggle, attached badge, switches, Alert and Input expose their style axes", () => {
  const { container } = render(
    <M.ConfigProvider theme="light">
      <M.ThemeToggle />
      <M.Card id="theme-card" padding="large">
        <M.Avatar id="avatar" name="Ada Lovelace" size="large" />
        <M.Badge content={4} position="bottom-left" borderWidth="2px">
          <M.Button>Inbox</M.Button>
        </M.Badge>
      </M.Card>
      <M.Switch
        aria-label="Large square switch"
        size="large"
        shape="square"
        color="danger"
      />
      <M.Switch
        aria-label="Small segments"
        variant="segmented"
        size="small"
        color="success"
        offLabel="Off"
        onLabel="On"
      />
      <M.Alert
        id="audit-alert"
        size="large"
        variant="outline"
        color="danger"
        animation={false}
      >
        Alert geometry
      </M.Alert>
      <M.Input
        className="audit-small-input"
        prefix="@"
        size="small"
        variant="filled"
        aria-label="Small field"
      />
    </M.ConfigProvider>,
  );
  const provider = container
    .querySelector("#theme-card")!
    .closest("[data-theme], .mn-provider, [class*='mn-theme']");
  const before = provider?.outerHTML.slice(0, 200);
  fireEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(provider?.outerHTML.slice(0, 200)).not.toBe(before);

  expect(container.querySelector("#theme-card")).toHaveStyle({
    padding: "24px",
  });
  const badge = screen.getByRole("status");
  expect(badge).toHaveTextContent("4");
  expect(badge).toHaveStyle({
    position: "absolute",
    bottom: "0px",
    left: "0px",
    borderWidth: "2px",
  });

  const large = screen.getByRole("switch", { name: "Large square switch" });
  expect(large).toHaveAttribute("aria-checked", "false");
  fireEvent.click(large);
  expect(large).toHaveAttribute("aria-checked", "true");
  const segments = screen.getByRole("group", { name: "Small segments" });
  expect(
    within(segments).getByRole("button", { name: "On" }),
  ).toBeInTheDocument();

  const alert = container.querySelector("#audit-alert")!;
  expect(alert).toHaveTextContent("Alert geometry");
  expect(alert.className).toMatch(/outline/);
  expect(alert.className).toMatch(/danger/);

  const field = container.querySelector(".audit-small-input")!;
  expect(field).toHaveClass("mn-input-root");
  expect(
    within(field as HTMLElement).getByRole("textbox"),
  ).toHaveAccessibleName("Small field");
});
