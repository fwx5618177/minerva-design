import { Tag } from "@minerva/lib-core";

export default function CustomColorsDemo() {
  return (
    <>
      <Tag bgColor="#ede9fe" textColor="#5b21b6" borderColor="#7c3aed" bordered>
        Violet
      </Tag>
      <Tag bgColor="#0f172a" textColor="#f8fafc">
        Dark
      </Tag>
      <Tag style={{ fontStyle: "italic" }} ripple={false} clickable>
        No ripple
      </Tag>
    </>
  );
}
