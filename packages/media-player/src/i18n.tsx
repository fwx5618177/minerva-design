import React, { createContext, useContext } from "react";
const zh = {
  normal: "正常",
  play: "播放",
  pause: "暂停",
  mute: "静音",
  unmute: "取消静音",
  volume: "音量",
  settings: "设置",
  playbackSettings: "播放设置",
  quality: "清晰度",
  speed: "播放速度",
  captions: "字幕",
  off: "关闭",
  fullscreen: "全屏",
  exitFullscreen: "退出全屏",
  pip: "画中画",
  exitPip: "退出画中画",
  loop: "循环播放",
  loopOff: "关闭循环",
  screenshot: "截图",
  record: "开始录制",
  recording: "录制",
  stopRecording: "停止录制",
  next: "下一首",
  previous: "上一首",
  download: "下载",
  export: "下载 / 导出",
  progress: "播放进度",
  noAudio: "无音轨",
  noAudioHint: "这个视频没有音轨",
  loading: "加载中",
  retry: "重试",
  enableSound: "开启声音",
  player: "媒体播放器",
  forward: "前进 {seconds} 秒",
  backward: "后退 {seconds} 秒",
  back: "返回（{title}）",
  remaining: "剩余",
  elapsed: "已播放",
  toggleTime: "点击切换",
};
export type PlayerMessageKey = keyof typeof zh;
export type PlayerMessages = Record<PlayerMessageKey, string>;
export type PlayerLocale = "zh" | "en" | "fr" | "ja";
const en: PlayerMessages = {
  normal: "Normal",
  play: "Play",
  pause: "Pause",
  mute: "Mute",
  unmute: "Unmute",
  volume: "Volume",
  settings: "Settings",
  playbackSettings: "Playback settings",
  quality: "Quality",
  speed: "Playback speed",
  captions: "Captions",
  off: "Off",
  fullscreen: "Fullscreen",
  exitFullscreen: "Exit fullscreen",
  pip: "Picture in picture",
  exitPip: "Exit picture in picture",
  loop: "Loop",
  loopOff: "Disable loop",
  screenshot: "Screenshot",
  record: "Start recording",
  recording: "Record",
  stopRecording: "Stop recording",
  next: "Next track",
  previous: "Previous track",
  download: "Download",
  export: "Download / export",
  progress: "Playback progress",
  noAudio: "No audio",
  noAudioHint: "This media has no audio track",
  loading: "Loading",
  retry: "Retry",
  enableSound: "Enable sound",
  player: "Media player",
  forward: "Forward {seconds} seconds",
  backward: "Back {seconds} seconds",
  back: "Back ({title})",
  remaining: "Remaining",
  elapsed: "Elapsed",
  toggleTime: "Click to toggle",
};
const fr: PlayerMessages = {
  normal: "Normale",
  play: "Lire",
  pause: "Pause",
  mute: "Couper le son",
  unmute: "Rétablir le son",
  volume: "Volume",
  settings: "Paramètres",
  playbackSettings: "Paramètres de lecture",
  quality: "Qualité",
  speed: "Vitesse de lecture",
  captions: "Sous-titres",
  off: "Désactivés",
  fullscreen: "Plein écran",
  exitFullscreen: "Quitter le plein écran",
  pip: "Image dans l’image",
  exitPip: "Quitter l’image dans l’image",
  loop: "Lecture en boucle",
  loopOff: "Désactiver la boucle",
  screenshot: "Capture d’écran",
  record: "Démarrer l’enregistrement",
  recording: "Enregistrer",
  stopRecording: "Arrêter l’enregistrement",
  next: "Piste suivante",
  previous: "Piste précédente",
  download: "Télécharger",
  export: "Télécharger / exporter",
  progress: "Progression de lecture",
  noAudio: "Sans son",
  noAudioHint: "Ce média ne contient pas de piste audio",
  loading: "Chargement",
  retry: "Réessayer",
  enableSound: "Activer le son",
  player: "Lecteur multimédia",
  forward: "Avancer de {seconds} secondes",
  backward: "Reculer de {seconds} secondes",
  back: "Retour ({title})",
  remaining: "Restant",
  elapsed: "Écoulé",
  toggleTime: "Cliquer pour changer",
};
const ja: PlayerMessages = {
  normal: "標準",
  play: "再生",
  pause: "一時停止",
  mute: "ミュート",
  unmute: "ミュート解除",
  volume: "音量",
  settings: "設定",
  playbackSettings: "再生設定",
  quality: "画質",
  speed: "再生速度",
  captions: "字幕",
  off: "オフ",
  fullscreen: "全画面",
  exitFullscreen: "全画面を終了",
  pip: "ピクチャーインピクチャー",
  exitPip: "ピクチャーインピクチャーを終了",
  loop: "ループ再生",
  loopOff: "ループを解除",
  screenshot: "スクリーンショット",
  record: "録画を開始",
  recording: "録画",
  stopRecording: "録画を停止",
  next: "次の曲",
  previous: "前の曲",
  download: "ダウンロード",
  export: "ダウンロード / 書き出し",
  progress: "再生位置",
  noAudio: "音声なし",
  noAudioHint: "このメディアには音声トラックがありません",
  loading: "読み込み中",
  retry: "再試行",
  enableSound: "音声を有効にする",
  player: "メディアプレーヤー",
  forward: "{seconds}秒進む",
  backward: "{seconds}秒戻る",
  back: "戻る（{title}）",
  remaining: "残り",
  elapsed: "経過",
  toggleTime: "クリックして切り替え",
};
export const playerMessages: Record<PlayerLocale, PlayerMessages> = {
  zh,
  en,
  fr,
  ja,
};
/** Translate internal source labels, preserving user-supplied titles/track names. */
export function createPlayerText(
  locale: string = "zh",
  overrides: Partial<PlayerMessages> = {},
) {
  const language = locale.split(/[-_]/)[0] as PlayerLocale;
  const messages = { ...(playerMessages[language] ?? en), ...overrides };
  const direct = new Map(
    Object.entries(zh).map(([key, value]) => [
      value,
      messages[key as PlayerMessageKey],
    ]),
  );
  const text = (source: string): string => {
    if (direct.has(source)) return direct.get(source)!;
    // Match legacy labels and full-width shortcut punctuation.
    const skip = /^(\u524d\u8fdb|\u540e\u9000) ([\d.]+) \u79d2$/.exec(source);
    if (skip)
      return messages[skip[1] === "前进" ? "forward" : "backward"].replace(
        "{seconds}",
        skip[2],
      );
    const back = /^\u8fd4\u56de\uff08(.+)\uff09$/.exec(source);
    if (back) return messages.back.replace("{title}", text(back[1]));
    const hint = /^(.+)\uff08([^\uff08\uff09]+)\uff09$/.exec(source);
    if (hint)
      return `${text(hint[1])} (${hint[2] === "空格" ? "Space" : hint[2]})`;
    return source;
  };
  // Preserve historical Chinese labels and tooltip punctuation for existing consumers.
  return language === "zh" && Object.keys(overrides).length === 0
    ? (source: string) => source
    : text;
}
export const PlayerTextContext = createContext<(source: string) => string>(
  (source) => source,
);
export const usePlayerText = () => useContext(PlayerTextContext);
export function PlayerText({ children }: { children: string }) {
  const text = usePlayerText();
  return <>{text(children)}</>;
}
