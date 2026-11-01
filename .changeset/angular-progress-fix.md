---
"minerva-design": patch
---

Angular: `mn-progress` / `mn-progress-indicator` now draws its indicator. The spinner, circle, wave, bar and dotted-bar variants rendered an empty element before, so `mn-loading-state` had no spinner either. Bars get the 200px default width of the other renderers.
