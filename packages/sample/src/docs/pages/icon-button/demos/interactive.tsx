import { useState } from "react";
import { InteractiveIconButton } from "@minerva/lib-core";

export default function InteractiveDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <InteractiveIconButton type="like" onChange={setLiked} />
      <InteractiveIconButton type="bookmark" initialState />
      <InteractiveIconButton type="star" size="large" shape="square" />
      <InteractiveIconButton type="notification" disabled />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
    </>
  );
}
