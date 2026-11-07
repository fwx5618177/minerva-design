# Playback boundaries

The shared implementation targets React DOM in desktop/mobile browsers and Electron. Its native, HLS, DASH and FLV/MPEG-TS adapters use feature detection and browser codecs. CORS, autoplay, fullscreen, PiP and capture follow host policies. DRM licensing is not configured by the default adapters.

Minerva's React component delegates to this implementation and uses a presentation-only chrome to preserve its API, native audio element, theme tokens, focus behavior and styling hooks. The advanced public entry exposes the full playback/capture/playlist API.

Product validation installs the actual `minerva-design` tarball outside this workspace, typechecks public imports and SSR, then plays local H.264/AAC MP4, HLS, DASH, FLV and audio streams in Chromium, Firefox, WebKit, Android-viewport Chromium and iPhone-viewport WebKit. Additional cases cover SRT, English controls, light theme and the compatibility entry. React 18.3 and React 19 consumers are checked.

Mobile browser emulation does not certify physical iPhone/Android devices. Native apps, mini-programs, production DRM, every codec and live-network conditions require their own validation. Source unit tests cover failures, cancellation and native presentation events. Existing framework/native adapters keep their platform-specific limitations.

Headless Linux validation configures PulseAudio with a null output sink. Without an audio device Firefox can report `OnMediaSinkAudioError` even for a plain native media element. Browser product tests run separately from source coverage and retain all playback-error assertions.
