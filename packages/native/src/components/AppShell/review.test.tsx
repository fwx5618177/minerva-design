import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Dimensions, Text } from "react-native";
import { expect, it } from "vitest";
import { AppShell } from "./index";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryAllByRoleDeep } from "../../../test/queries";
it("localizes navigation and clears an open drawer across viewport transitions", async () => {
  const original = Dimensions.get("window");
  const size = (width: number) =>
    Dimensions.set({
      window: { ...original, width },
      screen: { ...original, width },
    });
  try {
    size(390);
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <AppShell brand="App" navigation={() => <Text>Links</Text>} />
      </MinervaProvider>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "打开导航" }));
    expect(queryAllByRoleDeep("dialog")).toHaveLength(1);
    await act(() => size(1024));
    await act(() => size(390));
    expect(queryAllByRoleDeep("dialog")).toHaveLength(0);
  } finally {
    size(original.width);
  }
});
