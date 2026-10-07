import { Tag } from "@minerva/lib-core";

export default function SizesShapesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag size="small" variant="primary">
          Small
        </Tag>
        <Tag size="medium" variant="primary">
          Medium
        </Tag>
        <Tag size="large" variant="primary">
          Large
        </Tag>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag shape="square" variant="info">
          Square
        </Tag>
        <Tag shape="rounded" variant="info">
          Rounded
        </Tag>
        <Tag shape="circle" variant="info">
          Circle
        </Tag>
      </div>
    </div>
  );
}
