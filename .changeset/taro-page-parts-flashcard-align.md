---
"minerva-design": patch
---

Taro: `PageHeader` and `PageSection` are now their own blocks (`mn-page-header` / `mn-page-section`, `data-minerva="page-header"` / `"page-section"`, matching React) and no longer carry the `mn-page` root class, so app rules on `.mn-page` (full-height, page padding) stop leaking onto headers and sections. The `mn-page__header` / `mn-page__section` classes are kept.

React Native: Flashcard keeps plain-text faces centred but stretches rich content to the full face width, so it lines up with the face label instead of shrinking and drifting off-centre.
