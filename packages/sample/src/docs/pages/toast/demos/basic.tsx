import { Button, ToastProvider, toast } from "@minerva/lib-core";

export default function BasicDemo() {
  return (
    // Mount one ToastProvider near the root of the app
    <ToastProvider position="topRight">
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button variant="success" onClick={() => toast.success("Saved")}>
          Success
        </Button>
        <Button variant="error" onClick={() => toast.error("Request failed")}>
          Error
        </Button>
        <Button
          variant="warning"
          onClick={() => toast.warning("Unsaved changes")}
        >
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.info("New version")}>
          Info
        </Button>
      </div>
    </ToastProvider>
  );
}
