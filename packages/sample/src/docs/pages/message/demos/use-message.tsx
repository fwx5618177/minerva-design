import { useState } from "react";
import { Button, useMessage } from "@minerva/lib-core";

export default function UseMessageDemo() {
  const msg = useMessage();
  const [status, setStatus] = useState("idle");

  const run = async () => {
    setStatus("running");
    await msg.loading({ content: "Step 1: preparing…", duration: 1000 });
    await msg.info({ content: "Step 2: publishing…", duration: 1000 });
    msg.success("Published!");
    setStatus("done");
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Button onClick={run} disabled={status === "running"}>
        Run sequence
      </Button>
      <span>Status: {status}</span>
    </div>
  );
}
