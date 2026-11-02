---
"minerva-design": minor
---

Slider on every renderer (React, React Native, Vue, Web Components, Angular, Taro, uni-app and WeChat): one thumb or a two-thumb range that cannot cross, min / max / step or marks-only snapping, step or labelled marks, `onChange` while dragging and `onChangeEnd` on release (save there), five colors, three sizes, value label, tooltip, `formatValue` / `getAriaValueText`, FormControl integration and hidden form inputs. DOM thumbs are `role="slider"` with arrow / PageUp / PageDown / Home / End keys (mirrored in RTL) and pointer capture; React Native thumbs are adjustable; the mini-program renderers use a custom touch implementation. Shared value math lives in `@minerva/core` (`slider.ts`), with `slider` styling hooks and i18n strings.
