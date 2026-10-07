import { useState } from "react";
import { IconButton } from "@minerva/lib-core";
import { IoCloudUploadOutline, IoMic, IoTrashOutline } from "react-icons/io5";

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
        icon={<IoCloudUploadOutline />}
        variant="primary"
        loading={loading}
        onClick={upload}
        ariaLabel="Upload"
      />
      <IconButton
        icon={<IoMic />}
        active={muted}
        aria-pressed={muted}
        onClick={() => setMuted((m) => !m)}
        ariaLabel="Mute microphone"
      />
      <IconButton icon={<IoTrashOutline />} disabled ariaLabel="Delete" />
    </>
  );
}
