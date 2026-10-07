import { useState } from "react";
import { IconButton } from "@minerva/lib-core";
import { IoBookmark, IoHeart, IoMicOff } from "react-icons/io5";

export default function ToggleDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/* controlled: the button exposes aria-pressed={liked} */}
      <IconButton
        icon={<IoHeart />}
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
      />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
      {/* uncontrolled */}
      <IconButton icon={<IoBookmark />} label="Bookmark" defaultPressed />
      <IconButton
        icon={<IoMicOff />}
        label="Mute"
        shape="square"
        defaultPressed={false}
      />
    </>
  );
}
