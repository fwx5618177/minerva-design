import { useState } from "react";
import { Button, HStack } from "minerva-design";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} wrap>
      <Button onClick={() => setCount((value) => value + 1)}>Click me</Button>
      <output aria-live="polite">Clicked {count} times</output>
    </HStack>
  );
}
