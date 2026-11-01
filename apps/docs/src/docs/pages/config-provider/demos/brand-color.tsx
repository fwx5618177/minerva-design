import { Button, ConfigProvider, Switch, useConfig } from "minerva-design";

// A brand color without overriding --primary-color by hand: each card is a
// nested <ConfigProvider primaryColor> in the site's current light / dark mode.
// A single color gets a lighter dark-mode value (contrast on dark surfaces);
// a { light, dark } pair sets both. Hover, active, subtle, border, text and
// focus ring colors are all derived from it.
const brands = [
  { label: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    label: 'primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}',
    primaryColor: { light: "#4f46e5", dark: "#818cf8" },
  },
  { label: 'primaryColor="#0d9488"', primaryColor: "#0d9488" },
];

function Swatch() {
  const { resolvedMode = "light", primaryColor } = useConfig();
  return (
    <code style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
      {resolvedMode}: {primaryColor?.[resolvedMode]}
    </code>
  );
}

export default function BrandColorDemo() {
  const { resolvedMode = "light" } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {brands.map(({ label, primaryColor }) => (
        <ConfigProvider
          key={label}
          theme={resolvedMode}
          primaryColor={primaryColor}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <code style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {label}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button size="small" color="primary">
                Primary
              </Button>
              <Button size="small" color="primary" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Brand switch" />
            </div>
            <Swatch />
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}
