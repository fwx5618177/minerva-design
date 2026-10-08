import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { messages, resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { Pagination } from "./Pagination";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const pageButtons = () =>
  screen
    .getAllByRole("button")
    .map((b) => b.props.accessibilityLabel as string)
    .filter((name) => /^Page \d+$/.test(name));

describe("Pagination", () => {
  it.each(["en", "zh", "ja", "fr"] as const)(
    "labels the navigation and edge buttons (%s)",
    async (language) => {
      const texts = messages[language].pagination as Record<string, string>;
      await render(
        <MinervaProvider locale={{ language }}>
          <Pagination total={50} current={2} />
        </MinervaProvider>,
      );
      expect(getByRoleDeep("navigation", { name: texts.nav })).toBeTruthy();
      expect(screen.getByRole("button", { name: texts.prev })).toBeEnabled();
      expect(screen.getByRole("button", { name: texts.next })).toBeEnabled();
    },
  );

  it("renders the page items with the current page selected", async () => {
    await render(<Pagination total={50} defaultCurrent={3} />);
    expect(pageButtons()).toEqual([
      "Page 1",
      "Page 2",
      "Page 3",
      "Page 4",
      "Page 5",
    ]);
    expect(screen.getByRole("button", { name: "Page 3" })).toBeSelected();
    expect(screen.getByRole("button", { name: "Page 2" })).not.toBeSelected();
  });

  it("uncontrolled: page, prev and next emit onChange(page, pageSize)", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(<Pagination total={50} onChange={onChange} />);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await user.press(screen.getByRole("button", { name: "Page 4" }));
    expect(onChange).toHaveBeenLastCalledWith(4, 10);
    expect(screen.getByRole("button", { name: "Page 4" })).toBeSelected();
    await user.press(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenLastCalledWith(5, 10);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    await user.press(screen.getByRole("button", { name: "Previous page" }));
    expect(onChange).toHaveBeenLastCalledWith(4, 10);
  });

  it("controlled: requests only", async () => {
    const onChange = vi.fn();
    await render(<Pagination total={50} current={2} onChange={onChange} />);
    await fireEvent.press(screen.getByRole("button", { name: "Page 5" }));
    expect(onChange).toHaveBeenCalledWith(5, 10);
    expect(screen.getByRole("button", { name: "Page 2" })).toBeSelected();
  });

  it("jump items and pageSize", async () => {
    const onChange = vi.fn();
    await render(
      <Pagination
        total={400}
        pageSize={20}
        defaultCurrent={10}
        onChange={onChange}
      />,
    );
    expect(pageButtons()).toEqual([
      "Page 1",
      "Page 8",
      "Page 9",
      "Page 10",
      "Page 11",
      "Page 12",
      "Page 20",
    ]);
    await fireEvent.press(
      screen.getByRole("button", { name: "Previous 5 pages" }),
    );
    expect(onChange).toHaveBeenCalledWith(5, 20);
    await fireEvent.press(screen.getByRole("button", { name: "Next 5 pages" }));
    expect(onChange).toHaveBeenLastCalledWith(10, 20);
  });

  it("compact list with siblingCount, hideEdges", async () => {
    await render(
      <Pagination total={200} defaultCurrent={10} siblingCount={1} hideEdges />,
    );
    expect(pageButtons()).toEqual([
      "Page 1",
      "Page 9",
      "Page 10",
      "Page 11",
      "Page 20",
    ]);
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
  });

  it("simple mode: prev | 2 / 5 | next with a localized label", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Pagination total={50} defaultCurrent={2} simple />
      </MinervaProvider>,
    );
    expect(screen.getByLabelText("第 2 页，共 5 页")).toBeTruthy();
    expect(screen.getAllByRole("button")).toHaveLength(2);
    await fireEvent.press(screen.getByRole("button", { name: "下一页" }));
    expect(screen.getByLabelText("第 3 页，共 5 页")).toBeTruthy();
  });

  it("hideNumbers shows the counter", async () => {
    await render(<Pagination total={30} hideNumbers />);
    expect(screen.getByLabelText("Page 1 of 3")).toBeTruthy();
    expect(pageButtons()).toEqual([]);
  });

  it("disabled ignores presses", async () => {
    const onChange = vi.fn();
    await render(<Pagination total={50} disabled onChange={onChange} />);
    const page2 = screen.getByRole("button", { name: "Page 2" });
    expect(page2).toBeDisabled();
    await fireEvent.press(page2);
    await fireEvent.press(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("variants, sizes, shapes use tokens and reach 44pt", async () => {
    const { rerender } = await render(
      <MinervaProvider theme="light">
        <Pagination total={50} />
      </MinervaProvider>,
    );
    const current = () => screen.getByRole("button", { name: "Page 1" });
    expect(current()).toHaveStyle({
      backgroundColor: light.colors["primary-color"],
      height: 36,
      borderRadius: light.radius.md,
    });
    expect(current().props.hitSlop).toEqual({
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    });
    await rerender(
      <MinervaProvider theme="light">
        <Pagination total={50} variant="outline" size="small" shape="circle" />
      </MinervaProvider>,
    );
    expect(current()).toHaveStyle({
      backgroundColor: "transparent",
      borderColor: light.colors["primary-color"],
      height: 28,
      borderRadius: 14,
    });
    await rerender(
      <MinervaProvider theme="light">
        <Pagination total={50} variant="ghost" size="large" shape="square" />
      </MinervaProvider>,
    );
    expect(current()).toHaveStyle({
      backgroundColor: light.colors["primary-color-subtle"],
      height: 44,
      borderRadius: 0,
    });
  });

  it("showTotal", async () => {
    const { rerender } = await render(<Pagination total={42} showTotal />);
    expect(screen.getByText("Total 42 items")).toBeTruthy();
    await rerender(
      <Pagination
        total={42}
        current={5}
        showTotal={(total, [a, b]) => <Text>{`${a}-${b} of ${total}`}</Text>}
      />,
    );
    expect(queryPart("total", "pagination")).toBeTruthy();
    expect(screen.getByText("41-42 of 42")).toBeTruthy();
  });
});
