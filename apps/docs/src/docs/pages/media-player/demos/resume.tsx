import { useRef, useState } from "react";
import { Button, MediaPlayer, type MediaPlayerHandle } from "minerva-design";

const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function ResumeDemo() {
  const player = useRef<MediaPlayerHandle>(null);
  // e.g. the position saved by the last session
  const [saved, setSaved] = useState(2);
  const [progress, setProgress] = useState("Not started");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        ref={player}
        src={FLOWER}
        startTime={saved}
        onLoadedMetadata={({ duration }) =>
          setProgress(`Resumed at ${saved}s of ${duration.toFixed(1)}s`)
        }
        onTimeUpdate={({ currentTime, duration }) =>
          setProgress(
            `${Math.round((currentTime / duration) * 100)}% watched (${currentTime.toFixed(1)}s)`,
          )
        }
        onPause={() =>
          setSaved(Math.floor(player.current?.element?.currentTime ?? 0))
        }
        onEnded={() => setProgress("Finished")}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button size="small" onClick={() => player.current?.play()}>
          Play
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => player.current?.seek(0)}
        >
          Restart
        </Button>
      </div>
      <output aria-live="polite">
        {progress} · saved position: {saved}s
      </output>
    </div>
  );
}
