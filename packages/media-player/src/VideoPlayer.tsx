/**
 * 播放器的三个名字，都是同一个组件 MediaPlayer：
 * - `MediaPlayer`：通用名称，`kind` 默认 auto（按地址 / 元数据自动选择音频或视频界面）
 * - `VideoPlayer`：历史名称，与 MediaPlayer 完全相同（保留以兼容已有代码）
 * - `AudioPlayer`：`<MediaPlayer kind="audio" />` 的简写，总是使用音频界面
 * 引擎、控制条、快捷键、声音、播放列表、媒体会话全部共用；音频界面只是把画面区域换成封面 + 波形。
 */
import React, { forwardRef } from "react";
import MediaPlayer from "./MediaPlayer.js";
import type { MediaPlayerHandle, MediaPlayerProps } from "./playerTypes.js";

export { MediaPlayer };

/** 历史名称：与 MediaPlayer 是同一个组件 */
export const VideoPlayer = MediaPlayer;

export type AudioPlayerProps = Omit<MediaPlayerProps, "kind">;

/** 音频播放器：同一个 MediaPlayer，固定使用音频界面 */
export const AudioPlayer = forwardRef<MediaPlayerHandle, AudioPlayerProps>(
  function AudioPlayer(props, ref) {
    return <MediaPlayer ref={ref} {...props} kind="audio" />;
  },
);

export default MediaPlayer;
