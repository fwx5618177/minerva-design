import { Button, HStack } from "@minerva/lib-core";

export default function HorizontalDemo() {
  return (
    <HStack gap={2} justify="between" style={{ width: "100%" }}>
      <span>Unsaved changes</span>
      <HStack gap={2}>
        <Button variant="secondary">Discard</Button>
        <Button>Save</Button>
      </HStack>
    </HStack>
  );
}
