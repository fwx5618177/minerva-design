import { render, screen } from "@testing-library/react-native";
import { colorMix, resolveTokens } from "@minerva/core";
import { describe, it, expect } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "./Button";
const modes = ["light", "dark"] as const;
const colors = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
] as const;
const variants = ["solid", "outline", "ghost", "link"] as const;
describe("Button color × variant parity", () => {
  for (const mode of modes)
    for (const color of colors)
      for (const variant of variants)
        it(`${mode}/${color}/${variant}`, async () => {
          const { colors: c } = resolveTokens({
            mode,
            design: { preset: "touch" },
          });
          const tone =
            color === "neutral"
              ? colorMix(c["text-color"], c["background-color"], 80)
              : color === "primary"
                ? c["primary-color"]
                : (c[`btn-bg-color-${color}`] ?? c[`${color}-color`]);
          const text =
            variant === "solid"
              ? c["text-inverse-color"]
              : color === "neutral"
                ? c["text-secondary-color"]
                : c[`${color}-color-text`];
          await render(
            <MinervaProvider theme={mode}>
              <Button color={color} variant={variant}>
                Action
              </Button>
            </MinervaProvider>,
          );
          expect(screen.getByRole("button")).toHaveStyle({
            backgroundColor: variant === "solid" ? tone : "transparent",
            borderColor:
              variant === "solid"
                ? tone
                : variant === "outline"
                  ? color === "neutral"
                    ? c["border-strong-color"]
                    : c[`${color}-color`]
                  : "transparent",
          });
          expect(screen.getByText("Action")).toHaveStyle({ color: text });
        });
});
