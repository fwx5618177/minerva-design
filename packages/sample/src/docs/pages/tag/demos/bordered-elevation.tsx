import { Tag } from "@minerva/lib-core";

export default function BorderedElevationDemo() {
  return (
    <>
      <Tag bordered variant="primary">
        Bordered
      </Tag>
      <Tag elevation variant="success">
        Elevation
      </Tag>
      <Tag bordered elevation>
        Both
      </Tag>
    </>
  );
}
