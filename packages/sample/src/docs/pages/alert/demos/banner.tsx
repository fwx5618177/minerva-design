import { Alert } from "@minerva/lib-core";

export default function BannerDemo() {
  return (
    <Alert variant="warning" banner closable>
      You are viewing a read-only copy of this document.
    </Alert>
  );
}
