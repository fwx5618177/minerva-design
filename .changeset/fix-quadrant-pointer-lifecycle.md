---
"minerva-design": patch
---

Capture pointer presses immediately while retaining the drag movement threshold. Cancel abandoned point drags and pans on outside releases, capture loss, window blur and missing primary-button state. Pair every started drag with one dragEnd, remove cancelled previews, and preserve normal clicks and drops.

Let quadrant cards switch immediately to a newly hovered point after leaving their actions. Reuse measured card dimensions during drag frames and refresh them on content resize.
