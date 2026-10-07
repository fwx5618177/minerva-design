import { Button, useToast } from "@minerva/lib-core";

export default function DedupeDemo() {
  const toast = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() =>
        // Same id: replaces the visible toast and restarts its timer
        toast.error(`Sync failed at ${new Date().toLocaleTimeString()}`, {
          id: "sync-error",
        })
      }
    >
      Fail again
    </Button>
  );
}
