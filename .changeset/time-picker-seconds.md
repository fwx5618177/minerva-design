---
"@minerva/lib-core": minor
"@minerva/lib-web-components": major
---

TimePicker / `<minerva-time-picker>`: seconds have a single source of truth, the format in use. `showSecond={false}` (`hide-second`) now also removes the seconds token from `format` (`"HH:mm:ss"` → `"HH:mm"`), and a format without seconds no longer shows a seconds column, so the column, the displayed text, parsing and the value can never disagree.
