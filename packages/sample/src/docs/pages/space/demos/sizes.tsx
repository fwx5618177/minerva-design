import { Button, Space } from "@minerva/lib-core";

const sizes = ["small", "medium", "large", 40] as const;

export default function SizesDemo() {
  return (
    <Space direction="vertical" size="small">
      {sizes.map((size) => (
        <Space key={size} size={size} align="center">
          <code style={{ width: 64 }}>{size}</code>
          <Button size="small">One</Button>
          <Button size="small">Two</Button>
          <Button size="small">Three</Button>
        </Space>
      ))}
    </Space>
  );
}
