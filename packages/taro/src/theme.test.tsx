import { act, fireEvent, render, screen } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { expect, it, vi } from "vitest";
import {
  ThemeProvider,
  ThemeToggle,
  ConfigProvider,
  PaletteToggle,
  ConfirmDialog,
  Input,
  NumberInput,
  Empty,
  JsonField,
  KeyValueEditor,
  TagInput,
  Table,
  TimePicker,
} from "./index";
it("system theme follows platform theme changes and removes native subscriptions", () => {
  let listener: ((event: { theme: "light" | "dark" }) => void) | undefined;
  vi.spyOn(Taro, "onThemeChange").mockImplementation((callback) => {
    listener = callback;
  });
  const off = vi.spyOn(Taro, "offThemeChange");
  const { container, unmount } = render(
    <ThemeProvider defaultTheme="system" disableStorage>
      <ThemeToggle />
    </ThemeProvider>,
  );
  expect(screen.getByRole("button", { name: "System" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  act(() => listener?.({ theme: "dark" }));
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveAttribute("data-theme", "dark");
  unmount();
  expect(off).toHaveBeenCalledWith(listener);
});
it("theme persistence uses native storage and disableStorage prevents writes", () => {
  const write = vi.spyOn(Taro, "setStorageSync"),
    read = vi.spyOn(Taro, "getStorageSync").mockReturnValue(undefined);
  const { unmount } = render(
    <ThemeProvider defaultTheme="light">
      <ThemeToggle />
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(write).toHaveBeenCalledWith("minerva-theme", "dark");
  unmount();
  write.mockClear();
  render(
    <ThemeProvider defaultTheme="light" disableStorage>
      <ThemeToggle showSystem={false} />
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(write).not.toHaveBeenCalled();
  expect(
    screen.queryByRole("button", { name: "System" }),
  ).not.toBeInTheDocument();
  read.mockRestore();
});
it("palette labels and changes propagate native token classes", () => {
  const { container } = render(
    <ConfigProvider>
      <PaletteToggle
        palettes={["editorial"]}
        showDefault
        labels={{ editorial: "Print", default: "Original" }}
      />
    </ConfigProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Print" }));
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveClass("mn-palette-editorial");
});
it("persisted theme overrides initial default after remount", () => {
  vi.spyOn(Taro, "getStorageSync").mockImplementation((key) =>
    key === "minerva-theme" ? "dark" : undefined,
  );
  const { container } = render(
    <ThemeProvider defaultTheme="light">
      <ThemeToggle />
    </ThemeProvider>,
  );
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveAttribute("data-theme", "dark");
  vi.mocked(Taro.getStorageSync).mockReset();
});
it("custom theme objects resolve native variables and github-dark supports the shared named theme", () => {
  const { container, rerender } = render(
    <ConfigProvider
      theme={{ "primary-color": "#123456", "background-color": "#fafafa" }}
    >
      Custom
    </ConfigProvider>,
  );
  expect(
    (container.firstElementChild as HTMLElement).style.getPropertyValue(
      "--primary-color",
    ),
  ).toBe("#123456");
  rerender(<ConfigProvider theme="github-dark">Github</ConfigProvider>);
  expect(
    (container.firstElementChild as HTMLElement).style.getPropertyValue(
      "--background-color",
    ),
  ).toBe("#0d1117");
  expect(container.firstElementChild).toHaveAttribute("data-theme", "dark");
});
it("locale dictionaries scope labels and update when locale changes", () => {
  const { rerender } = render(
    <ConfigProvider locale={{ language: "zh" }}>
      <ThemeToggle />
      <PaletteToggle palettes={["editorial"]} />
    </ConfigProvider>,
  );
  expect(screen.getByRole("button", { name: "暗" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "文学" })).toBeInTheDocument();
  rerender(
    <ConfigProvider locale={{ language: "fr" }}>
      <ThemeToggle />
    </ConfigProvider>,
  );
  expect(screen.queryByRole("button", { name: "暗" })).not.toBeInTheDocument();
});

it("locale scopes common built-in actions and explicit labels still override translations", () => {
  const { rerender } = render(
    <ConfigProvider locale={{ language: "zh" }}>
      <ConfirmDialog open title="Confirm action" />
      <Input defaultValue="text" clearable />
      <NumberInput showStepper />
      <Empty />
    </ConfigProvider>,
  );
  expect(screen.getByRole("button", { name: "确定" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "清除" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "增加" })).toBeInTheDocument();
  expect(screen.getByText("暂无数据")).toBeInTheDocument();
  rerender(
    <ConfigProvider locale={{ language: "zh" }}>
      <ConfirmDialog open title="Action" confirmLabel="Proceed" />
    </ConfigProvider>,
  );
  expect(screen.getByRole("button", { name: "Proceed" })).toBeInTheDocument();
});
it("custom light and dark theme pairs follow native system changes", () => {
  let change: ((event: { theme: "light" | "dark" }) => void) | undefined;
  vi.spyOn(Taro, "onThemeChange").mockImplementation((callback) => {
    change = callback;
  });
  const { container } = render(
    <ConfigProvider
      theme={{
        light: { "primary-color": "#112233" },
        dark: { "primary-color": "#445566" },
      }}
    />,
  );
  act(() => change?.({ theme: "light" }));
  expect(
    (container.firstElementChild as HTMLElement).style.getPropertyValue(
      "--primary-color",
    ),
  ).toBe("#112233");
  act(() => change?.({ theme: "dark" }));
  expect(
    (container.firstElementChild as HTMLElement).style.getPropertyValue(
      "--primary-color",
    ),
  ).toBe("#445566");
});
it("locale dictionaries also cover data selection, JSON and tag editor actions", () => {
  render(
    <ConfigProvider locale={{ language: "zh" }}>
      <JsonField value="{}" />
      <KeyValueEditor />
      <TagInput />
      <Table
        columns={[{ key: "name", header: "Name" }]}
        data={[]}
        rowSelection={{}}
      />
      <TimePicker />
    </ConfigProvider>,
  );
  expect(
    screen.getByRole("button", { name: "格式化 JSON" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "添加条目" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "添加标签" })).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", { name: "选择所有行" }),
  ).toBeInTheDocument();
});
