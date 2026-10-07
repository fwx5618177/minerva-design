import { Badge } from "@minerva/lib-core";

export default function AppearanceDemo() {
  return (
    <>
      <Badge appearance="subtle">NEW</Badge>
      <Badge appearance="subtle" variant="success">
        Published
      </Badge>
      <Badge appearance="outline" variant="warning">
        Draft
      </Badge>
      <Badge appearance="solid" variant="neutral">
        Archived
      </Badge>
      <Badge dot variant="danger" ariaLabel="Offline" />
    </>
  );
}
