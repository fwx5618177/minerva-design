import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { MediaPlayer } from "minerva-design/media-player";
import "minerva-design/media-player/style.css";
import { MediaPlayer as MinervaPlayer, ConfigProvider } from "minerva-design";
import "minerva-design/style.css";
const params = new URLSearchParams(location.search);
const compatible = params.has("compat");
const Player = compatible ? MinervaPlayer : MediaPlayer;
const h = React.createElement;
const sources = {
  mp4: "/sample.mp4",
  audio: "/sample.m4a",
  hls: "/hls/index.m3u8",
  dash: "/dash/index.mpd",
  flv: "/sample.flv",
};
window.playbackErrors = [];
function App() {
  const [type, setType] = useState("mp4");
  const [mounted, setMounted] = useState(true);
  const player = useRef(null);
  window.playerHandle = () => player.current;
  return h(
    "main",
    { style: { width: "100%", maxWidth: 760, margin: "auto" } },
    h(
      "nav",
      null,
      ...Object.keys(sources).map((name) =>
        h(
          "button",
          {
            key: name,
            onClick: () => {
              setType(name);
              setMounted(true);
            },
          },
          name,
        ),
      ),
    ),
    mounted &&
      h(Player, {
        ref: player,
        title: "Portable player",
        src: compatible
          ? sources[type]
          : {
              src: sources[type],
              type,
              ...(type === "mp4"
                ? {
                    qualities: [
                      {
                        id: "standard",
                        label: "Standard",
                        src: "/sample.mp4?quality=standard",
                      },
                      {
                        id: "high",
                        label: "High",
                        src: "/sample.mp4?quality=high",
                      },
                    ],
                  }
                : {}),
            },
        locale: params.has("captions") ? "en" : undefined,
        theme: params.has("captions") ? "light" : undefined,
        tracks: params.has("captions")
          ? [
              {
                src:
                  "data:application/x-subrip," +
                  encodeURIComponent(
                    "1\n00:00:00,000 --> 00:00:10,000\nHello captions",
                  ),
                label: "English",
                srclang: "en",
                default: true,
              },
            ]
          : undefined,
        onRecording: () => false,
        onError: (error) => {
          const media = document.querySelector("video, audio");
          window.playbackErrors.push({
            code: error?.code,
            message: error?.message,
            src: media?.currentSrc,
            time: media?.currentTime,
            seeking: media?.seeking,
            readyState: media?.readyState,
            nativeError: media?.error?.message,
          });
        },
      }),
    h("button", { onClick: () => player.current?.play() }, "Start"),
    h("button", { onClick: () => setMounted(false) }, "Unmount"),
  );
}
createRoot(document.getElementById("root")).render(
  h(ConfigProvider, { theme: "light", locale: { language: "en" } }, h(App)),
);
