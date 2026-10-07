import type React from "react";
import {
  Button,
  Space,
  Switch,
  themes,
  type ComponentTheme,
} from "@minerva/lib-core";

// A custom theme: start from a built-in one and override tokens.
const sepia: ComponentTheme = {
  ...themes.light,
  "primary-color": "#9a3412",
  "primary-color-hover": "#7c2d12",
  "primary-color-active": "#6c2710",
  "background-color": "#fbf5e9",
  "foreground-color": "#3b2f2a",
  "border-color": "#e0d2b8",
  "text-gray": "#6b5b4e",
  "focus-ring-color": "rgba(154, 52, 18, 0.45)",
};

// <ConfigProvider theme={sepia}> writes these tokens on <html> and re-themes
// the whole page. To preview a theme in one container only, write the same
// tokens as CSS custom properties on a wrapper element.
const toCssVariables = (theme: ComponentTheme) =>
  Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [`--${key}`, value]),
  ) as React.CSSProperties;

export default function CustomThemeDemo() {
  return (
    <div
      style={{
        ...toCssVariables(sepia),
        padding: 16,
        borderRadius: 8,
        border: "1px solid var(--border-color)",
        background: "var(--surface-color)",
        color: "var(--text-color)",
      }}
    >
      <Space direction="vertical" size="medium">
        <strong>Sepia theme</strong>
        <span>Only this container uses the custom theme.</span>
        <Space wrap align="center">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Switch label="Reading mode" defaultChecked />
        </Space>
      </Space>
    </div>
  );
}
