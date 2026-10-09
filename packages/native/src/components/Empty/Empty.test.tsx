import { render, screen, userEvent } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { Button } from "../Button";
import { Empty } from "./Empty";

describe("Empty", () => {
  it("shows the illustration and the default description", async () => {
    await render(<Empty />);
    expect(screen.getByText("No Data")).toBeTruthy();
    expect(queryPart("image", "empty")).toBeTruthy();
    expect(queryPart("root", "empty")?.props.dataSet.size).toBe("medium");
  });

  it("is a region named by its title, with a header", async () => {
    await render(<Empty title="No messages" description="Inbox zero" />);
    expect(getByRoleDeep("region", { name: "No messages" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "No messages" })).toBeTruthy();
    expect(screen.getByText("Inbox zero")).toBeTruthy();
  });

  it("hides the description / image with null; custom image", async () => {
    const { rerender } = await render(
      <Empty description={null} image={null} />,
    );
    expect(screen.queryByText("No Data")).toBeNull();
    expect(queryPart("image", "empty")).toBeNull();
    await rerender(<Empty image={<Text>Art</Text>} />);
    expect(screen.getByText("Art")).toBeTruthy();
  });

  it("renders actions", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(
      <Empty
        action={<Button onPress={onPress}>Create</Button>}
        secondaryAction={<Button variant="outline">Import</Button>}
      />,
    );
    await user.press(screen.getByRole("button", { name: "Create" }));
    expect(onPress).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Import" })).toBeTruthy();
  });

  it.each(["small", "medium", "large"] as const)(
    "renders the %s size",
    async (size) => {
      await render(<Empty size={size} />);
      expect(queryPart("image", "empty")).toHaveStyle({
        width: { small: 64, medium: 96, large: 128 }[size],
      });
    },
  );

  it("localized description and token colors in dark mode", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <Empty showShadow />
      </MinervaProvider>,
    );
    expect(screen.getByText("暂无数据")).toHaveStyle({
      color: dark.colors["text-muted-color"],
    });
    expect(queryPart("root", "empty")).toHaveStyle({
      backgroundColor: dark.colors["surface-elevated-color"],
    });
  });
});
