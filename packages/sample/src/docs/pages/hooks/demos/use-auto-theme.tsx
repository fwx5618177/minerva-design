import { useEffect } from "react";
import {
  Button,
  Tag,
  applyThemeStyles,
  useAutoTheme,
  useConfig,
  type Theme,
} from "@minerva/lib-core";

const OPTIONS: Theme[] = ["auto", "light", "dark", "github-dark"];

// useAutoTheme writes the theme as CSS variables on <html>, so it re-themes
// the whole page. This demo starts from the theme of the surrounding
// ConfigProvider (mounting changes nothing) and restores it when unmounted.
export default function UseAutoThemeDemo() {
  const { theme: appTheme = "auto" } = useConfig();
  const [theme, setTheme, systemTheme] = useAutoTheme(appTheme);

  useEffect(() => () => applyThemeStyles(appTheme), [appTheme]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Theme"
        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
      >
        {OPTIONS.map((option) => (
          <Button
            key={String(option)}
            size="small"
            variant={option === theme ? "primary" : "secondary"}
            aria-pressed={option === theme}
            onClick={() => setTheme(option)}
          >
            {String(option)}
          </Button>
        ))}
        <Button size="small" variant="back" onClick={() => setTheme(appTheme)}>
          Reset
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        theme:{" "}
        <Tag variant="primary">
          {typeof theme === "string" ? theme : "custom"}
        </Tag>{" "}
        systemTheme: <Tag variant="info">{systemTheme}</Tag>
      </div>
    </div>
  );
}
