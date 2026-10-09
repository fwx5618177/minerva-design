import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Select,
  Menu,
  Button,
  CommandDialog,
  HtmlPreview,
  Upload,
  Drawer,
} from "./index";
it("H5 Tabs roves without selecting in manual mode and honors non-looping edges", () => {
  render(
    <Tabs defaultValue="a" activationMode="manual">
      <TabList loop={false}>
        <Tab value="a">Alpha</Tab>
        <Tab value="b" disabled>
          Blocked
        </Tab>
        <Tab value="c">Charlie</Tab>
      </TabList>
      <TabPanel value="a">First panel</TabPanel>
      <TabPanel value="c">Last panel</TabPanel>
    </Tabs>,
  );
  const a = screen.getByRole("tab", { name: "Alpha" }),
    c = screen.getByRole("tab", { name: "Charlie" });
  a.focus();
  fireEvent.keyDown(a, { key: "ArrowRight" });
  expect(c).toHaveFocus();
  expect(a).toHaveAttribute("aria-selected", "true");
  fireEvent.keyDown(c, { key: "ArrowRight" });
  expect(c).toHaveFocus();
  fireEvent.keyDown(c, { key: "Enter" });
  expect(c).toHaveAttribute("aria-selected", "true");
});
it("H5 Select opens with keyboard, skips disabled choices, and commits", async () => {
  const change = vi.fn();
  render(
    <Select
      onChange={change}
      options={[
        { value: "a", label: "Alpha" },
        { value: "b", label: "Blocked", disabled: true },
        { value: "c", label: "Charlie" },
      ]}
    />,
  );
  const trigger = screen.getByRole("combobox");
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  await waitFor(() =>
    expect(screen.getByRole("option", { name: "Alpha" })).toHaveFocus(),
  );
  fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
  expect(screen.getByRole("option", { name: "Charlie" })).toHaveFocus();
  fireEvent.keyDown(document.activeElement!, { key: "Enter" });
  expect(change).toHaveBeenCalledWith("c");
});
it("H5 nonmodal Menu dismisses outside and CommandDialog supports result keys", async () => {
  const w = render(
    <Menu modal={false} defaultOpen items={[{ key: "a", label: "Alpha" }]}>
      <Button>Menu</Button>
    </Menu>,
  );
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole("menu")).toBeNull();
  w.unmount();
  const select = vi.fn();
  render(
    <CommandDialog
      defaultOpen
      items={[
        { id: "a", title: "Alpha" },
        { id: "b", title: "Beta", onSelect: select },
      ]}
    />,
  );
  const input = screen.getByRole("textbox");
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(select).toHaveBeenCalledOnce();
});
it("H5 preview uses an opaque sandbox with network-blocking policy", () => {
  const w = render(
    <HtmlPreview
      html="<p>Hello</p><script>alert(1)</script>"
      title="Preview"
    />,
  );
  const frame = w.container.querySelector("iframe");
  expect(frame).not.toBeNull();
  expect(frame).toHaveAttribute("sandbox", "");
  expect(frame?.getAttribute("srcdoc")).toContain("default-src 'none'");
});
it("H5 file input delivers real File objects and clears after selection", () => {
  const selected = vi.fn();
  const w = render(<Upload accept=".txt" onFilesSelected={selected} />);
  const input = w.container.querySelector("input[type=file]")!;
  expect(input).not.toBeNull();
  const file = new File(["hello"], "hello.txt", { type: "text/plain" });
  fireEvent.change(input, { target: { files: [file] } });
  expect(selected).toHaveBeenCalledWith([file]);
});
it("H5 modal drawer locks scrolling and restores after close", async () => {
  const w = render(<Drawer defaultOpen title="Details" />);
  await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));
  w.unmount();
  expect(document.body.style.overflow).not.toBe("hidden");
});
it("H5 command shortcut opens the palette with shared shortcut matching", () => {
  render(
    <CommandDialog shortcut="mod+k" items={[{ id: "a", title: "Alpha" }]} />,
  );
  fireEvent.keyDown(document, { key: "k", ctrlKey: true });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it.each([undefined, false, true])(
  "H5 Popover modal=%s honors its scope, outside dismissal and Escape restoration",
  async (modal) => {
    const M = await import("./index");
    const w = render(
      <>
        <button>Outside popover</button>
        <M.Popover modal={modal}>
          <M.PopoverTrigger>Open popover</M.PopoverTrigger>
          <M.PopoverContent>
            <button>Inside popover</button>
          </M.PopoverContent>
        </M.Popover>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Open popover" });
    trigger.focus();
    fireEvent.click(trigger);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Inside popover" }),
      ).toHaveFocus(),
    );
    expect(document.body.style.overflow === "hidden").toBe(modal === true);
    const outside = screen.getByRole("button", {
      name: "Outside popover",
      hidden: true,
    });
    expect(outside.closest("[inert]") !== null).toBe(modal === true);
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(trigger);
    if (modal)
      fireEvent.click(w.container.querySelector(".mn-popover-backdrop")!);
    else fireEvent.pointerDown(outside);
    expect(screen.queryByRole("dialog")).toBeNull();
    w.unmount();
  },
);
it("PopoverClose composes child and owner handlers, honors cancellation and disabled state", async () => {
  const M = await import("./index");
  const owner = vi.fn(),
    child = vi.fn((event: { preventDefault(): void }) =>
      event.preventDefault(),
    );
  const w = render(
    <M.Popover defaultOpen>
      <M.PopoverContent>
        <M.PopoverClose asChild onClick={owner}>
          <M.Button onClick={child}>Canceled close</M.Button>
        </M.PopoverClose>
        <M.PopoverClose onClick={(event) => event.preventDefault()}>
          Owner canceled
        </M.PopoverClose>
        <M.PopoverClose disabled>Disabled close</M.PopoverClose>
      </M.PopoverContent>
    </M.Popover>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Canceled close" }));
  expect(child).toHaveBeenCalledOnce();
  expect(owner).toHaveBeenCalledOnce();
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Owner canceled" }));
  fireEvent.click(screen.getByRole("button", { name: "Disabled close" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  w.unmount();
});

it("PopoverTrigger exposes composed owner and child click handlers without opening after cancellation", async () => {
  const M = await import("./index");
  const owner = vi.fn();
  render(
    <M.Popover>
      <M.PopoverTrigger asChild onClick={owner}>
        <M.Button onClick={(event) => event.preventDefault()}>
          Canceled opening
        </M.Button>
      </M.PopoverTrigger>
      <M.PopoverContent>Hidden content</M.PopoverContent>
    </M.Popover>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Canceled opening" }));
  expect(owner).toHaveBeenCalledOnce();
  expect(screen.queryByRole("dialog")).toBeNull();
});
