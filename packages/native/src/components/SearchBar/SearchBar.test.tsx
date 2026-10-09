import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { SearchBar } from "./SearchBar";

const t = resolveTokens({ design: { preset: "touch" } });

describe("SearchBar", () => {
  it("renders a search field with the built-in label and placeholder", async () => {
    await render(<SearchBar />);
    const field = screen.getByRole("search", { name: "Search" });
    expect(field.props.placeholder).toBe("Search");
    expect(field.props.returnKeyType).toBe("search");
    expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
  });

  it("typing reports onChange; submit calls onSearch with the text", async () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();
    const user = userEvent.setup();
    await render(<SearchBar onChange={onChange} onSearch={onSearch} />);
    await user.type(screen.getByRole("search"), "shoes", {
      submitEditing: true,
    });
    expect(onChange).toHaveBeenLastCalledWith("shoes");
    expect(onSearch).toHaveBeenCalledWith("shoes");
  });

  it("controlled value", async () => {
    const onChange = vi.fn();
    await render(<SearchBar value="a" onChange={onChange} />);
    await fireEvent.changeText(screen.getByRole("search"), "ab");
    expect(onChange).toHaveBeenCalledWith("ab");
    expect(screen.getByRole("search")).toHaveDisplayValue("a");
  });

  it("clear button (clearable by default)", async () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    await render(
      <SearchBar defaultValue="tea" onChange={onChange} onClear={onClear} />,
    );
    const clear = screen.getByRole("button", { name: "Clear search" });
    expect(clear.props.hitSlop.top).toBe(14);
    await fireEvent.press(clear);
    expect(onChange).toHaveBeenCalledWith("");
    expect(onClear).toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });

  it("clearable={false} hides the clear button", async () => {
    await render(<SearchBar defaultValue="x" clearable={false} />);
    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });

  it("cancel button clears and calls onCancel", async () => {
    const onCancel = vi.fn();
    await render(<SearchBar showCancel defaultValue="x" onCancel={onCancel} />);
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
    expect(screen.getByRole("search")).toHaveDisplayValue("");
  });

  it("translates its texts", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <SearchBar showCancel defaultValue="x" />
      </MinervaProvider>,
    );
    expect(screen.getByRole("search", { name: "搜索" }).props.placeholder).toBe(
      "搜索",
    );
    expect(screen.getByRole("button", { name: "取消" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "清除搜索" })).toBeTruthy();
  });

  it("disabled is not editable and has no clear button", async () => {
    await render(<SearchBar disabled defaultValue="x" />);
    expect(screen.getByRole("search")).toBeDisabled();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each([
    ["round", (h: number) => h / 2],
    ["square", () => t.radius.md],
  ] as const)("shape %s", async (shape, radius) => {
    await render(<SearchBar shape={shape} />);
    const height = t.sizes["control-height-md"] - t.space["2"];
    expect(queryPart("field", "search-bar")).toHaveStyle({
      borderRadius: radius(height),
      height,
      backgroundColor: t.colors["surface-muted-color"],
    });
  });

  it("focus border uses the primary token (dark mode)", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <SearchBar />
      </MinervaProvider>,
    );
    await fireEvent(screen.getByRole("search"), "focus");
    expect(queryPart("field", "search-bar")).toHaveStyle({
      borderColor: dark.colors["primary-color"],
      backgroundColor: dark.colors["surface-muted-color"],
    });
  });
});
