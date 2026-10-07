import { useState } from "react";
import { Button } from "@minerva/lib-core";
import { IoAdd, IoArrowForward } from "react-icons/io5";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Button appearance="solid" startIcon={<IoAdd aria-hidden />}>
        Add item
      </Button>
      <Button appearance="outline" endIcon={<IoArrowForward aria-hidden />}>
        Continue
      </Button>
      <Button
        appearance="solid"
        variant="success"
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
