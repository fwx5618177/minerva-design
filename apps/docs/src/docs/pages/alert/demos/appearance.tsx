import { GiftIcon } from "minerva-design/icons";
import { Alert } from "minerva-design";

export default function AppearanceDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="success" icon={<GiftIcon size="1em" />} elevation>
        Custom icon with an elevated shadow.
      </Alert>
      <Alert color="info" variant="outline" rounded={false}>
        Outline variant with square corners.
      </Alert>
      <Alert color="info" variant="solid" borderRadius={16}>
        Solid variant with a 16px radius.
      </Alert>
    </div>
  );
}
