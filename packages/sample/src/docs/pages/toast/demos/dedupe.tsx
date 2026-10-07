import { Button, useToast } from "@minerva/lib-core";

export default function DedupeDemo() {
  const toast = useToast();
  return (
    <Button
      color="neutral"
      variant="outline"
      onClick={() =>
        // Same id: replaces the visible toast and restarts its timer
        toast.danger(`Sync failed at ${new Date().toLocaleTimeString()}`, {
          id: "sync-error",
        })
      }
    >
      Fail again
    </Button>
  );
}
