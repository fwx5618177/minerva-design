import {
  Button,
  PaletteToggle,
  Space,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "@minerva/lib-core";

// In an application, one provider at the root is all you need:
//
//   <ThemeProvider defaultPalette="editorial">
//     <ThemeToggle />
//     <PaletteToggle />
//   </ThemeProvider>
//
// Here a nested ThemeProvider is used: it scopes its mode and palette to its
// own subtree (no <html> attributes, no cookies), so the toggles re-theme
// this preview without touching the rest of the docs site.
function Preview() {
  const { resolvedTheme, palette } = useTheme();
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--border-color)",
        background: "var(--background-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <Space wrap align="center">
        <ThemeToggle />
        <PaletteToggle />
      </Space>
      <Space wrap align="center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Tag variant="primary">{palette ?? "default"}</Tag>
        <Tag variant="info">{resolvedTheme}</Tag>
        <Switch label="Switch" defaultChecked />
      </Space>
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        data-theme=&quot;{resolvedTheme}&quot; data-palette=&quot;
        {palette ?? ""}&quot;
      </p>
    </div>
  );
}

export default function TogglesDemo() {
  return (
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <Preview />
    </ThemeProvider>
  );
}
