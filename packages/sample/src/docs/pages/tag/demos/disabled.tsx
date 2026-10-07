import { Tag } from "@minerva/lib-core";

export default function DisabledDemo() {
  return (
    <>
      <Tag disabled>Disabled</Tag>
      <Tag disabled closable variant="primary">
        Disabled closable
      </Tag>
      <Tag disabled clickable variant="info">
        Disabled clickable
      </Tag>
    </>
  );
}
