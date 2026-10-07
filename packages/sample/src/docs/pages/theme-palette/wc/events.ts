// labels overrides the option texts; minerva-change is cancelable.
type ThemeToggle = HTMLElement & {
  labels?: Partial<Record<"light" | "dark" | "system", string>>;
  resolvedTheme: "light" | "dark";
};
type PaletteToggle = HTMLElement & {
  labels?: Partial<Record<string, string>>;
};

export function setup(root: HTMLElement) {
  const theme = root.querySelector<ThemeToggle>("#theme")!;
  const palette = root.querySelector<PaletteToggle>("#palette")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  theme.labels = { light: "☀️ Day", dark: "🌙 Night" };
  palette.labels = { editorial: "Paper", graphite: "Ink" };

  const onTheme = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    if (lock.checked) {
      e.preventDefault();
      log.value = `Blocked: ${value} (still ${theme.resolvedTheme})`;
    } else log.value = `Theme: ${value}`;
  };
  const onPalette = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string | null }>).detail;
    log.value = `Palette: ${value ?? "default"}`;
  };
  theme.addEventListener("minerva-change", onTheme);
  palette.addEventListener("minerva-change", onPalette);
  return () => {
    theme.removeEventListener("minerva-change", onTheme);
    palette.removeEventListener("minerva-change", onPalette);
  };
}
