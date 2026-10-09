import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet, Text, View } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart } from "../../../test/queries";
import { Grid, GridItem } from "./Grid";

const light = resolveTokens({ design: { preset: "touch" } });
const items = (part: "item" | "content") =>
  hostElements().filter((el) => el.props.dataSet?.part === part);

describe("Grid", () => {
  it("renders 4 columns of icon + text cells by default", async () => {
    await render(
      <Grid>
        <GridItem icon={<View testID="icon" />} text="Photos" />
        <GridItem text="Files" />
      </Grid>,
    );
    expect(screen.getByText("Photos")).toBeTruthy();
    expect(screen.getByTestId("icon")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
    expect(items("item")[0]).toHaveStyle({ width: "25%" });
    expect(items("content")[0]).toHaveStyle({
      flexDirection: "column",
      alignItems: "center",
      borderRightWidth: StyleSheet.hairlineWidth,
      backgroundColor: light.colors["surface-color"],
    });
  });

  it("cells with onPress are buttons; disabled ones ignore presses", async () => {
    const onPress = vi.fn();
    const onOff = vi.fn();
    await render(
      <Grid>
        <GridItem text="Scan" onPress={onPress} />
        <GridItem text="Off" onPress={onOff} disabled />
      </Grid>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Scan" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    const off = screen.getByRole("button", { name: "Off" });
    expect(off).toBeDisabled();
    await fireEvent.press(off);
    expect(onOff).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Scan" })).toHaveStyle({
      minHeight: 44,
    });
  });

  it("columnNum, square, gutter, horizontal, no border, not centered", async () => {
    await render(
      <Grid
        columnNum={2}
        square
        gutter={8}
        direction="horizontal"
        center={false}
      >
        <GridItem text="A" />
      </Grid>,
    );
    expect(items("item")[0]).toHaveStyle({
      width: "50%",
      aspectRatio: 1,
      paddingTop: 8,
      paddingRight: 8,
    });
    expect(items("content")[0]).toHaveStyle({
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: light.radius.lg,
    });
    expect(queryPart("root", "grid")).toHaveStyle({ paddingLeft: 8 });
  });

  it("custom children; borderless; dark tokens", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Grid border={false}>
          <GridItem>
            <Text>Custom</Text>
          </GridItem>
        </Grid>
      </MinervaProvider>,
    );
    expect(screen.getByText("Custom")).toBeTruthy();
    expect(items("content")[0]).toHaveStyle({
      borderRightWidth: 0,
      backgroundColor: dark.colors["surface-color"],
    });
  });
});

it("slots GridItem layout and composes enabled press handlers", async () => {
  const { Button } = await import("../Button");
  const childPress = vi.fn(),
    itemPress = vi.fn();
  const { rerender } = await render(
    <Grid columnNum={2}>
      <GridItem asChild fullWidth testID="slotted" onPress={itemPress}>
        <Button onPress={childPress}>Open</Button>
      </GridItem>
    </Grid>,
  );
  expect(screen.getByTestId("slotted")).toHaveStyle({ width: "100%" });
  await fireEvent.press(screen.getByRole("button", { name: "Open" }));
  expect(childPress).toHaveBeenCalledTimes(1);
  expect(itemPress).toHaveBeenCalledTimes(1);
  await rerender(
    <Grid>
      <GridItem asChild disabled onPress={itemPress}>
        <Button onPress={childPress}>Open</Button>
      </GridItem>
    </Grid>,
  );
  await fireEvent.press(screen.getByRole("button", { name: "Open" }));
  expect(childPress).toHaveBeenCalledTimes(1);
  expect(itemPress).toHaveBeenCalledTimes(1);
});
