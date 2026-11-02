import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const ROAR =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

export default function AudioDemo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <MediaPlayer src={ROAR} title="T-Rex roar" skipSeconds={0} />
    </div>
  );
}
