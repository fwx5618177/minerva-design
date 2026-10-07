import { useState } from "react";
import { Button, InteractiveIconButton } from "@minerva/lib-core";

export default function InteractiveDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/* controlled: the button exposes aria-pressed={liked} */}
      <InteractiveIconButton type="like" pressed={liked} onChange={setLiked} />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
      <Button size="small" variant="secondary" onClick={() => setLiked(false)}>
        Reset
      </Button>
      {/* uncontrolled */}
      <InteractiveIconButton type="bookmark" defaultPressed />
      <InteractiveIconButton
        type="star"
        size="large"
        shape="square"
        ariaLabel="Star this article"
      />
      <InteractiveIconButton type="notification" disabled />
    </>
  );
}
