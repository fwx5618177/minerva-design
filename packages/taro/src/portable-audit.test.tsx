import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";
it("Box resolves semantic background, radius and shadow tokens", () => {
  const { container } = render(
    <M.Box bg="bg.subtle" rounded="lg" boxShadow="md" />,
  );
  expect(container.firstElementChild?.getAttribute("style")).toContain(
    "background: var(--surface-subtle-color)",
  );
  expect(container.firstElementChild?.getAttribute("style")).toContain(
    "border-radius: var(--radius-lg)",
  );
  expect(container.firstElementChild?.getAttribute("style")).toContain(
    "box-shadow: var(--shadow-md)",
  );
});
it("Drawer compounds close, preserve controlled state and allow cancelled outside dismissal", () => {
  const changed = vi.fn();
  const { container, rerender } = render(
    <M.DrawerRoot defaultOpen>
      <M.DrawerContent
        size="full"
        hiddenDescription="Details"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <M.DrawerBody>Body</M.DrawerBody>
        <M.DrawerFooter>
          <M.DrawerClose>Done</M.DrawerClose>
        </M.DrawerFooter>
      </M.DrawerContent>
    </M.DrawerRoot>,
  );
  expect(screen.getByRole("dialog")).toHaveAccessibleDescription("Details");
  fireEvent.click(container.querySelector(".mn-overlay-mask")!);
  expect(screen.getByRole("dialog")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  rerender(
    <M.DrawerRoot open modal={false} onOpenChange={changed}>
      <M.DrawerContent>
        <M.DrawerClose>Done</M.DrawerClose>
      </M.DrawerContent>
    </M.DrawerRoot>,
  );
  expect(container.querySelector(".mn-overlay-mask")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(changed).toHaveBeenCalledWith(false);
  expect(screen.getByRole("dialog")).toBeVisible();
});
it("Upload rejects an entire invalid batch and applies status/action labels", async () => {
  (vi
    .mocked(Taro.getEnv)
    .mockReturnValue("WEAPP" as ReturnType<typeof Taro.getEnv>),
  vi.spyOn(Taro, "chooseMessageFile")).mockResolvedValue({
    tempFiles: [
      { name: "valid.pdf", size: 1, path: "/valid", type: "file", time: 0 },
      { name: "invalid.txt", size: 1, path: "/bad", type: "file", time: 0 },
    ],
    errMsg: "ok",
  });
  const selected = vi.fn(),
    retry = vi.fn();
  const { rerender } = render(
    <M.Upload
      label="Attachments"
      multiple
      accept=".pdf"
      onFilesSelected={selected}
      labels={{ select: "Browse", invalidType: (n) => `Invalid ${n}` }}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Browse" }));
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid invalid.txt"),
  );
  expect(selected).not.toHaveBeenCalled();
  rerender(
    <M.Upload
      label="Attachments"
      loading
      value={[{ id: "a", name: "a.pdf", status: "error" }]}
      onRetry={retry}
      labels={{ failed: "Failed transfer", retry: (n) => `Again ${n}` }}
    />,
  );
  expect(screen.getByRole("group", { name: "Attachments" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(screen.getByText("Failed transfer")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Again a.pdf" }));
  expect(retry).not.toHaveBeenCalled();
});
it("Command uses labels, preserves custom filter order and resets query on reopening", () => {
  const items = [
    { id: "a", title: "Alpha" },
    { id: "b", title: "Beta" },
  ];
  const { rerender } = render(
    <M.CommandDialog
      open
      items={items}
      resultsLabel="Matches"
      enterLabel="Choose"
      shortcutLabel="Find"
      filter={(items) => [...items].reverse()}
    />,
  );
  const input = screen.getByRole("textbox");
  fireEvent.input(input, { target: { value: "a" } });
  expect(screen.getAllByRole("option").map((node) => node.textContent)).toEqual(
    ["Beta", "Alpha"],
  );
  expect(screen.getByRole("listbox", { name: "Matches" })).toBeVisible();
  expect(screen.getByText("Choose")).toBeVisible();
  rerender(<M.CommandDialog open={false} items={items} />);
  rerender(<M.CommandDialog open items={items} />);
  expect(screen.getByRole("textbox")).toHaveValue("");
});
it("selection controls render custom feedback and inherit RadioGroup axes", () => {
  const { container } = render(
    <>
      <M.Checkbox
        checked
        icon="Tick"
        error
        errorIcon="Warning"
        helperText="Required"
        size="large"
        color="danger"
      />
      <M.Radio error errorMessage="Choose one" errorIcon="Invalid" />
      <M.RadioGroup
        size="small"
        color="success"
        error
        helperText="Group error"
        options={[{ value: "a", label: "Apple" }]}
      />
    </>,
  );
  expect(screen.getByText("Tick")).toBeVisible();
  expect(screen.getByText("Warning")).toBeVisible();
  expect(screen.getByText("Choose one")).toBeVisible();
  expect(screen.getByRole("radio", { name: "Apple" })).toHaveClass(
    "mn-size-small",
    "mn-color-success",
  );
  expect(screen.getByRole("radiogroup")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(container.querySelector(".mn-checkbox")).toHaveClass("mn-size-large");
});
it("native portable props reach their intended slots instead of outer passthrough", () => {
  const { container } = render(
    <>
      <M.Select defaultOpen contentClassName="custom-options" options={[]} />
      <M.TagInput name="tags" />
      <M.Switch icon="Switch icon" iconPlacement="end" value="enabled" />
      <M.Empty
        title="Nothing"
        description={null}
        width={240}
        height={120}
        showShadow
      >
        <span>Footer</span>
      </M.Empty>
      <M.MonthCalendar
        value="2026-10-09"
        getEventsLabel={(day) => `Events ${day}`}
      />
    </>,
  );
  expect(screen.getByRole("listbox")).toHaveClass("custom-options");
  expect(
    container.querySelector('taro-checkbox-group-core[name="tags"]'),
  ).not.toBeNull();
  expect(screen.getByText("Switch icon")).toBeVisible();
  expect(screen.getByRole("status", { name: "Nothing" })).toHaveStyle({
    width: "240px",
    height: "120px",
  });
  expect(screen.getByText("Footer")).toBeVisible();
  expect(
    screen.getByRole("region", { name: "Events 2026-10-09" }),
  ).toBeVisible();
});
it("VirtualList keeps short content compact and delivers the native click event", () => {
  const clicked = vi.fn();
  const { container } = render(
    <M.VirtualList
      items={["One"]}
      itemHeight={32}
      maxHeight={200}
      renderItem={(v) => v}
      onItemClick={clicked}
    />,
  );
  expect(container.firstElementChild).toHaveStyle({ height: "32px" });
  fireEvent.click(screen.getByText("One"));
  expect(clicked).toHaveBeenCalledWith("One", 0, expect.any(Object));
});
it("Upload counts existing files even with multiple replace and rejects size without partial notifications", async () => {
  const picker = (vi
    .mocked(Taro.getEnv)
    .mockReturnValue("WEAPP" as ReturnType<typeof Taro.getEnv>),
  vi.spyOn(Taro, "chooseMessageFile")).mockResolvedValue({
    errMsg: "ok",
    tempFiles: [
      { name: "new.pdf", path: "/new", size: 20, time: 0, type: "file" },
      { name: "other.pdf", path: "/other", size: 1, time: 0, type: "file" },
    ],
  });
  const selected = vi.fn(),
    rejected = vi.fn();
  const { rerender } = render(
    <M.Upload
      multiple
      replace
      maxCount={2}
      value={[{ id: "old", name: "old.pdf", status: "done" }]}
      onFilesSelected={selected}
      onReject={rejected}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() => expect(rejected).toHaveBeenCalledTimes(1));
  expect(selected).not.toHaveBeenCalled();
  picker.mockResolvedValue({
    errMsg: "ok",
    tempFiles: [
      { name: "new.pdf", path: "/new", size: 20, time: 0, type: "file" },
    ],
  });
  rerender(
    <M.Upload
      maxSize={10}
      onFilesSelected={selected}
      onReject={rejected}
      labels={{ tooLarge: (name) => `Large ${name}` }}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("Large new.pdf"),
  );
  expect(selected).not.toHaveBeenCalled();
  picker.mockRejectedValue({ errMsg: "chooseMessageFile:fail cancel" });
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() => expect(picker).toHaveBeenCalledTimes(3));
  expect(rejected).toHaveBeenCalledTimes(2);
});
it("Radio numeric values stay distinct from strings and controlled null rejects changes", () => {
  const change = vi.fn();
  render(
    <M.RadioGroup value={null} onChange={change}>
      <M.Radio value={2}>Numeric</M.Radio>
      <M.Radio value="2">String</M.Radio>
    </M.RadioGroup>,
  );
  fireEvent.click(screen.getByRole("radio", { name: "Numeric" }));
  expect(change).toHaveBeenCalledWith(2, expect.any(Object));
  expect(screen.getByRole("radio", { name: "Numeric" })).toHaveAttribute(
    "aria-checked",
    "false",
  );
});
it("Alert without a title cannot collapse and Card forwards native formType", () => {
  const { container } = render(
    <>
      <M.Alert title={null} collapsible>
        Always shown
      </M.Alert>
      <M.Card interactive type="submit">
        Save card
      </M.Card>
    </>,
  );
  expect(screen.queryByRole("button", { name: "Collapse" })).toBeNull();
  expect(screen.getByText("Always shown")).toBeVisible();
  expect(container.querySelector(".mn-card")).toHaveAttribute(
    "form-type",
    "submit",
  );
  const submit = vi.fn();
  container.addEventListener("tarobuttonsubmit", submit);
  fireEvent.touchEnd(screen.getByRole("button", { name: "Save card" }));
  expect(submit).toHaveBeenCalledTimes(1);
});
it("native selection callbacks include the event and checked values have named form fields", () => {
  const changed = vi.fn(),
    radioChanged = vi.fn();
  const { container } = render(
    <>
      <M.Checkbox
        name="consent"
        value="yes"
        label="Consent"
        onChange={changed}
      />
      <M.RadioGroup name="choice" onChange={radioChanged}>
        <M.Radio value={7}>Seven</M.Radio>
      </M.RadioGroup>
      <M.Switch checked name="mode" value="enabled" />
    </>,
  );
  fireEvent.click(screen.getByRole("checkbox", { name: "Consent" }));
  expect(changed).toHaveBeenCalledWith(true, expect.any(Object));
  expect(container.querySelector('input[name="consent"]')).toHaveValue("yes");
  fireEvent.click(screen.getByRole("radio", { name: "Seven" }));
  expect(radioChanged).toHaveBeenCalledWith(7, expect.any(Object));
  expect(container.querySelector('input[name="choice"]')).toHaveValue("7");
  expect(container.querySelector('input[name="mode"]')).toHaveValue("enabled");
});
it("Upload validates every type before checking any file size", async () => {
  (vi
    .mocked(Taro.getEnv)
    .mockReturnValue("WEAPP" as ReturnType<typeof Taro.getEnv>),
  vi.spyOn(Taro, "chooseMessageFile")).mockResolvedValue({
    errMsg: "ok",
    tempFiles: [
      { name: "big.pdf", path: "/big", size: 100, time: 0, type: "file" },
      { name: "bad.exe", path: "/bad", size: 1, time: 0, type: "file" },
    ],
  });
  render(<M.Upload multiple maxSize={10} accept=".pdf" />);
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("bad.exe"),
  );
});
it("Empty illustration reacts to custom theme surface colors", () => {
  const { container, rerender } = render(
    <M.ConfigProvider theme={{ "surface-color": "#123456" }}>
      <M.Empty useSvg />
    </M.ConfigProvider>,
  );
  const source = () =>
    container
      .querySelector(".mn-empty-illustration img")
      ?.getAttribute("src") ??
    container.querySelector(".mn-empty-illustration")?.getAttribute("src");
  expect(decodeURIComponent(source() ?? "")).toContain("#123456");
  rerender(
    <M.ConfigProvider theme={{ "surface-color": "#abcdef" }}>
      <M.Empty useSvg />
    </M.ConfigProvider>,
  );
  expect(decodeURIComponent(source() ?? "")).toContain("#abcdef");
});
it("RadioGroup starts unselected for empty values and does not emit for the selected option twice", () => {
  const change = vi.fn();
  render(
    <M.RadioGroup onChange={change}>
      <M.Radio value="">Empty value</M.Radio>
      <M.Radio>Missing value</M.Radio>
    </M.RadioGroup>,
  );
  expect(screen.getByRole("radio", { name: "Empty value" })).toHaveAttribute(
    "aria-checked",
    "false",
  );
  fireEvent.click(screen.getByRole("radio", { name: "Empty value" }));
  fireEvent.click(screen.getByRole("radio", { name: "Empty value" }));
  expect(change).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("radio", { name: "Missing value" }));
  expect(change).toHaveBeenCalledTimes(1);
});
