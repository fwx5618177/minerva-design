import { useRef } from "react";
import { Button, message } from "@minerva/lib-core";

export default function DestroyDemo() {
  const lastId = useRef<string | null>(null);

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        onClick={() => {
          lastId.current = message.info({
            content: `Message opened at ${new Date().toLocaleTimeString()}`,
            duration: 0,
          });
        }}
      >
        Open sticky message
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          if (lastId.current) message.destroy(lastId.current);
        }}
      >
        Close the last one
      </Button>
      <Button variant="error" onClick={() => message.destroy()}>
        Close all
      </Button>
    </div>
  );
}
