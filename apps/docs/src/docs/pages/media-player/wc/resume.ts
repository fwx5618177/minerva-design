// start-time resumes once the metadata loads; the media events cross the
// shadow root as minerva-* events; play() / seek() drive the player.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#progress")!;
  let saved = 2;
  const onMetadata = (e: Event) => {
    const { duration } = (e as CustomEvent<{ duration: number }>).detail;
    output.value = `Resumed at ${saved}s of ${duration.toFixed(1)}s`;
  };
  const onTime = (e: Event) => {
    const { currentTime, duration } = (
      e as CustomEvent<{ currentTime: number; duration: number }>
    ).detail;
    output.value = `${Math.round((currentTime / duration) * 100)}% watched (${currentTime.toFixed(1)}s)`;
  };
  const onPause = () => {
    saved = Math.floor(player.element?.currentTime ?? 0);
    player.startTime = saved;
    output.value = `Paused · saved position: ${saved}s`;
  };
  const onEnded = () => (output.value = "Finished");
  const play = () => void player.play();
  const restart = () => player.seek(0);
  const playButton = root.querySelector("#play")!;
  const restartButton = root.querySelector("#restart")!;
  player.addEventListener("minerva-loaded-metadata", onMetadata);
  player.addEventListener("minerva-time-update", onTime);
  player.addEventListener("minerva-pause", onPause);
  player.addEventListener("minerva-ended", onEnded);
  playButton.addEventListener("click", play);
  restartButton.addEventListener("click", restart);
  return () => {
    player.removeEventListener("minerva-loaded-metadata", onMetadata);
    player.removeEventListener("minerva-time-update", onTime);
    player.removeEventListener("minerva-pause", onPause);
    player.removeEventListener("minerva-ended", onEnded);
    playButton.removeEventListener("click", play);
    restartButton.removeEventListener("click", restart);
  };
}
