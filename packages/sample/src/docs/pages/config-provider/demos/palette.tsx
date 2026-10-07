import { Button, Tag, useConfig } from "@minerva/lib-core";
import { PALETTES } from "@minerva/lib-core/theme-utils";

// <ConfigProvider palette="tech"> sets data-palette="tech" on <html>. The
// palette blocks of style.css are attribute selectors, so this demo previews
// every palette side by side on local elements, in the site's current mode.
export default function PaletteDemo() {
  const { resolvedMode = "light", palette } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.map((name) => (
        <div
          key={name}
          data-palette={name}
          data-theme={resolvedMode}
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
          <strong>
            palette=&quot;{name}&quot;{" "}
            {palette === name && <Tag variant="success">active</Tag>}
          </strong>
          <Button size="small" variant="primary">
            Primary
          </Button>
          <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
            data-theme=&quot;{resolvedMode}&quot;
          </span>
        </div>
      ))}
    </div>
  );
}
