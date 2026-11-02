import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function VideoDemo() {
  return (
    <div style={{ maxWidth: 560 }}>
      <MediaPlayer src={FLOWER} title="Flower" pictureInPicture />
    </div>
  );
}
