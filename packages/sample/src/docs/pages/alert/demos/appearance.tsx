import { Alert } from "@minerva/lib-core";
import { FiGift } from "react-icons/fi";

export default function AppearanceDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert variant="success" icon={<FiGift />} elevation>
        Custom icon with an elevated shadow.
      </Alert>
      <Alert variant="info" outlined rounded={false}>
        Outlined border and square corners.
      </Alert>
      <Alert variant="info" filled borderRadius={16}>
        Filled background with a 16px radius.
      </Alert>
    </div>
  );
}
