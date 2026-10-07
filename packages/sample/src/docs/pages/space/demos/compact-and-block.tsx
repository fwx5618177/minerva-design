import { Button, Space } from "@minerva/lib-core";

export default function CompactAndBlockDemo() {
  return (
    <Space direction="vertical" block>
      <Space compact>
        <Button size="small">Compact</Button>
        <Button size="small">gap</Button>
        <Button size="small">halved</Button>
      </Space>
      <Space
        block
        justify="center"
        style={{ background: "var(--surface-muted-color)", padding: 8 }}
      >
        <Button size="small">Block</Button>
        <Button size="small">full width</Button>
      </Space>
    </Space>
  );
}
