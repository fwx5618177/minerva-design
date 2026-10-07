import { Divider, Space } from "@minerva/lib-core";

export default function SplitDemo() {
  return (
    <Space
      size="small"
      align="center"
      split={<Divider orientation="vertical" length={16} spacing={0} />}
    >
      <a href="#docs">Docs</a>
      <a href="#blog">Blog</a>
      <a href="#changelog">Changelog</a>
    </Space>
  );
}
