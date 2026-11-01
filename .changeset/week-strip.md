---
"minerva-design": minor
---

New `WeekStrip` component: a one-week row of days to pick a date, with previous / next week buttons, today highlighted and per-day markers (a dot, or a count). Props: `value` / `onChange`, `week` / `onWeekChange`, `firstDayOfWeek` (Monday by default), `today`, `markers`, `showNavigation` and `size`. On every renderer: React, React Native, Taro, Vue, Angular (`MnWeekStrip`), Web Components (`<minerva-week-strip>`), uni-app and WeChat. The core adds `weekStart()`.
