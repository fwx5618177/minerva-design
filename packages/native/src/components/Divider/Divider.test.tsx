import { render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { describe, expect, it } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, hostElements } from "../../../test/queries";
import { Divider } from "./Divider";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
const lines = () =>
  hostElements().filter((el) => el.props.dataSet?.part === "line");

describe("Divider", () => {
  it("renders a horizontal hairline separator with the border token", async () => {
    await render(<Divider />);
    const root = getByRoleDeep("separator");
    expect(root.props.dataSet).toMatchObject({
      orientation: "horizontal",
      variant: "solid",
    });
    expect(root).toHaveStyle({ marginVertical: 16 });
    expect(lines()[0]).toHaveStyle({
      height: StyleSheet.hairlineWidth,
      backgroundColor: light.colors["border-color"],
    });
  });

  it("vertical with spacing and thickness", async () => {
    await render(<Divider orientation="vertical" spacing={8} thickness={2} />);
    expect(getByRoleDeep("separator")).toHaveStyle({ marginHorizontal: 8 });
    expect(lines()[0]).toHaveStyle({ width: 2 });
  });

  it.each(["dashed", "dotted"] as const)(
    "%s variant draws a styled border",
    async (variant) => {
      await render(<Divider variant={variant} />);
      const dashed = lines()[0].children[0];
      expect(typeof dashed === "object" && dashed).toHaveStyle({
        borderStyle: variant,
      });
    },
  );

  it.each([
    ["left", 0.1, 0.9],
    ["center", 1, 1],
    ["right", 0.9, 0.1],
  ] as const)("text aligned %s", async (textAlign, start, end) => {
    await render(<Divider textAlign={textAlign}>OR</Divider>);
    expect(screen.getByText("OR")).toHaveStyle({
      color: light.colors["text-secondary-color"],
    });
    const [a, b] = lines();
    expect(a).toHaveStyle({ flex: start });
    expect(b).toHaveStyle({ flex: end });
  });

  it("follows dark mode", async () => {
    await render(
      <MinervaProvider theme="dark">
        <Divider />
      </MinervaProvider>,
    );
    expect(lines()[0]).toHaveStyle({
      backgroundColor: dark.colors["border-color"],
    });
  });
});
