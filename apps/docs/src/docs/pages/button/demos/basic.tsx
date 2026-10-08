import { Button, ToastProvider, toast } from "minerva-design";

export default function BasicDemo() {
  return (
    // In an app, mount one ToastProvider near the root
    <ToastProvider>
      <Button onClick={() => toast.success("Clicked!")}>Click me</Button>
    </ToastProvider>
  );
}
