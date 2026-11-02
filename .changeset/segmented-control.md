---
"minerva-design": minor
---

Add `SegmentedControl`, a single-choice segmented switch for modes and filters (iOS / Ant Design "Segmented" style), on every renderer: React (generic value type), Vue (`v-model`), web components (`<minerva-segmented-control>`, form-associated), Angular (`mn-segmented-control`, `[(value)]` / ControlValueAccessor), React Native, Taro, uni-app and WeChat mini programs. Options are strings or `{ value, label, icon, disabled, aria-label }` objects; supports `size`, `color` (`neutral` / `primary`), `fullWidth`, `disabled`, `name` and an animated sliding thumb (instant with reduced motion). Accessible as a `radiogroup` of `radio` segments with a roving tab stop, arrow keys that move and select (skipping disabled segments, RTL-aware) and Home / End. New styling hooks and `--segmented-control-*` CSS variables.
