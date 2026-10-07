// Keyboard audit: ThemeToggle / PaletteToggle are groups of native toggle
// buttons (aria-pressed): every option is a tab stop, Enter / Space activate.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../contexts/ThemeProvider";
import { PaletteToggle, ThemeToggle } from ".";

const root = document.documentElement;

afterEach(() => {
  root.removeAttribute("style");
  delete root.dataset.theme;
  delete root.dataset.palette;
});

describe("ThemeToggle keyboard", () => {
  it("visits each option with Tab and activates with Space and Enter", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" disableStorage>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const [light, dark, system] = screen.getAllByRole("button");
    await user.tab();
    expect(light).toHaveFocus();
    await user.tab();
    expect(dark).toHaveFocus();
    await user.keyboard(" ");
    expect(root.dataset.theme).toBe("dark");
    expect(dark).toHaveAttribute("aria-pressed", "true");
    expect(dark).toHaveFocus();
    await user.tab();
    expect(system).toHaveFocus();
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    await user.keyboard("{Enter}");
    expect(root.dataset.theme).toBe("light");
    expect(light).toHaveAttribute("aria-pressed", "true");
  });
});

describe("PaletteToggle keyboard", () => {
  it("visits each palette with Tab and activates with Enter and Space", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultPalette="graphite" disableStorage>
        <PaletteToggle
          palettes={["graphite", "cool"]}
          labels={{ graphite: "Graphite", cool: "Cool" }}
        />
      </ThemeProvider>,
    );
    const graphite = screen.getByRole("button", { name: "Graphite" });
    const cool = screen.getByRole("button", { name: "Cool" });
    await user.tab();
    expect(graphite).toHaveFocus();
    await user.tab();
    expect(cool).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(root.dataset.palette).toBe("cool");
    expect(cool).toHaveAttribute("aria-pressed", "true");
    await user.tab({ shift: true });
    await user.keyboard(" ");
    expect(root.dataset.palette).toBe("graphite");
    expect(graphite).toHaveAttribute("aria-pressed", "true");
  });
});
