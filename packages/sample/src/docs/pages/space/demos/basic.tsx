import { Button, Space } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <Space>
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="error">Delete</Button>
    </Space>
  );
}
