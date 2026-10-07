import { Tag } from "@minerva/lib-core";

export default function DisabledDemo() {
  return (
    <>
      <Tag disabled>Disabled</Tag>
      <Tag disabled closable color="primary">
        Disabled closable
      </Tag>
      <Tag disabled clickable color="info">
        Disabled clickable
      </Tag>
    </>
  );
}
