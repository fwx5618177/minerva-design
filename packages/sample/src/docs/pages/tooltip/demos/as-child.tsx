import { Button, Tooltip } from "@minerva/lib-core";

export default function AsChildDemo() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Tooltip content="Attached to the button itself" asChild>
        <Button variant="secondary">No wrapper</Button>
      </Tooltip>
      <Tooltip
        content="Frosted, follows the theme"
        variant="auto"
        placement="bottom-start"
        contentClassName="my-tooltip"
        asChild
      >
        <Button variant="secondary">Auto variant</Button>
      </Tooltip>
    </div>
  );
}
