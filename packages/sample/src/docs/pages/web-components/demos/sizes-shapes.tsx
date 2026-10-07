import "@minerva/lib-web-components";

const SIZES = ["tiny", "small", "medium", "large"] as const;
const SHAPES = ["square", "rounded", "pill"] as const;

export default function SizesShapesDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        {SIZES.map((size) => (
          <minerva-button key={size} size={size}>
            {size}
          </minerva-button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        {SHAPES.map((shape) => (
          <minerva-button key={shape} shape={shape} variant="info">
            {shape}
          </minerva-button>
        ))}
        {/* icon-only buttons need an accessible name */}
        <minerva-button shape="circle" variant="success" aria-label="Add item">
          +
        </minerva-button>
      </div>
    </div>
  );
}
