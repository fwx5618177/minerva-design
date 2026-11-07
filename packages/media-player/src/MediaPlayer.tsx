/**
 * 自绘媒体播放器（不使用原生 controls）。音频与视频是**同一个组件**：同一个 <video> 元素、同一套引擎、
 * 控制条、快捷键、声音、播放列表、媒体会话；音频界面只是把「画面」区域换成封面 + 波形（AudioVisual）。
 * VideoPlayer / AudioPlayer 都是它的别名（AudioPlayer = kind="audio"）。
 * - 无黑边：读到元数据后容器按视频宽高比贴合；预加载元数据并停在第一帧附近作为封面（有 poster 时用 poster）
 * - 可插拔的播放引擎：mp4 / webm / mov 原生播放，HLS 用 hls.js、FLV / MPEG-TS 用 mpegts.js（用到时才加载）
 * - 清晰度切换（多地址或 HLS 档位 + 自动）、播放速度、字幕、画中画、截图、录制、循环、全屏
 * - 控制条只在暂停、悬停、键盘聚焦、菜单打开时浮现；提示与菜单渲染在播放器内部，全屏时同样可见
 * - 声音：用户发起的播放默认有声；只有自动播放的预览（compact / autoPlay）静音起播，并显示「开启声音」；
 *   确定没有音轨时静音按钮显示「无音轨」
 * - 纯音频（mp3 / m4a / wav / flac 等，或读到元数据后没有画面）：紧凑的音频界面（封面 + 波形进度），控制条常显
 * - compact：静音自动循环播放，没有控制条（小卡片）
 */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { VscPlay } from "react-icons/vsc";
import {
  nextAudioTrackState,
  playedSeconds,
  type AudioTrackState,
} from "./audio.js";
import ControlBar, { resolveControls } from "./ControlBar.js";
import type { PlayerChromeState } from "./chrome.js";
import type { VideoPlayerHandle, VideoPlayerProps } from "./playerTypes.js";
import { PlayerTooltipContext } from "./ControlButton.js";
import {
  ErrorOverlay,
  LoadingOverlay,
  NoticeOverlay,
  RecordingBadge,
  TopBar,
  UnmuteButton,
} from "./Overlays.js";
import AudioVisual from "./AudioVisual.js";
import {
  useFullscreen,
  useIdleActive,
  useTooltipContext,
  useSound,
  useMediaElementSync,
  useNotice,
  usePictureInPicture,
} from "./hooks.js";
import { PlayerError, safePlay, toPlayerError } from "./engines/types.js";
import { keyAction, runKeyAction, stepPlaybackRate } from "./keyboard.js";
import { clampTime } from "./format.js";
import { supportsScreenshot } from "./features.js";
import { useMediaEngine } from "./useMediaEngine.js";
import { abState, useAbRepeat } from "./abRepeat.js";
import { nextTrackIndex, usePlaylist } from "./playlist.js";
import { useWaveform } from "./useWaveform.js";
import { useCaptureActions } from "./useCaptureActions.js";
import { useTransport } from "./useTransport.js";
import { useCaptionDisplay } from "./useCaptionDisplay.js";
import { useCaptions } from "./captions.js";
import { mediaEventHandlers } from "./mediaEvents.js";
import {
  metadataSeekTarget,
  playerRootClass,
  playerRootStyle,
} from "./layout.js";
import styles from "./styles.module.scss";
import { createPlayerText, PlayerTextContext } from "./i18n.js";

const DEFAULT_RATIO = 16 / 9;

const MediaPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function MediaPlayer(
    {
      renderChrome,
      rootProps,
      mediaProps,
      mediaElement,
      src: srcProp,
      title: titleProp = "",
      kind = "auto",
      playlist: playlistProp,
      defaultPlaylistIndex,
      onPlaylistIndexChange,
      artist: artistProp,
      album: albumProp,
      mediaSession = true,
      waveform = "auto",
      onDownload,
      variant = "full",
      autoPlay = false,
      defaultMuted = false,
      defaultLoop = false,
      defaultVolume = 1,
      defaultPlaybackRate = 1,
      showLoopToggle = false,
      showTitle = true,
      controls,
      muted: mutedProp,
      loop: loopProp,
      preload = "metadata",
      playbackRates,
      skipSeconds,
      height,
      aspectRatio,
      pictureInPicture,
      style,
      theme,
      locale,
      messages,
      "aria-label": ariaLabel,
      onPlay,
      onPause,
      onRateChange,
      onVolumeChange,
      onLoadedMetadata,
      onTrackChange,
      poster: posterProp,
      startTime,
      crossOrigin,
      tracks,
      captionStorageKey,
      engines,
      maxRecordingSeconds = 600,
      screenshotType,
      actions,
      maxWidth,
      maxHeight,
      className,
      videoClassName,
      videoTestId,
      renderTooltip,
      onMetadata,
      onAudioTrack,
      onLayoutChange,
      onScreenshot,
      onRecording,
      onError,
      onTimeUpdate,
      onEnded,
      onQualityChange,
    },
    ref,
  ) {
    const text = createPlayerText(locale, messages);
    const bare = controls === false;
    const hostKey = mediaElement ?? "video";
    const controlOptions = typeof controls === "object" ? controls : undefined;
    const compact = variant === "compact";
    const shouldAutoPlay = compact || autoPlay;
    // 播放列表：当前曲目的地址 / 名称 / 封面覆盖单个属性
    const playlist = usePlaylist(playlistProp, {
      defaultIndex: defaultPlaylistIndex,
      onIndexChange: onPlaylistIndexChange,
    });
    const src = playlist.item?.src ?? srcProp ?? "";
    const title = playlist.item?.title ?? titleProp;
    const poster = playlist.item?.poster ?? posterProp;
    const artist = playlist.item?.artist ?? artistProp;
    const album = playlist.item?.album ?? albumProp;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const startedRef = useRef(false);
    const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
    const [ended, setEnded] = useState(false);
    const [paused, setPaused] = useState(true);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState<Array<[number, number]>>([]);
    const {
      muted,
      autoMuted,
      volume,
      setMuted,
      setVolume,
      enableSound,
      toggleMute,
      changeVolume,
    } = useSound({
      muted: mutedProp ?? (shouldAutoPlay || defaultMuted),
      autoMuted: shouldAutoPlay,
      defaultVolume,
    });
    const [rate, setRate] = useState(defaultPlaybackRate);
    const [audio, setAudio] = useState<AudioTrackState>("unknown");
    const [loop, setLoop] = useState(loopProp ?? (compact || defaultLoop));
    const [ratio, setRatio] = useState<number | null>(null);
    const { active, setActive, wake } = useIdleActive();
    const [dragging, setDragging] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<PlayerError | null>(null);
    const { notice, showNotice } = useNotice();
    const [canScreenshot, setCanScreenshot] = useState(false);
    // 读到元数据后是否有画面（null：还不知道，先按地址 / MIME 判断）
    const [hasPicture, setHasPicture] = useState<boolean | null>(null);
    // 时间显示为剩余时间
    const [remaining, setRemaining] = useState(false);

    // 回调总是读最新的属性，不进依赖数组
    const latest = {
      onPlay,
      onPause,
      onRateChange,
      onVolumeChange,
      onLoadedMetadata,
      onTrackChange,
      onLayoutChange,
      onMetadata,
      onAudioTrack,
      onScreenshot,
      onRecording,
      onError,
    };
    const callbacks = useRef({
      ...latest,
      onTimeUpdate,
      onEnded,
      onQualityChange,
    });
    callbacks.current = { ...latest, onTimeUpdate, onEnded, onQualityChange };

    const setRoot = useCallback((node: HTMLDivElement | null) => {
      rootRef.current = node;
      setRootEl(node);
    }, []);

    const reportError = useCallback((next: PlayerError) => {
      setError(next);
      setLoading(false);
      callbacks.current.onError?.(next);
    }, []);

    const engine = useMediaEngine({
      videoRef,
      hostKey,
      src,
      engines,
      onError: reportError,
      onAttached: () => {
        const video = videoRef.current;
        if (video) video.playbackRate = rate;
      },
    });
    const {
      sourceKey,
      setQuality: setEngineQuality,
      reload,
      takeResume,
    } = engine;
    const audioOnly =
      kind === "audio"
        ? true
        : kind === "video"
          ? false
          : hasPicture === null
            ? engine.audioHint
            : !hasPicture;
    const ab = useAbRepeat(videoRef, {
      resetKey: sourceKey,
      paused,
      onJump: setCurrent,
    });
    const { set: setAb } = ab;
    const wave = useWaveform({
      active: audioOnly,
      url: engine.playbackUrl,
      type: engine.playbackType,
      option: waveform,
      crossOrigin,
    });

    const fullscreenState = useFullscreen(
      rootRef,
      videoRef,
      () => callbacks.current.onLayoutChange?.(),
      hostKey,
    );
    const pip = usePictureInPicture(videoRef, sourceKey, hostKey);
    const captions = useCaptions(
      videoRef,
      tracks,
      onTrackChange,
      captionStorageKey,
      hostKey,
    );
    const caption = useCaptionDisplay(
      bare && mediaElement ? undefined : tracks?.[captions.index],
      current,
      videoRef,
      crossOrigin,
      captions.index,
      !!renderChrome && !bare,
      hostKey,
    );
    useEffect(() => {
      if (mutedProp !== undefined) setMuted(mutedProp);
    }, [mutedProp, setMuted]);
    useEffect(() => {
      if (loopProp !== undefined) setLoop(loopProp);
    }, [loopProp]);
    useMediaElementSync(videoRef, { muted, volume, loop, rate }, hostKey);
    useEffect(() => {
      setCanScreenshot(supportsScreenshot());
    }, []);
    // 换片时重置
    useEffect(() => {
      setCurrent(0);
      setEnded(false);
      setDuration(0);
      setBuffered([]);
      setRatio(null);
      setHasPicture(null);
      setAudio("unknown");
      setError(null);
      setLoading(false);
      startedRef.current = false;
    }, [sourceKey]);
    useEffect(() => {
      if (audio !== "unknown") callbacks.current.onAudioTrack?.(audio);
    }, [audio]);

    const probeAudio = (video: HTMLVideoElement) => {
      setAudio((previous) =>
        nextAudioTrackState(previous, video, playedSeconds(video.played)),
      );
    };

    /** 用户发起的播放 / 暂停：从自动播放的静音状态开始播放时恢复声音 */
    const togglePlay = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused || video.ended) {
        if (autoMuted && !compact) enableSound();
        void safePlay(video);
      } else {
        video.pause();
      }
    }, [autoMuted, compact, enableSound]);

    const seek = useCallback(
      (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        const next = clampTime(time, duration || video.duration);
        video.currentTime = next;
        setCurrent(next);
      },
      [duration],
    );

    const changeQuality = useCallback(
      (id: string) => {
        setEngineQuality(id);
        callbacks.current.onQualityChange?.(id);
      },
      [setEngineQuality],
    );

    const { recording, captureCurrent, screenshotWithNotice, toggleRecord } =
      useCaptureActions(videoRef, {
        title,
        screenshotType,
        maxRecordingSeconds,
        callbacks,
        showNotice,
        beforeRecord: () => {
          if (autoMuted && !compact) enableSound();
        },
      });
    const { start: startRecording, stop: stopRecording } = recording;

    const togglePip = useCallback(() => {
      pip.toggle().catch((failure: unknown) => {
        showNotice(toPlayerError(failure, "无法进入画中画").message, "error");
      });
    }, [pip, showNotice]);

    const retry = useCallback(() => {
      setError(null);
      reload();
    }, [reload]);

    /** 相对跳转（以界面上的当前时间为准，与进度条一致） */
    const seekBy = useCallback(
      (delta: number) => seek(current + delta),
      [seek, current],
    );

    const {
      switchTrack,
      nextTrack,
      previousTrack,
      runAb,
      trackIndex,
      trackCount,
    } = useTransport({
      videoRef,
      playlist,
      ab,
      seek,
      seekBy,
      togglePlay,
      showNotice,
      beforePlay: () => {
        if (autoMuted && !compact) enableSound();
      },
      session: {
        enabled: mediaSession && !compact,
        // 自动播放的静音预览不接管系统媒体控件
        playing: !paused && !(autoMuted && muted),
        info: { title, artist, album, artwork: poster },
        position: { current, duration, rate },
      },
    });

    const download = onDownload
      ? () => onDownload({ src, url: engine.playbackUrl, title })
      : undefined;

    useImperativeHandle(
      ref,
      () => ({
        get element() {
          return videoRef.current;
        },
        get video() {
          return videoRef.current;
        },
        play: async () => {
          if (videoRef.current) await videoRef.current.play();
        },
        pause: () => videoRef.current?.pause(),
        seek,
        setPlaybackRate: (next: number) => setRate(next),
        setQuality: changeQuality,
        screenshot: async () => (await captureCurrent()).blob,
        startRecording: startRecording,
        stopRecording: async () => (await stopRecording())?.blob ?? null,
        toggleFullscreen: fullscreenState.toggle,
        next: nextTrack,
        previous: previousTrack,
        setAbRepeat: (a: number, b: number) =>
          setAb({ a: Math.min(a, b), b: Math.max(a, b) }),
        clearAbRepeat: () => setAb({ a: null, b: null }),
      }),
      [
        seek,
        changeQuality,
        captureCurrent,
        startRecording,
        stopRecording,
        fullscreenState.toggle,
        nextTrack,
        previousTrack,
        setAb,
      ],
    );

    const hasSound = audio !== "absent";
    // 纯音频没有画面：不提供截图 / 录制 / 画中画 / 全屏 / 字幕
    const show = resolveControls(
      {
        ...controlOptions,
        ...(skipSeconds !== undefined ? { skip: skipSeconds > 0 } : {}),
        ...(pictureInPicture !== undefined ? { pip: pictureInPicture } : {}),
      },
      showLoopToggle,
      {
        screenshot: canScreenshot && !audioOnly,
        record: recording.supported && !audioOnly,
        pip: pip.supported && !audioOnly,
        fullscreen: fullscreenState.supported && !audioOnly,
      },
      { audio: audioOnly, playlist: playlist.enabled, download: !!onDownload },
    );

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (compact || bare) return;
      const action = keyAction({
        key: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        onButton: (event.target as HTMLElement).tagName === "BUTTON",
      });
      if (!action) return;
      const handled = runKeyAction(action, {
        show,
        hasSound,
        hasCaptions: captions.options.length > 0,
        togglePlay,
        seekBy,
        changeVolume: (delta) => changeVolume((muted ? 0 : volume) + delta),
        toggleMute,
        toggleFullscreen: fullscreenState.toggle,
        screenshot: screenshotWithNotice,
        toggleRecord,
        stepSpeed: (direction) => {
          const next = stepPlaybackRate(rate, direction);
          setRate(next);
          showNotice(`播放速度 ${next}x`);
        },
        toggleCaptions: captions.toggle,
        togglePip,
        toggleLoop: () => {
          const next = !loop;
          setLoop(next);
          showNotice(next ? "循环播放" : "关闭循环");
        },
        abRepeat: runAb,
        nextTrack: playlist.enabled ? nextTrack : undefined,
        previousTrack: playlist.enabled ? previousTrack : undefined,
      });
      // 当前不可用的操作不拦截按键
      if (!handled) return;
      event.preventDefault();
      event.stopPropagation();
      wake();
    };

    const tooltipContext = useTooltipContext(
      fullscreenState.fullscreen,
      rootEl,
    );

    const isRecording =
      recording.status === "recording" || recording.status === "stopping";
    const showControls =
      !compact &&
      !bare &&
      (audioOnly || paused || active || dragging || menuOpen);
    const showUnmute = autoMuted && muted && hasSound;
    const rootClass = playerRootClass(styles, {
      compact,
      showControls,
      audioOnly,
      pending: !(ratio || poster || audioOnly),
      className,
    });

    const videoHandlers = mediaEventHandlers({
      setPaused,
      setEnded,
      acceptEmptyError: !!renderChrome,
      setLoading,
      setBuffered,
      setCurrent,
      setDuration,
      setMuted,
      setVolume,
      setRate,
      setError,
      setHasPicture,
      setRatio,
      probeAudio,
      reportError,
      errorType: audioOnly ? "audio" : engine.playbackType,
      ab,
      callbacks,
      onTrackEnded: () => {
        const target = nextTrackIndex(trackIndex, trackCount);
        if (target !== null) switchTrack(target, true);
      },
      onMetadataReady: (video, picture) => {
        video.playbackRate = rate;
        const resume = takeResume();
        const target = metadataSeekTarget({
          resume,
          firstLoad: !startedRef.current,
          startTime,
          coverFrame: picture && !poster && !shouldAutoPlay,
          currentTime: video.currentTime,
          duration: video.duration,
        });
        if (target !== null) video.currentTime = target;
        // 换清晰度 / 重试时恢复播放；播放列表切到新曲目后接着播放
        const autoNext = playlist.takeAutoPlay();
        if (resume?.playing || autoNext) void safePlay(video);
        startedRef.current = true;
      },
    });

    const chrome: PlayerChromeState = {
      paused,
      current,
      duration: Number.isFinite(duration) && duration > 0 ? duration : 0,
      buffered,
      muted,
      volume,
      rate,
      loading,
      error,
      title,
      audioOnly,
      ended,
      captionIndex: captions.index,
      captionText: caption,
      tracks: tracks ?? [],
      root: rootEl,
      media: videoRef.current,
      fullscreen: fullscreenState.fullscreen,
      pipActive: pip.active,
      pipSupported: pip.supported,
      fullscreenSupported: fullscreenState.supported,
      togglePlay,
      seek,
      changeVolume,
      toggleMute,
      setRate,
      selectCaption: captions.select,
      toggleCaption: captions.toggle,
      toggleFullscreen: fullscreenState.toggle,
      togglePip,
    };
    const hostRootProps =
      typeof rootProps === "function" ? rootProps(chrome) : rootProps;
    const NativeMedia = mediaElement ?? "video";
    // Host chrome owns its visual contract; independent advanced CSS must not
    // override its themed root/media classes when both public styles are loaded.
    const hostOwnsPresentation = !!renderChrome || (bare && !!mediaElement);
    return (
      <PlayerTextContext.Provider value={text}>
        <PlayerTooltipContext.Provider value={tooltipContext}>
          <div
            ref={setRoot}

            role={bare && mediaElement ? undefined : "group"}
            aria-label={
              ariaLabel ??
              (locale && !locale.startsWith("zh")
                ? title || text("媒体播放器")
                : `${audioOnly ? "音频" : "视频"} ${title}`)
            }
            tabIndex={compact || bare ? -1 : 0}
            data-theme={theme}
            data-paused={paused ? "true" : "false"}
            data-muted={muted ? "true" : "false"}
            data-audio={audio}
            data-aspect={ratio ? Number(ratio.toFixed(4)) : undefined}
            data-engine={engine.engineKind ?? undefined}
            data-media={audioOnly ? "audio" : "video"}
            data-fullscreen={fullscreenState.fullscreen ? "true" : undefined}
            data-recording={isRecording ? "true" : undefined}
            data-ab={abState(ab.range)}
            data-track={playlist.enabled ? playlist.index : undefined}
            style={{
              ...playerRootStyle({
                fullscreen: fullscreenState.fullscreen,
                audioOnly,
                ratio: ratio ?? DEFAULT_RATIO,
                maxWidth,
                maxHeight,
              }),
              ...(aspectRatio && !audioOnly && !fullscreenState.fullscreen
                ? { aspectRatio }
                : {}),
              ...(height !== undefined &&
              !audioOnly &&
              !fullscreenState.fullscreen
                ? { height, aspectRatio: undefined }
                : {}),
              ...style,
            }}
            onKeyDown={onKeyDown}
            onPointerMove={compact ? undefined : wake}
            onPointerLeave={() => setActive(false)}
            {...hostRootProps}
            className={[
              hostOwnsPresentation ? className : rootClass,
              hostRootProps?.className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <NativeMedia
              onClick={renderChrome && !bare ? togglePlay : undefined}
              onDoubleClick={
                renderChrome && !bare ? fullscreenState.toggle : undefined
              }
              {...mediaProps}
              ref={videoRef}
              className={[
                hostOwnsPresentation ? undefined : styles.video,
                videoClassName,
                mediaProps?.className,
              ]
                .filter(Boolean)
                .join(" ")}
              data-testid={videoTestId}
              preload={preload}
              playsInline
              poster={poster}
              crossOrigin={crossOrigin}
              autoPlay={shouldAutoPlay}
              muted={muted}
              loop={loop}
              {...videoHandlers}
            >
              {tracks?.map((track, index) => (
                <track
                  key={`${track.src}-${index}`}
                  kind={track.kind ?? "subtitles"}
                  src={track.src}
                  srcLang={track.srclang}
                  label={track.label}
                  default={
                    bare && mediaElement
                      ? index === captions.index
                      : track.default
                  }
                />
              ))}
            </NativeMedia>
            {renderChrome ? (
              renderChrome(chrome)
            ) : (
              <>
                {!bare &&
                  (audioOnly ? (
                    <AudioVisual
                      title={title}
                      poster={poster}
                      showTitle={showTitle}
                      current={current}
                      duration={duration}
                      paused={paused}
                      compact={compact}
                      actions={compact ? undefined : actions}
                      trailing={
                        showUnmute ? (
                          <UnmuteButton
                            compact={compact}
                            onClick={enableSound}
                          />
                        ) : undefined
                      }
                      peaks={wave.peaks}
                      waveformState={wave.state}
                      buffered={buffered}
                      ab={ab.range}
                      seekable={show.progress}
                      onSeek={seek}
                      onDragChange={setDragging}
                      onTogglePlay={togglePlay}
                    />
                  ) : (
                    <div
                      className={styles.surface}
                      onClick={togglePlay}
                      onDoubleClick={
                        compact || !show.fullscreen
                          ? undefined
                          : fullscreenState.toggle
                      }
                      aria-hidden="true"
                    >
                      {!compact && paused && !error && (
                        <span className={styles.bigPlay}>
                          <VscPlay />
                        </span>
                      )}
                    </div>
                  ))}
                {caption && (
                  <div
                    className={styles.caption}
                    data-testid="media-caption"
                    aria-live="off"
                  >
                    {caption}
                  </div>
                )}
                {!bare && loading && !error && !paused && <LoadingOverlay />}
                {!bare && error && (
                  <ErrorOverlay message={error.message} onRetry={retry} />
                )}
                {notice && (
                  <NoticeOverlay message={notice.message} tone={notice.tone} />
                )}
                {isRecording && <RecordingBadge elapsed={recording.elapsed} />}
                {!bare && showUnmute && !audioOnly && (
                  <UnmuteButton compact={compact} onClick={enableSound} />
                )}
                {!bare && !compact && !audioOnly && (showTitle || actions) && (
                  <TopBar
                    title={title}
                    showTitle={showTitle}
                    actions={actions}
                  />
                )}
                {!bare && !compact && (
                  <ControlBar
                    skipSeconds={skipSeconds}
                    playbackRates={playbackRates}
                    show={show}
                    renderTooltip={renderTooltip}
                    paused={paused}
                    onTogglePlay={togglePlay}
                    current={current}
                    duration={duration}
                    buffered={buffered}
                    onSeek={seek}
                    onDragChange={setDragging}
                    muted={muted}
                    volume={volume}
                    audio={audio}
                    onToggleMute={toggleMute}
                    onVolume={changeVolume}
                    loop={loop}
                    onToggleLoop={() => setLoop((value) => !value)}
                    onScreenshot={screenshotWithNotice}
                    recordStatus={recording.status}
                    recordElapsed={recording.elapsed}
                    onToggleRecord={toggleRecord}
                    pipActive={pip.active}
                    onTogglePip={togglePip}
                    fullscreen={fullscreenState.fullscreen}
                    onToggleFullscreen={fullscreenState.toggle}
                    qualityOptions={engine.qualityOptions}
                    quality={engine.quality}
                    onQuality={changeQuality}
                    rate={rate}
                    onRate={setRate}
                    captions={captions.options}
                    captionIndex={captions.index}
                    onCaption={captions.select}
                    onMenuOpenChange={setMenuOpen}
                    audioMode={audioOnly}
                    onSkip={seekBy}
                    ab={ab.range}
                    onAbCycle={() => runAb("cycle")}
                    hasPrevious={playlist.hasPrevious}
                    hasNext={playlist.hasNext}
                    onPrevious={previousTrack}
                    onNext={nextTrack}
                    onDownload={download}
                    remaining={remaining}
                    onToggleRemaining={() => setRemaining((value) => !value)}
                  />
                )}
              </>
            )}
          </div>
        </PlayerTooltipContext.Provider>
      </PlayerTextContext.Provider>
    );
  },
);

export default MediaPlayer;
