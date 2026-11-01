import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { afterEach, describe, expect, it, vi } from "vitest";
import { palettes } from "@minerva/core";
import { MinervaProvider, useTheme } from "./MinervaProvider";

const Show = ({ id = "theme" }: { id?: string }) => {
  const { mode, colors, tokens } = useTheme();
  return (
    <Text testID={id}>
      {[
        mode,
        colors["primary-color"],
        tokens.css["primary-color-hover"],
        tokens.css["primary-color-subtle"],
      ].join("|")}
    </Text>
  );
};

const values = (id = "theme") => {
  const [mode, primary, hover, subtle] = String(
    screen.getByTestId(id).props.children,
  ).split("|");
  return { mode, primary, hover, subtle };
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("MinervaProvider primaryColor", () => {
  it("applies a brand color in an explicit light mode", async () => {
    await render(
      <MinervaProvider theme="light" primaryColor="#4f46e5">
        <Show />
      </MinervaProvider>,
    );
    const { mode, primary, hover, subtle } = values();
    expect(mode).toBe("light");
    expect(primary).toBe("#4f46e5");
    // derived tokens are recomputed from the brand color (concrete values)
    expect(hover).not.toContain("var(");
    expect(hover).not.toBe(primary);
    expect(subtle).not.toContain("var(");
  });

  it("derives the dark-mode value, or uses the pair's", async () => {
    await render(
      <>
        <MinervaProvider theme="dark" primaryColor="#4f46e5">
          <Show id="derived" />
        </MinervaProvider>
        <MinervaProvider
          theme="dark"
          primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}
        >
          <Show id="pair" />
        </MinervaProvider>
      </>,
    );
    expect(values("derived")).toMatchObject({
      mode: "dark",
      primary: "#7b85f2",
    });
    expect(values("pair")).toMatchObject({ mode: "dark", primary: "#818cf8" });
  });

  it("wins over the palette, overrides win over it", async () => {
    await render(
      <>
        <MinervaProvider theme="light" palette="tech" primaryColor="#4f46e5">
          <Show id="palette" />
        </MinervaProvider>
        <MinervaProvider
          theme="light"
          primaryColor="#4f46e5"
          overrides={{ "primary-color": "#e11d48" }}
        >
          <Show id="overrides" />
        </MinervaProvider>
      </>,
    );
    expect(values("palette").primary).toBe("#4f46e5");
    expect(palettes.tech.light["primary-color"]).not.toBe("#4f46e5");
    expect(values("overrides").primary).toBe("#e11d48");
  });

  it("is inherited by nested providers and reset by null", async () => {
    await render(
      <MinervaProvider theme="light" primaryColor="#4f46e5">
        <MinervaProvider theme="dark">
          <Show id="inherited" />
        </MinervaProvider>
        <MinervaProvider primaryColor="#0d9488">
          <Show id="own" />
        </MinervaProvider>
        <MinervaProvider primaryColor={null}>
          <Show id="reset" />
        </MinervaProvider>
      </MinervaProvider>,
    );
    expect(values("inherited")).toMatchObject({
      mode: "dark",
      primary: "#7b85f2",
    });
    expect(values("own").primary).toBe("#0d9488");
    expect(values("reset").primary).not.toBe("#4f46e5");
  });

  it("ignores an invalid color with a development warning", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    await render(
      <MinervaProvider theme="light" primaryColor="#4f46e5">
        <MinervaProvider primaryColor="nope">
          <Show />
        </MinervaProvider>
      </MinervaProvider>,
    );
    expect(values().primary).toBe("#4f46e5");
    expect(
      error.mock.calls.some(([message]) =>
        String(message).includes("primaryColor"),
      ),
    ).toBe(true);
  });
});
