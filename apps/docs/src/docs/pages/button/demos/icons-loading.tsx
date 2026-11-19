import { PlusIcon, ArrowRightIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button } from "minerva-design";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Button startIcon={<PlusIcon size="1em" aria-hidden />}>Add item</Button>
      <Button
        variant="outline"
        endIcon={<ArrowRightIcon size="1em" aria-hidden />}
      >
        Continue
      </Button>
      <Button
        color="success"
        fullWidth
        loading={saving}
        loadingText="Saving..."
        onClick={save}
      >
        Save
      </Button>
    </div>
  );
}
