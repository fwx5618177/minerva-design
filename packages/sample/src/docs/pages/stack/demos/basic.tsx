import { Button, VStack } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    <VStack gap={3} style={{ maxWidth: 240 }}>
      <Button>First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="secondary">Third</Button>
    </VStack>
  );
}
