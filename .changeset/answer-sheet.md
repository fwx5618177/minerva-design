---
"minerva-design": minor
---

New `AnswerSheet` component (答题卡): a question navigator for practice and exam sessions. Numbered pills grouped by section (`groups`), each with a status (`unanswered`, `answered`, `correct`, `wrong`, `skipped`), an optional review flag and the current question marked with `aria-current="step"`. Props: `items`, `groups`, `value` / `onChange`, `size` (`small` / `medium`), `layout` (`wrap` / `scroll`), `columns`, `showLegend`, `showSummary` and `getItemLabel`, with localized labels (en, zh, fr, ja) and roving arrow-key, Home / End navigation on the web. On every renderer: React, React Native, Taro, Vue, Angular (`MnAnswerSheet`), Web Components (`<minerva-answer-sheet>`), uni-app and WeChat. The core adds `answerSheetSections()`, `answerSheetSummary()`, `answerSheetLegend()` and `answerSheetMoveIndex()`, `@minerva/dom` adds `nearestInRow()`, and the styling hooks add the `flagged` and `layout` states.
