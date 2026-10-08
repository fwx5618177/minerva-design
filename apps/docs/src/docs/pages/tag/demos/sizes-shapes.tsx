import { Tag } from "minerva-design";

export default function SizesShapesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag size="small" color="primary">
          Small
        </Tag>
        <Tag size="medium" color="primary">
          Medium
        </Tag>
        <Tag size="large" color="primary">
          Large
        </Tag>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag shape="square" color="info">
          Square
        </Tag>
        <Tag shape="rounded" color="info">
          Rounded
        </Tag>
        <Tag shape="circle" color="info">
          Circle
        </Tag>
      </div>
    </div>
  );
}
