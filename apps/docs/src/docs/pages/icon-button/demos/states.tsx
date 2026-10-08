import { useState } from "react";
import { IconButton } from "minerva-design";
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
        color="primary"
        loading={loading}
        onClick={upload}
        aria-label="Upload"
      />
      <IconButton
        icon={<IoMic />}
        pressed={muted}
        onPressedChange={setMuted}
        aria-label="Mute microphone"
      />
      <IconButton icon={<IoTrashOutline />} disabled aria-label="Delete" />
    </>
  );
}
