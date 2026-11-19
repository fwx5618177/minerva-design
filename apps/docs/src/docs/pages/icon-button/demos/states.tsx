import { CloudUploadIcon, MicIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton } from "minerva-design";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);

  const upload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <IconButton
        icon={<CloudUploadIcon size="1em" />}
        color="primary"
        loading={loading}
        onClick={upload}
        aria-label="Upload"
      />
      <IconButton
        icon={<MicIcon size="1em" />}
        pressed={muted}
        onPressedChange={setMuted}
        aria-label="Mute microphone"
      />
      <IconButton
        icon={<TrashIcon size="1em" />}
        disabled
        aria-label="Delete"
      />
    </>
  );
}
