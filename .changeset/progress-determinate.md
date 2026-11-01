---
"minerva-design": minor
---

ProgressIndicator: a determinate mode. `value` (with `max`, default 100) fills the bar or ring to that amount instead of spinning, `showValue` prints the percentage and `format` customizes it. `color` adds `success`, `warning`, `danger` and `info`. Available in React, Vue, Angular, Web Components (`<minerva-progress value max show-value>`) and Taro; the uni-app and WeChat components already had a value mode. A label next to a bar now stays on one line when there is room (the track takes the remaining width) and wraps between words.
