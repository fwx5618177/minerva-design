import { Button, Space } from "@minerva/lib-core";

const box = (height: number) => (
  <div
    style={{
      height,
      width: 48,
      borderRadius: 4,
      background: "var(--surface-muted-color)",
      border: "1px solid var(--border-color)",
    }}
  />
);

export default function AlignmentDemo() {
  return (
    <Space direction="vertical" block>
      <Space align="center">
        {box(24)}
        {box(48)}
        {box(72)}
        <span>align=&quot;center&quot;</span>
      </Space>
      <Space align="end">
        {box(24)}
        {box(48)}
        {box(72)}
        <span>align=&quot;end&quot;</span>
      </Space>
      <Space block justify="space-between">
        <Button variant="back">Back</Button>
        <Button>Next</Button>
      </Space>
    </Space>
  );
}
