import { useMemo, useState } from "react";
import {
  Button,
  ConfigContext,
  PaletteToggle,
  Space,
  Switch,
  Tag,
  ThemeToggle,
  getSystemTheme,
  useConfig,
  type ConfigContextProps,
} from "@minerva/lib-core";
import type { Palette, ThemeMode } from "@minerva/lib-core/theme-utils";

// In an application, one provider at the root is all you need:
//
//   <ThemeProvider defaultPalette="editorial">
//     <ThemeToggle />
//     <PaletteToggle />
//   </ThemeProvider>
//
// A second provider here would re-theme this whole docs site (providers write
// data-theme / data-palette on <html>). So the toggles get a local context and
// the choice is applied to one preview element with data-theme / data-palette:
// palette token blocks match any element, not only <html>.
export default function TogglesDemo() {
  const site = useConfig();
  const [mode, setMode] = useState<ThemeMode>("system");
  const [palette, setPalette] = useState<Palette>("editorial");
  const resolved = mode === "system" ? getSystemTheme() : mode;

  const local = useMemo<ConfigContextProps>(
    () => ({
      ...site,
      mode,
      resolvedMode: resolved,
      palette,
      setTheme: (next) => {
        if (next === "light" || next === "dark" || next === "system") {
          setMode(next);
        } else if (next === "auto") {
          setMode("system");
        }
      },
      setPalette: (next) => {
        if (next) setPalette(next);
      },
    }),
    [site, mode, resolved, palette],
  );

  return (
    <ConfigContext.Provider value={local}>
      <div
        data-theme={resolved}
        data-palette={palette}
        style={{
          display: "grid",
          gap: 16,
          padding: 20,
          borderRadius: 12,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
          fontFamily: "var(--font-family-sans)",
          colorScheme: resolved,
        }}
      >
        <Space wrap align="center">
          <ThemeToggle />
          <PaletteToggle />
        </Space>
        <Space wrap align="center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Tag variant="primary">{palette}</Tag>
          <Tag variant="info">{resolved}</Tag>
          <Switch label="Switch" defaultChecked />
        </Space>
        <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
          data-theme=&quot;{resolved}&quot; data-palette=&quot;{palette}&quot;
        </p>
      </div>
    </ConfigContext.Provider>
  );
}
