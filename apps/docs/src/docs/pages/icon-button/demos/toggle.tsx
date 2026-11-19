import { BookmarkIcon, HeartIcon, MicOffIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton } from "minerva-design";

export default function ToggleDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/* controlled: the button exposes aria-pressed={liked} */}
      <IconButton
        icon={<HeartIcon size="1em" />}
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
      />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
      {/* uncontrolled */}
      <IconButton
        icon={<BookmarkIcon size="1em" />}
        label="Bookmark"
        defaultPressed
      />
      <IconButton
        icon={<MicOffIcon size="1em" />}
        label="Mute"
        shape="square"
        defaultPressed={false}
      />
    </>
  );
}
